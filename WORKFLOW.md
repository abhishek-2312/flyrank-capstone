# AI Workflow Comparison & Analysis

## Executive Summary
This document compares two development approaches for building a User Settings Form: a single unconstrained vague prompt vs. a highly specified, constraint-driven prompt loop.

---

## Concrete Branch Diffs

### 1. Correctness & State Handling
- **`feature/settings-vague`**: Used basic HTML5 input validation and unstructured state blocks. It failed to handle edge cases like invalid email formatting cleanly, leading to uncaught form submission resets.
- **`feature/settings-spec`**: Implemented strict schema validation with React Hook Form and Zod. Form submission is completely gated until schema criteria are fully satisfied.

### 2. Accessibility (a11y)
- **`feature/settings-vague`**: Missing explicit label associations (`htmlFor`). Error messages lacked `role="alert"` attributes, rendering form validation states inaccessible to screen readers.
- **`feature/settings-spec`**: Full ARIA compliance with explicit `aria-invalid` bindings and clear semantic error feedback.

### 3. Edge Cases & Review Effort
- The vague implementation omitted loading indicators during form submission, allowing potential double-submission spam. The spec-driven output dynamically managed submission states to disable inputs appropriately.
- **Review Effort**: The vague output required extensive manual refactoring to reach production standards, whereas the spec-driven branch required minimal styling adjustments.

---

## AI Mistake Caught During Review
During review of the code generated in `feature/settings-spec`, the AI initially forgot to append the `'use client'` directive at the top of the component file, which caused a Next.js Server Component boundary error upon rendering. I manually identified and resolved this issue.