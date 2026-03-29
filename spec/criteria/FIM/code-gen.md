All criteria below apply to the generated code.

CG-1: Must be syntactically valid when inserted between prefix and suffix. The combined result must parse.

CG-2: Must be semantically consistent with the surrounding code, meaning correct types, existing variable names, matching return types expected by the suffix.

CG-3: Must match the style conventions visible in the prompt and the suffix: indentation (tabs vs spaces), naming convention (camelCase vs snake_case), quote style (single vs double).

CG-4: Must not introduce imports, dependencies, or helper functions not already present or implied by the prefix.

CG-5: Must output raw code only, no markdown formatting, prose.

CG-6: Comments should not be inserted if there are no comments in the surrounding code. Follow the existing pattern.

CG-7: Respect the scope boundary, meaning that if prefix defines a function, the completion should not close the function and open a new one.
