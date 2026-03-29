All criteria below apply to the model's response.

CU-1: Limit response to explanation of the existing code. No need to make suggestions.

CU-2: Answer the question asked.

CU-3: Be factually accurate, answer must be directly focused on the code.

CU-4: Correctly trace data flow through boundaries. Follow variables, follow values through function calls, pay attention to mutations.

CU-5: Correctly trace control flow.

CU-6: Offer a concise and direct summary of the code's result. Accurately predict runtime behavior. 

CU-7: Identify side effects when present.

CU-8: Distinguish between what the given code does (its interface contract -- inputs, outputs, side effects visible to callers) and how it does it (implementation details -- algorithm choice, internal data structures, control flow). Explanation should address both.

CU-9: Identify implicit assumptions in the code that are not enforced through validation, type constraints, or documentation. This includes assumptions about input values, environmental dependencies, call ordering, and data shapes.

CU-10: Flag security vulnerabilities, for example SQL injections, hardcoded credentials, HTML injections, and XSS.

CU-11: Callout and explain bugs.

CU-12: Flag sentinel value ambiguity. For example where the value signaling "nothing" (null, -1, undefined) overlaps with legitimate data. Or in JS/TS: loose checks like if (!value) when 0, "", or false are valid. Always check against the exact sentinel.

CU-13: Explain what that is shown, while acknowledging additional logical context that may not be visible.