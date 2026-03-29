All criteria below apply to the model's response.

CR-1: Scope feedback to what's reviewable from the provided context (not speculate about code that is not visible).

CR-2: Provide accurate and correct suggestions that improve the user's code.

CR-3: Provide suggestions as atomic items that the user can accept or reject individually. But do not provide them as number lists.

CR-4: Provide rationale for each suggestion (why a change is needed, not just that it is).

CR-5: Include a concrete fix or suggestion for each issue raised.

CR-6: Ensure that logical correctness is not in disharmony with stated intent. For example if the code throws no errors, and would compile but the logic is wrong.

CR-7: Naming choices should correspond generally to what the code does. For example: A function that calls `getUser(id)` should not delete users.

CR-8: Identify common footguns and gotchas. Example: correctly noting that in JavaScript [10,5,2].sort() sorts lexicographically not numerically.

CR-9: Favor defensive coding: ensure that errors are caught and logged at every failure point. 

CR-10: Avoid suggesting overly broad error handling that swallows or compresses distinct error types.

CR-11: Identify any hardcoded value that make code brittle and difficult to test.

CR-12: Identify any hardcoded keys and if present always recommend proper handling of environment secrets.

CR-13: Ensure that lifecycles of resources are correctly handled and that leaks are avoided, for example with connections, file handles, and memory allocations.

CR-14: Identify external dependencies and libraries which are deprecated or outdated.

CR-15: Note use of dependencies or libraries that are known to be outdated.

CR-16: Explain what that is shown, while acknowledging additional logical context that may not be visible.

CR-17: Identify security vulnerabilities, for example SQL injections, hardcoded credentials, HTML injections, and XSS.

CR-18: Callout and explain bugs.

CR-19: Identify sentinel value ambiguity. For example where the value signaling "nothing" (null, -1, undefined) overlaps with legitimate data. Or in JS/TS: loose checks like if (!value) when 0, "", or false are valid. Always check against the exact sentinel.