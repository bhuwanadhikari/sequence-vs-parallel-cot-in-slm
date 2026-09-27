# Findings: depth vs. width on MATH-500 (auto-generated)

215 problems (L1 43, L2 43, L3 43, L4 43, L5 43), 16 samples each, 2 models × 2 modes = 13,760 traces. maj@N/pass@N are exact over all C(16,N) subsets; CIs come from a 2000× level-stratified problem bootstrap, paired across configs.

## Headline candidates

- With ≈8K thinking tokens per MATH-500 problem, the best split is 1×8K at 1.7B (90.3% vs 90.3% for one 8K trace) and 1×8K at 4B (94.7% vs 94.7%).
- At 2×4K, the correct answer is among 1.7B's samples for 90.0% of problems, but the vote returns it for only 85.6%: a 4.4-point selection gap (3.2 points for 4B at 2×4K).
- One '8K' thinking trace actually spends 3,949 tokens at 1.7B and 3,830 at 4B (49.4% and 47.9% of the cap), so every comparison uses measured tokens.

## Hypothesis verdicts

| hypothesis | mode | claim | estimate pp | lo | hi | verdict | detail |
|---|---|---|---|---|---|---|---|
| H1 | think | width beats one 8K trace at Qwen3-1.7B (best width shape − 1×8K) | -4.7 | -6.3 | -3.1 | REFUTED | best width shape 2×4K; overall best 1×8K |
| H1' | think | same contrast at Qwen3-4B | -4.3 | -6.2 | -2.6 | descriptive | best width shape 2×4K; overall best 1×8K |
| H2 | think | capacity moves the optimum toward depth: width advantage 1.7B − 4B | -0.4 | -1.9 | 1.2 | INCONCLUSIVE | E[log2 N*] 0.00 (1.7B) vs 0.00 (4B); P(4B optimum deeper) = 0.00 |
| H3 | think | selection gap (pass − maj, mean over 4 width shapes) larger at 1.7B | 0.5 | -1.3 | 2.4 | INCONCLUSIVE | gap 7.5 pp (1.7B) vs 7.1 pp (4B) |
| H4 | think | more thinking self-corrects more at 4B: net (fix − break) per still-thinking sample, 4B − 1.7B | 0.7 | -0.7 | 1.9 | INCONCLUSIVE | net 13.5 (1.7B) vs 14.2 (4B) per 100 still-thinking samples |
| H5 (exploratory) | think | harder problems shift Qwen3-1.7B toward depth: width advantage easy − hard | 8.1 | 4.5 | 12.0 | SUPPORTED | best easy 1×8K, best hard 1×8K |
| H5 (exploratory) | think | harder problems shift Qwen3-4B toward depth: width advantage easy − hard | 8.8 | 4.7 | 13.4 | SUPPORTED | best easy 1×8K, best hard 1×8K |
| H1 | nothink | width beats one 8K trace at Qwen3-1.7B (best width shape − 1×8K) | 2.4 | 1.4 | 3.5 | SUPPORTED | best width shape 4×2K; overall best 4×2K |
| H1' | nothink | same contrast at Qwen3-4B | 1.3 | -0.1 | 2.6 | descriptive | best width shape 4×2K; overall best 4×2K |
| H2 | nothink | capacity moves the optimum toward depth: width advantage 1.7B − 4B | 1.1 | -0.3 | 2.5 | INCONCLUSIVE | E[log2 N*] 2.02 (1.7B) vs 1.91 (4B); P(4B optimum deeper) = 0.06 |
| H3 | nothink | selection gap (pass − maj, mean over 4 width shapes) larger at 1.7B | 3.2 | 1.2 | 5.3 | SUPPORTED | gap 9.7 pp (1.7B) vs 6.6 pp (4B) |
| H4 | nothink | more thinking self-corrects more at 4B: net (fix − break) per still-thinking sample, 4B − 1.7B | 5.6 | 1.6 | 9.3 | SUPPORTED | net 23.3 (1.7B) vs 28.9 (4B) per 100 still-thinking samples |
| H5 (exploratory) | nothink | harder problems shift Qwen3-1.7B toward depth: width advantage easy − hard | -0.8 | -3.3 | 1.7 | INCONCLUSIVE | best easy 8×1K, best hard 4×2K |
| H5 (exploratory) | nothink | harder problems shift Qwen3-4B toward depth: width advantage easy − hard | 0.6 | -2.8 | 3.2 | INCONCLUSIVE | best easy 8×1K, best hard 4×2K |

## Iso-budget diagonal: maj@N [95% CI] (%)

| model | mode | difficulty | 1×8K | 2×4K | 4×2K | 8×1K | 16×500 |
|---|---|---|---|---|---|---|---|
| Qwen3-1.7B | nothink | all | 77.5 [73, 82] | 77.6 [73, 82] | 79.9 [76, 84] | 77.8 [73, 83] | 64.0 [58, 70] |
| Qwen3-1.7B | nothink | easy | 89.4 [84, 94] | 89.4 [84, 94] | 90.8 [85, 96] | 91.0 [85, 96] | 85.5 [78, 92] |
| Qwen3-1.7B | nothink | hard | 63.8 [56, 72] | 63.8 [56, 72] | 66.2 [58, 75] | 62.5 [54, 72] | 42.1 [33, 52] |
| Qwen3-1.7B | nothink | medium | 81.1 [72, 89] | 81.4 [73, 89] | 85.6 [77, 94] | 82.1 [72, 91] | 65.1 [51, 79] |
| Qwen3-1.7B | think | all | 90.3 [87, 93] | 85.6 [82, 89] | 80.1 [75, 85] | 72.5 [67, 78] | 51.2 [46, 57] |
| Qwen3-1.7B | think | easy | 96.7 [93, 99] | 95.4 [91, 98] | 92.7 [88, 97] | 91.1 [85, 96] | 75.0 [66, 84] |
| Qwen3-1.7B | think | hard | 82.8 [77, 88] | 73.4 [66, 80] | 64.7 [55, 74] | 51.6 [42, 61] | 23.3 [15, 33] |
| Qwen3-1.7B | think | medium | 92.3 [86, 97] | 90.3 [83, 96] | 86.0 [76, 94] | 77.0 [65, 88] | 59.3 [45, 73] |
| Qwen3-4B | nothink | all | 87.5 [84, 90] | 87.4 [84, 90] | 88.7 [85, 92] | 85.9 [82, 90] | 70.0 [65, 75] |
| Qwen3-4B | nothink | easy | 94.6 [91, 98] | 94.6 [91, 98] | 95.8 [92, 98] | 96.1 [92, 99] | 90.7 [85, 96] |
| Qwen3-4B | nothink | hard | 76.7 [70, 83] | 76.4 [69, 83] | 77.5 [70, 85] | 72.5 [64, 81] | 44.8 [35, 55] |
| Qwen3-4B | nothink | medium | 94.8 [89, 98] | 94.8 [89, 98] | 97.2 [92, 100] | 92.1 [84, 98] | 79.1 [67, 91] |
| Qwen3-4B | think | all | 94.7 [92, 97] | 90.4 [87, 93] | 84.5 [80, 88] | 72.3 [67, 77] | 53.3 [47, 59] |
| Qwen3-4B | think | easy | 97.9 [95, 100] | 97.1 [94, 100] | 95.3 [91, 99] | 89.0 [82, 95] | 76.6 [68, 85] |
| Qwen3-4B | think | hard | 90.8 [85, 95] | 81.2 [74, 88] | 70.3 [61, 79] | 50.1 [41, 60] | 25.6 [16, 35] |
| Qwen3-4B | think | medium | 96.4 [91, 100] | 95.6 [90, 100] | 91.2 [83, 98] | 83.2 [72, 92] | 62.4 [48, 76] |

## Optimal allocation

| model | mode | difficulty | best shape | E[log2 N*] | best width shape | Δ best width − 1×8K | Δ lo | Δ hi | mean Δ of 4 width shapes | mean Δ of 4 width shapes lo | mean Δ of 4 width shapes hi | slope pp per doubling N | slope pp per doubling N lo | slope pp per doubling N hi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Qwen3-1.7B | think | easy | 1×8K | 0.0 | 2×4K | -1.3 | -2.5 | -0.4 | -8.2 | -11.5 | -5.0 | -4.8 | -6.6 | -3.0 |
| Qwen3-1.7B | think | medium | 1×8K | 0.03 | 2×4K | -2.0 | -4.7 | 0.1 | -14.2 | -20.0 | -8.6 | -7.9 | -11.0 | -5.0 |
| Qwen3-1.7B | think | hard | 1×8K | 0.0 | 2×4K | -9.4 | -13.1 | -6.0 | -29.6 | -35.0 | -24.3 | -14.1 | -16.3 | -11.8 |
| Qwen3-1.7B | think | all | 1×8K | 0.0 | 2×4K | -4.7 | -6.3 | -3.1 | -18.0 | -20.8 | -15.0 | -9.1 | -10.4 | -7.8 |
| Qwen3-1.7B | nothink | easy | 8×1K | 2.7 | 8×1K | 1.6 | 0.3 | 3.2 | -0.2 | -1.7 | 1.2 | -0.6 | -1.7 | 0.3 |
| Qwen3-1.7B | nothink | medium | 4×2K | 2.05 | 4×2K | 4.5 | 2.3 | 7.0 | -2.6 | -6.0 | 0.6 | -3.1 | -5.5 | -0.9 |
| Qwen3-1.7B | nothink | hard | 4×2K | 2.02 | 4×2K | 2.4 | 0.4 | 4.4 | -5.2 | -8.2 | -2.3 | -4.5 | -6.5 | -2.6 |
| Qwen3-1.7B | nothink | all | 4×2K | 2.02 | 4×2K | 2.4 | 1.4 | 3.5 | -2.7 | -4.1 | -1.1 | -2.7 | -3.7 | -1.6 |
| Qwen3-4B | think | easy | 1×8K | 0.01 | 2×4K | -0.8 | -1.7 | -0.1 | -8.4 | -11.8 | -5.3 | -5.1 | -7.0 | -3.2 |
| Qwen3-4B | think | medium | 1×8K | 0.28 | 2×4K | -0.7 | -3.3 | 1.2 | -13.2 | -20.8 | -6.1 | -8.0 | -11.7 | -4.5 |
| Qwen3-4B | think | hard | 1×8K | 0.0 | 2×4K | -9.6 | -14.2 | -5.4 | -34.0 | -40.4 | -27.3 | -16.1 | -18.6 | -13.6 |
| Qwen3-4B | think | all | 1×8K | 0.0 | 2×4K | -4.3 | -6.2 | -2.6 | -19.6 | -22.9 | -16.3 | -10.1 | -11.6 | -8.6 |
| Qwen3-4B | nothink | easy | 8×1K | 2.81 | 8×1K | 1.5 | 0.4 | 3.3 | -0.3 | -1.7 | 0.9 | -0.6 | -1.7 | 0.3 |
| Qwen3-4B | nothink | medium | 4×2K | 2.04 | 4×2K | 2.4 | 1.0 | 4.0 | -4.0 | -8.3 | -0.3 | -3.4 | -6.3 | -0.9 |
| Qwen3-4B | nothink | hard | 4×2K | 1.41 | 4×2K | 0.8 | -0.6 | 4.0 | -8.9 | -12.4 | -5.2 | -6.8 | -8.9 | -4.6 |
| Qwen3-4B | nothink | all | 4×2K | 1.91 | 4×2K | 1.3 | -0.1 | 2.6 | -4.5 | -6.2 | -2.8 | -3.6 | -4.7 | -2.6 |

## Capacity shift (1.7B vs 4B)

| mode | difficulty | best 1.7B | best 4B | Δbest 1.7B − Δbest 4B | lo | hi | P(4B optimum deeper) | P(same optimum) | mean width Δ, 1.7B − 4B | mean width Δ, 1.7B − 4B lo | mean width Δ, 1.7B − 4B hi | DiD 2×4K | DiD 4×2K | DiD 8×1K | DiD 16×500 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| think | easy | 1×8K | 1×8K | -0.5 | -1.3 | 0.3 | 0.001 | 0.993 | 0.2 | -2.3 | 3.0 | -0.5 [-1.3, +0.3] | -1.4 [-4.6, +1.8] | +3.2 [-0.1, +7.4] | -0.4 [-7.8, +6.8] |
| think | medium | 1×8K | 1×8K | -1.3 | -4.8 | 2.2 | 0.021 | 0.737 | -0.9 | -6.6 | 4.6 | -1.3 [-4.7, +2.2] | -1.2 [-6.4, +4.6] | -2.2 [-9.9, +4.4] | +1.0 [-10.8, +12.8] |
| think | hard | 1×8K | 1×8K | 0.1 | -3.1 | 3.6 | 0.0 | 1.0 | 4.3 | -0.1 | 8.5 | +0.1 [-3.1, +3.6] | +2.3 [-3.5, +7.9] | +9.4 [+2.2, +16.6] | +5.6 [-2.4, +13.4] |
| think | all | 1×8K | 1×8K | -0.4 | -1.9 | 1.2 | 0.0 | 1.0 | 1.6 | -0.8 | 3.9 | -0.4 [-1.9, +1.2] | +0.1 [-2.7, +2.8] | +4.6 [+1.0, +8.2] | +2.3 [-2.8, +6.9] |
| nothink | easy | 8×1K | 8×1K | 0.1 | -2.2 | 2.1 | 0.171 | 0.576 | 0.1 | -1.5 | 1.7 | +0.0 [+0.0, +0.0] | +0.3 [-1.2, +1.6] | +0.1 [-2.4, +2.5] | +0.0 [-5.8, +5.7] |
| nothink | medium | 4×2K | 4×2K | 2.1 | 0.1 | 4.3 | 0.04 | 0.924 | 1.5 | -2.3 | 4.9 | +0.3 [+0.0, +0.9] | +2.1 [+0.1, +4.3] | +3.7 [-2.5, +10.4] | -0.3 [-11.0, +10.2] |
| nothink | hard | 4×2K | 4×2K | 1.5 | -1.7 | 3.8 | 0.319 | 0.677 | 3.7 | 0.8 | 6.5 | +0.3 [+0.0, +0.7] | +1.5 [-1.7, +4.8] | +2.8 [-1.9, +7.7] | +10.2 [+3.3, +16.7] |
| nothink | all | 4×2K | 4×2K | 1.1 | -0.3 | 2.5 | 0.06 | 0.937 | 1.8 | 0.3 | 3.2 | +0.2 [+0.0, +0.3] | +1.1 [-0.3, +2.5] | +1.9 [-0.5, +4.3] | +4.0 [+0.1, +7.9] |

## Selection gap, mean over the 4 width shapes

| mode | difficulty | mean gap Qwen3-1.7B | mean gap Qwen3-1.7B lo | mean gap Qwen3-1.7B hi | mean gap Qwen3-4B | mean gap Qwen3-4B lo | mean gap Qwen3-4B hi | 1.7B − 4B | 1.7B − 4B lo | 1.7B − 4B hi |
|---|---|---|---|---|---|---|---|---|---|---|
| think | easy | 5.4 | 3.3 | 7.8 | 4.6 | 2.5 | 6.9 | 0.8 | -1.8 | 3.5 |
| think | medium | 8.7 | 4.7 | 13.7 | 6.5 | 3.3 | 10.2 | 2.2 | -2.2 | 6.6 |
| think | hard | 9.2 | 6.9 | 11.6 | 9.9 | 7.5 | 12.4 | -0.7 | -3.6 | 2.4 |
| think | all | 7.5 | 6.1 | 9.2 | 7.1 | 5.6 | 8.7 | 0.5 | -1.3 | 2.4 |
| nothink | easy | 5.7 | 2.8 | 9.3 | 4.2 | 2.0 | 6.9 | 1.5 | -1.5 | 4.5 |
| nothink | medium | 13.2 | 7.7 | 19.6 | 3.9 | 1.7 | 6.3 | 9.4 | 4.1 | 15.6 |
| nothink | hard | 12.0 | 8.7 | 15.5 | 10.2 | 7.5 | 13.1 | 1.8 | -1.4 | 5.1 |
| nothink | all | 9.7 | 7.6 | 12.1 | 6.6 | 5.0 | 8.1 | 3.2 | 1.2 | 5.3 |

## Truncation at each cap (all levels)

| model | mode | L | % truncated | acc natural-finish % | acc forced % | % no answer among forced | tokens/sample | acc/sample (maj@1) % |
|---|---|---|---|---|---|---|---|---|
| Qwen3-1.7B | think | 8000 | 16.7 | 97.6 | 53.8 | 0.0 | 3949 | 90.3 |
| Qwen3-1.7B | think | 4000 | 37.4 | 99.2 | 62.8 | 0.0 | 2952 | 85.6 |
| Qwen3-1.7B | think | 2000 | 75.8 | 99.6 | 69.7 | 0.0 | 1898 | 77.0 |
| Qwen3-1.7B | think | 1000 | 98.9 | 100.0 | 68.5 | 0.0 | 1013 | 68.9 |
| Qwen3-1.7B | think | 500 | 100.0 |  | 48.2 | 0.0 | 513 | 48.2 |
| Qwen3-1.7B | nothink | 8000 | 0.6 | 78.0 | 0.0 | 4.5 | 759 | 77.5 |
| Qwen3-1.7B | nothink | 4000 | 1.7 | 78.7 | 8.8 | 0.0 | 720 | 77.6 |
| Qwen3-1.7B | nothink | 2000 | 6.3 | 81.2 | 13.0 | 0.5 | 655 | 76.9 |
| Qwen3-1.7B | nothink | 1000 | 19.0 | 86.7 | 17.0 | 0.6 | 547 | 73.5 |
| Qwen3-1.7B | nothink | 500 | 46.5 | 92.4 | 23.5 | 0.3 | 404 | 60.4 |
| Qwen3-4B | think | 8000 | 12.5 | 98.6 | 67.4 | 0.0 | 3830 | 94.7 |
| Qwen3-4B | think | 4000 | 36.2 | 99.6 | 74.3 | 0.0 | 2975 | 90.4 |
| Qwen3-4B | think | 2000 | 76.9 | 100.0 | 77.2 | 0.0 | 1913 | 82.5 |
| Qwen3-4B | think | 1000 | 99.7 | 100.0 | 68.8 | 0.0 | 1016 | 68.9 |
| Qwen3-4B | think | 500 | 100.0 |  | 50.4 | 0.0 | 517 | 50.4 |
| Qwen3-4B | nothink | 8000 | 0.9 | 88.0 | 23.3 | 0.0 | 761 | 87.5 |
| Qwen3-4B | nothink | 4000 | 1.3 | 88.1 | 27.3 | 0.0 | 722 | 87.4 |
| Qwen3-4B | nothink | 2000 | 6.0 | 90.1 | 20.2 | 0.0 | 668 | 85.8 |
| Qwen3-4B | nothink | 1000 | 19.1 | 93.8 | 29.6 | 0.2 | 561 | 81.5 |
| Qwen3-4B | nothink | 500 | 48.1 | 95.9 | 33.6 | 0.2 | 413 | 66.0 |

## Think vs no-think (all levels)

| model | shape | maj think | maj nothink | think − nothink | think − nothink lo | think − nothink hi | p | tokens think | tokens nothink |
|---|---|---|---|---|---|---|---|---|---|
| Qwen3-1.7B | 1×8K | 90.3 | 77.5 | 12.8 | 9.4 | 16.4 | 0.0 | 3949 | 759 |
| Qwen3-1.7B | 2×4K | 85.6 | 77.6 | 8.0 | 4.7 | 11.5 | 0.0 | 5904 | 1440 |
| Qwen3-1.7B | 4×2K | 80.1 | 79.9 | 0.2 | -3.4 | 4.2 | 0.919 | 7594 | 2621 |
| Qwen3-1.7B | 8×1K | 72.5 | 77.8 | -5.3 | -9.6 | -1.1 | 0.023 | 8100 | 4377 |
| Qwen3-1.7B | 16×500 | 51.2 | 64.0 | -12.9 | -18.5 | -7.7 | 0.0 | 8214 | 6467 |
| Qwen3-4B | 1×8K | 94.7 | 87.5 | 7.3 | 4.5 | 10.1 | 0.0 | 3830 | 761 |
| Qwen3-4B | 2×4K | 90.4 | 87.4 | 3.1 | 0.3 | 5.9 | 0.028 | 5951 | 1444 |
| Qwen3-4B | 4×2K | 84.5 | 88.7 | -4.3 | -7.8 | -0.9 | 0.013 | 7653 | 2670 |
| Qwen3-4B | 8×1K | 72.3 | 85.9 | -13.5 | -17.9 | -9.4 | 0.0 | 8130 | 4492 |
| Qwen3-4B | 16×500 | 53.3 | 70.0 | -16.7 | -22.2 | -11.7 | 0.0 | 8277 | 6602 |

## Pareto frontier over measured tokens (all levels)

| model | mode | config | N | L | on diagonal | tokens measured | maj@N |
|---|---|---|---|---|---|---|---|
| Qwen3-1.7B | nothink | 1×500 | 1 | 500 | False | 404 | 60.4 |
| Qwen3-1.7B | nothink | 1×1K | 1 | 1000 | False | 547 | 73.5 |
| Qwen3-1.7B | nothink | 1×2K | 1 | 2000 | False | 655 | 76.9 |
| Qwen3-1.7B | nothink | 1×4K | 1 | 4000 | False | 720 | 77.6 |
| Qwen3-1.7B | nothink | 4×2K | 4 | 2000 | True | 2621 | 79.9 |
| Qwen3-1.7B | nothink | 4×4K | 4 | 4000 | False | 2880 | 80.8 |
| Qwen3-1.7B | think | 1×4K | 1 | 4000 | False | 2952 | 85.6 |
| Qwen3-1.7B | think | 1×8K | 1 | 8000 | True | 3949 | 90.3 |
| Qwen3-1.7B | think | 4×8K | 4 | 8000 | False | 15795 | 93.0 |
| Qwen3-1.7B | think | 8×8K | 8 | 8000 | False | 31591 | 94.0 |
| Qwen3-1.7B | think | 16×8K | 16 | 8000 | False | 63181 | 94.4 |
| Qwen3-4B | nothink | 1×500 | 1 | 500 | False | 413 | 66.0 |
| Qwen3-4B | nothink | 1×1K | 1 | 1000 | False | 561 | 81.5 |
| Qwen3-4B | nothink | 1×2K | 1 | 2000 | False | 668 | 85.8 |
| Qwen3-4B | nothink | 1×4K | 1 | 4000 | False | 722 | 87.4 |
| Qwen3-4B | nothink | 1×8K | 1 | 8000 | True | 761 | 87.5 |
| Qwen3-4B | nothink | 4×2K | 4 | 2000 | True | 2670 | 88.7 |
| Qwen3-4B | nothink | 4×4K | 4 | 4000 | False | 2888 | 90.5 |
| Qwen3-4B | nothink | 4×8K | 4 | 8000 | False | 3045 | 90.6 |
| Qwen3-4B | think | 1×8K | 1 | 8000 | True | 3830 | 94.7 |
| Qwen3-4B | think | 4×8K | 4 | 8000 | False | 15319 | 95.5 |
| Qwen3-4B | think | 8×8K | 8 | 8000 | False | 30638 | 95.7 |
| Qwen3-4B | think | 16×8K | 16 | 8000 | False | 61275 | 95.8 |

## Figures

- `figures/F10_vote_share_calibration.png`
- `figures/F11_trace_length_ecdf.png`
- `figures/F1_crossover_all_levels_both_modes.png`
- `figures/F1_crossover_nothink.png`
- `figures/F1_crossover_think.png`
- `figures/F2_pass_vs_maj_gap_nothink.png`
- `figures/F2_pass_vs_maj_gap_think.png`
- `figures/F2_pass_vs_maj_gap_think_hard.png`
- `figures/F3_accuracy_vs_measured_tokens.png`
- `figures/F3_accuracy_vs_measured_tokens_hard.png`
- `figures/F4_width_minus_depth_by_level.png`
- `figures/F5_outcomes_nothink.png`
- `figures/F5_outcomes_think.png`
- `figures/F6_self_correction.png`
- `figures/F7_truncation_and_depth_curve.png`
- `figures/F8_surface_maj_all.png`
- `figures/F8_surface_pass_all.png`
- `figures/F9_budget_sweep_N2_cap.png`
- `figures/F9_budget_sweep_N4_cap.png`
- `figures/F9_budget_sweep_N4_measured.png`
- `figures/R1a_same_budget_all_splits.png`
- `figures/R1a_same_budget_all_splits_hard.png`
- `figures/R1b_problems_solved_8K_all.png`
- `figures/R1c_accuracy_bars_8K_all.png`
- `figures/R2a_by_level_8K.png`
- `figures/R2b_factor_effects_8K.png`
- `figures/R2c_winner_map_N4.png`
- `figures/R3_answer_outcomes_by_cap_all.png`
- `figures/R3_answer_outcomes_by_cap_hard.png`

## Tables

- `tables/T10_vote_share_calibration.csv`
- `tables/T11_length_and_reflection.csv`
- `tables/T12_hypothesis_verdicts.csv`
- `tables/T13_rq1_same_budget.csv`
- `tables/T14_rq2_factor_effects.csv`
- `tables/T15_answer_outcomes_by_cap.csv`
- `tables/T1_iso_budget_diagonal.csv`
- `tables/T1b_iso_budget_compact.csv`
- `tables/T2_NxL_surface.csv`
- `tables/T3_optimal_allocation.csv`
- `tables/T3b_capacity_shift.csv`
- `tables/T4_selection_gap.csv`
- `tables/T4b_selection_gap_by_model.csv`
- `tables/T5_self_correction.csv`
- `tables/T6_truncation_forcing.csv`
- `tables/T6b_trace_lengths.csv`
- `tables/T7_think_vs_nothink.csv`
- `tables/T8_pareto_measured_tokens.csv`
- `tables/T9_budget_sweep.csv`
