# ARCHIVED ORIGINAL STUDY

ScanPop and ReachOut results remain current. All PathAdapt/GatedBeta results in this archived document refer to the PREVIOUS policy. For the current Balanced policy, use pathadapt-results.md.

# Verified numerical results

| Metric | Median [Q25, Q75] | Wins/losses/ties |
|---|---|---|
| scan_auroc | 0.774 [0.749, 0.806] | |
| lab_ordinal_auroc | 0.621 [0.586, 0.649] | |
| scan_vs_lab_ordinal_auroc: paired difference | 0.153 [0.114, 0.191] | 96/0/0 |
| scan_vs_lab_ordinal_auroc: relative % | 24.04 [18.12, 32.19] | |
| scan_review_cases | 24.00 [20.00, 29.25] | |
| lab_review_cases | 17.00 [14.75, 20.00] | |
| scan_vs_lab_review_cases: paired difference | 7.00 [4.00, 10.00] | 94/2/0 |
| scan_vs_lab_review_cases: relative % | 39.64 [23.88, 57.86] | |
| scan_GatedBeta_mean | 2.804 [2.706, 2.926] | |
| scan_Fixed_mean | 2.725 [2.634, 2.839] | |
| A_mean: paired difference | 0.067 [0.008, 0.129] | 73/19/4 |
| A_mean: relative % | 2.46 [0.29, 4.75] | |
| scan_GatedBeta_mean | 2.804 [2.706, 2.926] | |
| lab_Fixed_mean | 2.735 [2.625, 2.831] | |
| B_mean: paired difference | 0.067 [-0.057, 0.195] | 61/34/1 |
| B_mean: relative % | 2.49 [-1.97, 7.16] | |
| scan_GatedBeta_mean | 2.804 [2.706, 2.926] | |
| strong_Fixed_mean | 2.719 [2.633, 2.827] | |
| C_mean: paired difference | 0.090 [0.000, 0.157] | 71/23/2 |
| C_mean: relative % | 3.27 [0.00, 5.91] | |
| strong_auroc | 0.776 [0.745, 0.808] | |
| strong_review_cases | 24.50 [20.75, 29.00] | |
| A_event_weighted | 0.002 [-0.002, 0.006] | 58/30/8 |
| B_event_weighted | 0.054 [0.031, 0.080] | 94/2/0 |
| C_event_weighted | 0.003 [-0.007, 0.009] | 57/36/3 |
| scan_vs_strong_review_cases | 0.000 [-1.000, 1.000] | 30/40/26 |
| scan_vs_strong_auroc | -0.001 [-0.005, 0.004] | 44/52/0 |
| scan_vs_lab_auroc | 0.150 [0.101, 0.181] | 96/0/0 |
| scan_vs_lab_id_tiebreak_cases | 7.000 [5.000, 10.000] | 93/0/3 |

## Original claims and corrected units
- ReachOut vs categories: 94/2/0 (wins/losses/ties).
- Ordinary engagement, same ScanPop queue: 73/19/4.
- Event-weighted engagement, same ScanPop queue: 58/30/8.
- Ordinary engagement, combined vs strong + fixed: 71/23/2.
- Event-weighted engagement, combined vs strong + fixed: 57/36/3.

Mandatory clinical reviews range from 1 to 60; median 12.5.
Prevalence range 0.0450--0.2225; median 0.1175.
Ratio-of-medians case improvement: 41.1765%; median of paired relative gains: 39.6429%.

Full means, medians, quartiles, paired differences and relative changes are in the CSVs. Counts on world-averaged totals can be fractional. Pooled participant-world summaries count repeated worlds, not independent people.
