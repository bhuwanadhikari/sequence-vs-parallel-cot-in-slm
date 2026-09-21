# Depth vs. Width: allocating a fixed test-time compute budget in small LMs

Given ~8K generated tokens per problem, is accuracy better served by **one long thinking trace** (depth) or **N short independent samples + majority vote** (width)? Does the answer shift with model size (1.7B → 4B) and problem difficulty?

**Hypothesis.** Sequential compute only pays off if the model can detect and fix its own errors. Parallel compute needs no self-verification, only a modal correct answer. Small models verify poorly, so width should win at 1.7B and the crossover should move toward depth at 4B. `pass@N − maj@N` measures that selection bottleneck directly.

## Setup

| | |
|---|---|
| Models | `Qwen/Qwen3-1.7B`, `Qwen/Qwen3-4B` (same family, tokenizer, post-training; native think on/off) |
| Data | MATH-500, 43 problems per level 1–5 (215 total). Level 1 = all 43; levels 2–5 = seeded subset, identical across runs. Collapsed to easy (1–2) / medium (3) / hard (4–5). |
| Iso-budget grid | `1×8000, 2×4000, 4×2000, 8×1000, 16×500` tokens |
| Thinking mode | Separate factor: think and no-think both run at every budget point |
| Samples | K = 16 per problem, Qwen-recommended sampling (think: T=0.6, p=0.95; no-think: T=0.7, p=0.8; top-k 20) |
| Scoring | `math_verify` symbolic equivalence; votes counted over answer **equivalence classes**, not strings |

### Three fairness rules
1. **A cap is not a cost.** Every result is plotted against *measured* mean generated tokens, never `max_tokens`.
2. **Budget forcing.** A truncated trace gets `</think>\n\nThe final answer is \boxed{` appended and 24 greedy tokens decoded, so short configs fail for reasoning, not formatting.
3. **Think mode is not confounded with depth/width.** Both modes run on the full grid.

### Efficiency trick (statistically exact)
A sample capped at L tokens is the first L tokens of the same sample capped at 8000. So each problem is generated **once at 8000 tokens × 16 samples**; every shorter length is a token-prefix truncation + budget-forcing pass. One generation run gives all five lengths, the iso-budget diagonal, the full 5×5 (N, L) surface, and bootstrap CIs by offline subsampling.

## Metrics
- `maj@N` — majority-vote accuracy (the deployable number)
- `pass@N` — unbiased oracle accuracy (is the answer anywhere in the pool?)
- `gap = pass@N − maj@N` — selection / self-verification bottleneck
- measured mean total tokens — the true x-axis
- truncation rate per config — diagnostic
- 95% CIs by problem-level bootstrap

## Running

`depth_vs_width_kaggle.ipynb` — **one Kaggle session = one (model, think, level)**. Set `MODEL_NAME`, `THINK`, `LEVEL` in the config cell and run all. Kaggle: GPU T4 ×2, Internet on. 20 sessions total (2 models × 2 modes × 5 levels), 688 sequences each.

Requires a Kaggle secret named `GITHUB_TOKEN` (repo-scoped GitHub PAT) — Add-ons → Secrets. The GITHUB SYNC cell clones this repo into the session and pushes `outputs/` to `main` after every completed problem, so progress is never only local. If a session dies mid-level, the next session re-clones, sees whatever was already pushed, and resumes from the next unfinished problem instead of starting the level over.

Each session writes one file, appending as it goes:

```
outputs/<model>/<think|nothink>/level<L>.jsonl        # 43 problems × 16 samples, one JSON per line
outputs/<model>/<think|nothink>/level<L>_problems.json # unique_ids used
```

Record schema:

```
unique_id, level, subject, gold, sample, full_tokens, finish_reason, text,
by_L: { "8000"|"4000"|"2000"|"1000"|"500":
        { tokens, truncated, forced, answer, forced_text?, cluster, correct } }
```

`tokens` is the measured count (prefix + forcing continuation). `cluster` is the equivalence-class id within that problem's answer pool (`-1` = no answer). Save Version or download `outputs/` after each session; the notebook's last cell reads all files under `OUT_ROOT` + `EXTRA_INPUTS` and prints the iso-budget table with CIs.

## Note
`depth_vs_width_kaggle.ipynb` is linked to Kaggle — edits made in the Kaggle notebook get pushed to this GitHub repo. When asked to do something here, first check/pull the latest push from Kaggle before acting.

For the other direction (GitHub → Kaggle), run the **Push notebook to Kaggle** workflow (Actions tab → select it → "Run workflow") after editing the notebook here. It uploads `depth_vs_width_kaggle.ipynb` as a new version of the Kaggle kernel `bhuwanadhikari7788/notebookc6a1f68347` via `kernel-metadata.json`, using the `KAGGLE_USERNAME`/`KAGGLE_KEY` repo secrets. It's manual-trigger only, not automatic on push, to avoid a push/pull loop with Kaggle's own auto-commit-to-GitHub.

## Status
Generation in progress. Results, figures, and the poster spec will be added once all 20 files exist.
