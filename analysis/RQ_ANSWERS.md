# Research-question answers (budget 8K, one long answer 1×8K vs 4×2K votes)

## RQ1: same budget, which solves more problems?

- Qwen3-1.7B, think: one long wins: 90.3% vs 80.1% (Δ -10.2 pp [-13.6, -7.0]); across all 10 same-budget pairs: votes win 0, one long wins 10
- Qwen3-1.7B, nothink: votes win: 77.5% vs 79.9% (Δ +2.4 pp [+1.4, +3.5]); across all 10 same-budget pairs: votes win 1, one long wins 6
- Qwen3-4B, think: one long wins: 94.7% vs 84.5% (Δ -10.3 pp [-13.9, -6.5]); across all 10 same-budget pairs: votes win 0, one long wins 10
- Qwen3-4B, nothink: no clear winner: 87.5% vs 88.7% (Δ +1.3 pp [-0.2, +2.6]); across all 10 same-budget pairs: votes win 0, one long wins 7

## RQ2: does the answer change?

- **difficulty**: easy -1.0 pp (no clear winner), medium -1.1 pp (no clear winner), hard -8.8 pp (one long wins). Contrast hard − easy: -7.8 pp [-12.0, -3.6] → changes the answer
- **model size**: 1.7B -3.9 pp (one long wins), 4B -4.5 pp (one long wins). Contrast 4B − 1.7B: -0.6 pp [-2.2, +1.1] → no clear change
- **thinking mode**: on -10.2 pp (one long wins), off +1.8 pp (votes win). Contrast on − off: -12.0 pp [-15.3, -9.0] → changes the answer

## Tables

- `tables/T13_rq1_same_budget.csv`
- `tables/T14_rq2_factor_effects.csv`
