# Eval Pipeline Audit Report

**Project:** Model Behavior Spec — Mistral Code Models
**Pipeline:** Promptfoo with `mistral-large-latest` as LLM judge
**Date:** 2026-04-06

---

## 1. Error Analysis

### No systematic error analysis has been performed
**Status:** Problem exists

All 39 criteria were brainstormed from first principles, not derived from observed model failures. The README explicitly lists "Add a taxonomy of the many common ways that code fails" as a TODO. Zero trace datasets, failure category files, or analysis artifacts exist in the repository.

**Fix:** Run `error-analysis` on a batch of real model outputs. If no production traces exist, use `generate-synthetic-data` first to create test inputs, run them through the three Mistral models, then analyze the resulting traces for failure patterns.

---

## 2. Evaluator Design

### Code Generation tests are not wired into the eval config
**Status:** Problem exists

The 3 Code Generation samples (S-CG-1, S-CG-2, S-CG-3) and all 7 CG criteria exist in the spec but have **zero test cases** in `promptfooconfig.yaml`. Only 7 tests run, not 10. This means an entire intent category (FIM code completion) is completely unevaluated.

**Fix:** Add CG test cases to the config. Use `type: javascript` or `type: python` assertions for deterministically checkable criteria (CG-1 syntax validity via `ast.parse()`, CG-5 no-markdown via regex). Reserve `llm-rubric` for CG-2 (semantic consistency) and CG-6 (comment conventions).

### Code-based checks not used where possible
**Status:** Problem exists

CG-1 (syntax validity) and CG-5 (raw code only, no markdown) are objectively verifiable with a parser and regex respectively. Using an LLM judge for syntax checking is unreliable — LLMs are poor parsers. CG-4 (no new imports) and CG-7 (scope boundary) are also partially automatable via AST checks.

**Fix:** Implement deterministic assertions for CG-1, CG-5, CG-4, and CG-7. Use `write-judge-prompt` only for criteria requiring interpretation.

### Some rubrics are too vague for reliable judging
**Status:** Problem exists

Several rubrics are holistic rather than targeted:
- CU-2: "Response must answer the question asked" — doesn't specify which questions
- CU-3: "Be factually accurate" — no ground truth provided to the judge
- CR-2: "Provide accurate and correct suggestions" — judge must infer what's correct
- CR-8: "Identify common footguns" — doesn't name which ones

The detailed per-sample grading notes in `sample-examples.md` already contain the specificity needed but are **not injected into judge context**.

**Fix:** Propagate the ground-truth context from `sample-examples.md` into the assertion `value` strings. For example, change CU-2 for CU-S1 from "answer the question asked" to "answer all three questions: (1) what enumerate does, (2) how the list comprehension works, (3) what the len(word) > 4 filter does."

### Judge prompt is generic and uncalibrated
**Status:** Problem exists

The judge system prompt is the stock Promptfoo `llm-rubric` prompt with two trivial domain-unrelated examples ("Hello world" greeting, pirate speak). It has no domain anchoring (doesn't know it's evaluating a code assistant), no strictness calibration, and no access to ground-truth answers.

**Fix:** Use `write-judge-prompt` to create a domain-specific judge prompt with code-domain few-shot examples, strictness guidance, and explicit pass/fail definitions.

### Binary pass/fail scoring
**Status:** OK

All 39 criteria use binary pass/fail. No Likert scales or ambiguous numeric scoring.

### No similarity metrics
**Status:** OK

No ROUGE, BERTScore, or embedding-distance metrics are used.

---

## 3. Judge Validation

### LLM judge is completely unvalidated
**Status:** Problem exists

No confusion matrices, TPR/TNR measurements, alignment scores, or validation datasets exist. The judge (mistral-large-latest) is operating with zero calibration against human labels. There is no way to know if it consistently misses failures or over-flags passing responses.

Additionally, using a Mistral model to judge Mistral model outputs introduces potential same-family bias.

**Fix:** Use `validate-evaluator` after collecting human labels. Collect ~50 Pass and ~50 Fail labeled examples per criterion category, then measure TPR and TNR.

### No train/dev/test split
**Status:** Problem exists

The 2 few-shot examples in the judge prompt are generic (not from the eval domain), and there is no separation of calibration data from evaluation data. All 7 test cases serve a single undifferentiated purpose.

**Fix:** Implement a proper split when building labeled data. Use `validate-evaluator` to structure this.

---

## 4. Human Review Process

### No human review process exists
**Status:** Problem exists

The entire pipeline is automated LLM grading with no human-in-the-loop. No annotation guidelines, reviewer instructions, labeled data from human review, or review interfaces exist. The README acknowledges the pipeline is "basic and naive."

**Fix:** Start with `error-analysis` which requires human trace review. Use `build-review-interface` to create a custom annotation tool for reviewing model outputs in a formatted, readable way rather than raw JSON.

---

## 5. Labeled Data

### Critically insufficient data
**Status:** Problem exists

| Metric | Current | Target |
|--------|---------|--------|
| Test cases in config | 7 | ~100 for saturation |
| Stored traces | 0 | ~100 for error analysis |
| Labeled Pass/Fail for judge validation | 0 | ~50 Pass + ~50 Fail |
| Criteria coverage | 19/39 (48.7%) | 39/39 (100%) |

The entire Code Generation category (7 criteria) has 0% coverage. Five Code Understanding criteria (CU-8, CU-9, CU-10, CU-11, CU-13) and eight Code Review criteria (CR-3, CR-4, CR-5, CR-11, CR-13, CR-14, CR-15, CR-16) are defined but never tested. Notably, `sample-examples.md` identifies CU-8, CU-9, and CU-11 as relevant for CU-S4 but these were never translated into assertions.

**Fix:** Use `generate-synthetic-data` to create diverse test inputs covering the 20 untested criteria. Prioritize Code Generation (0% coverage) and the spec-to-eval gaps where grading guidance exists but assertions don't.

---

## 6. Pipeline Hygiene

### Eval artifacts written once, never iterated
**Status:** Problem exists

All eval files were created in the initial commit (2026-03-29) and have not been modified in git since. The README mentions that iteration happened during development ("many of my initial criteria were poorly worded"), but this history was not captured in version control.

### No CI/CD or automation
**Status:** Problem exists

No GitHub Actions, no CI config, no automated eval runs. Evals can only be triggered manually via `npx promptfoo eval`.

### No maintenance process documented
**Status:** Problem exists

No runbook, no schedule for re-running evals, no documented triggers for re-evaluation after model or prompt changes.

**Fix:** Add a CI job that runs evals on PR/push. Document when to re-run error analysis (after model switches, prompt rewrites, or production incidents).

---

## Priority-Ordered Action Plan

| Priority | Action | Skill | Impact |
|----------|--------|-------|--------|
| 1 | Run error analysis on model outputs | `error-analysis` (or `generate-synthetic-data` first if no traces) | Foundation — all other improvements depend on understanding actual failure modes |
| 2 | Wire Code Generation tests into config with deterministic assertions | Manual + `write-judge-prompt` for subjective CG criteria | Closes 0% coverage gap on an entire intent category |
| 3 | Inject per-sample ground truth from `sample-examples.md` into rubric assertions | Manual | Immediate improvement to judge accuracy with no infrastructure changes |
| 4 | Write a domain-specific judge prompt | `write-judge-prompt` | Replaces generic prompt with code-domain calibrated judging |
| 5 | Collect human labels and validate the judge | `validate-evaluator` | Required to trust any automated eval results |
| 6 | Build a review interface for human annotation | `build-review-interface` | Enables efficient human review at scale |
| 7 | Generate synthetic data to cover untested criteria | `generate-synthetic-data` | Increases coverage from 48.7% to 100% |
| 8 | Add CI/CD for automated eval runs | Manual | Prevents eval staleness |
