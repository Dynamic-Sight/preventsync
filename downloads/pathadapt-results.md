# PathAdapt v2: fresh synthetic evaluation

Selected on development only: **Balanced**. Engineering success criteria met: **True**.

96 development and 96 distinct evaluation environments; 400 virtual people each. Same selection rule and paired invitations, 12-week duration and six-offer cap. This is a new simulation experiment, not a replacement for the historical application results.

| Policy | Mean modules / invited person | Mean offers / invited person |
|---|---:|---:|
| Balanced | 2.876335 | 5.999395 |
| ContextualBeta | 2.839748 | 5.999395 |
| Fixed | 2.739204 | 5.999395 |
| GatedBeta | 2.788249 | 5.999395 |

## Selected policy: paired comparisons

| Reference / world | Mean gain [95% CI] | Median gain [Q25, Q75] | Wins/losses/ties |
|---|---|---|---|
| Fixed / All_worlds | 0.1371 [0.1150, 0.1583] | 0.1339 [0.0597, 0.2334] | 83/11/2 |
| Fixed / NoContext | 0.0069 [0.0007, 0.0145] | 0.0000 [0.0000, 0.0000] | 10/5/81 |
| Fixed / StablePreference | 0.1722 [0.1419, 0.2030] | 0.1656 [0.0631, 0.3027] | 78/12/6 |
| Fixed / PreferenceReversal | 0.1857 [0.1546, 0.2175] | 0.1916 [0.0801, 0.3275] | 78/15/3 |
| Fixed / MissingDelayed | 0.1838 [0.1509, 0.2150] | 0.1792 [0.0705, 0.2811] | 85/10/1 |
| GatedBeta / All_worlds | 0.0881 [0.0704, 0.1067] | 0.0794 [0.0266, 0.1357] | 84/10/2 |
| GatedBeta / NoContext | 0.0069 [0.0007, 0.0145] | 0.0000 [0.0000, 0.0000] | 10/5/81 |
| GatedBeta / StablePreference | 0.1088 [0.0811, 0.1357] | 0.0871 [0.0000, 0.2013] | 71/16/9 |
| GatedBeta / PreferenceReversal | 0.0891 [0.0618, 0.1172] | 0.0656 [0.0000, 0.1692] | 67/23/6 |
| GatedBeta / MissingDelayed | 0.1476 [0.1191, 0.1767] | 0.1384 [0.0443, 0.2393] | 86/7/3 |
| ContextualBeta / All_worlds | 0.0366 [0.0194, 0.0541] | 0.0392 [-0.0079, 0.0870] | 66/28/2 |
| ContextualBeta / NoContext | 0.0570 [0.0278, 0.0854] | 0.0541 [-0.0345, 0.1453] | 61/29/6 |
| ContextualBeta / StablePreference | 0.0252 [0.0051, 0.0473] | 0.0269 [-0.0324, 0.0821] | 51/36/9 |
| ContextualBeta / PreferenceReversal | 0.0281 [0.0059, 0.0509] | 0.0340 [-0.0268, 0.0879] | 59/30/7 |
| ContextualBeta / MissingDelayed | 0.0361 [0.0129, 0.0599] | 0.0465 [-0.0430, 0.1092] | 63/30/3 |

## Interpretation and limits

Selection used only development outcomes. The evaluation cohorts and engagement streams were then generated once using disjoint seeds. All baseline-equivalence, feedback-causality, eligibility, offer-budget and paired-count checks passed. Confidence intervals resample environments within six settings; worlds remain dependent.
The retained fixed policy is pilot-informed, not an intentionally weak baseline. A higher aggregate score does not establish a gain in every response world. Read all world-specific contrasts, including NoContext. Safety tolerances are research engineering choices, not clinical thresholds.
The same simulator family and fully observed preferences remain strong assumptions. The six-offer cap means many people exhaust invitations before preference reversal in week 6; the reversal world is therefore a limited test of later adaptation. There is no spontaneous-activity/no-prompt model, clinical outcome effect, dropout process or causal clinical validation. Delayed/missing feedback mechanisms are unchanged.
No clinical deployment, application-number replacement or dashboard change has been made. A later timing/no-prompt study needs an independently defined response model and pilot-informed assumptions.
