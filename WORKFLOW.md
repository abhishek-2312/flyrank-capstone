# Week 2 Workflow Comparison & Reflection

## Overview
For this drill, I built a validated User Settings form featuring display name, email, and notification frequency inputs using React, Next.js, Zod, and Tailwind CSS. I completed the task across two iterations to evaluate the impact of prompt engineering and structured specifications.

## Round 1 vs. Round 2 Comparison

### Round 1: Vague Prompting
In Round 1, I relied on a single brief prompt requesting a settings form. 
- **Correctness & Edge Cases**: The output provided basic markup without strict schema validation or edge-case handling for improper email formats.
- **Accessibility**: Standard input elements lacked explicit label associations (`htmlFor` attributes) and screen-reader error messages.
- **Review Effort**: High manual debugging was required to connect styles and ensure proper state management.

### Round 2: Precise Prompting with Specifications
In Round 2, I provided exact file references (`lib/schemas/`, `SettingsForm.tsx`), explicit validation logic with Zod, and UI styling constraints using Tailwind CSS v4.
- **Correctness & Edge Cases**: The form cleanly validates field inputs using Zod, handling empty states, invalid email formats, and real-time field resets.
- **Accessibility**: Labels correctly bind to inputs with unique identifiers, and validation errors are rendered visually and semantically.
- **Review Effort**: Minimal code corrections were needed, drastically reducing integration friction.

## Key AI Mistake Caught
During the setup, the initial PostCSS configuration caused a module import error (`Cannot find module '@tailwindcss/postcss'`) due to a mismatch between Tailwind CSS v3 directives and v4 PostCSS plugins. I caught this error when Next.js failed to evaluate the global stylesheet, subsequently updating `postcss.config.mjs` and dependencies to align with Tailwind v4 standards.

## Summary
Directing AI with structured constraints and verified file layouts produces significantly cleaner, production-ready code compared to accepting single-pass vague outputs.