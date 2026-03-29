Sample Examples of good responses

Format:
```
Sample - User intent type - number
- Key topic - applicable criteria
- Key topic - applicable criteria
- Key topic - applicable criteria
```

### Code review:
CR-S1:
- Correct code - The response should provide useful feedback without inventing problems. - CR-1
- Standard library - `math.factorial` exists in the standard library and this example reimplements it. A good response should mention this without insisting on it. - CR-2
- Input validation - Negative numbers and non-integers are no handled. `factorial(-5)` silently returns `1`. - CR-8, CR-6

CR-S2:
- Error handling - `except Exception` is swallowing all failure types into a silent `None`. - CR-9, CR-10, CR-19
- Hardcoded token - Visible tokens and keys in code is not secure, env. vars must be properly handled. - CR-12, CR-17, CR-11
- Invalid JSON - There is no check on the form of the returned JSON. Invalid JSON could be returned after a 200 and then buried by the `except Exception`. - CR-8

CR-S3: 
- Vague user prompt - "something feels off" requires identifying the specific defect, not speculating beyond what's shown. - CR-1
- Logic/naming mismatch - `isEven` returns `true` for odd numbers. The name contradicts the implementation. - CR-6, CR-7, CR-18


### Code understanding:
CU-S1:
- Explanation only - A response that offers refactored code or unsolicited suggestions fails CU-1
- Direct question - The user asks specific questions. The response must answer all three. - CU-2
- Accurate tracing - The model should correctly predict the output: `[(1, 'banana'), (2, 'cherry')]`. `date` is excluded by the filter, `apple` has exactly  5 characters and passes - CU-4, CU-5, CU-6

CU-S2: 
- Explanation only - No unsolicited suggestions, but the falsy filtering is worth mentioning as a potential gotcha in the explanation - CU-1
- Three specific questions - User asks about `filter`, Boolean values in JS, and `.at`. All three must be addressed - CU-2
- Truthiness - Response must correctly identify which values `Boolean` filters out: `0`, `null`, `""`, `undefined` are falsy. `"peach"` and `"pear"` survive. `getFirst` returns `"peach"` - CU-4, CU-6
- Sentinel ambiguity - `0` is legitimate data filtered out by `Boolean`. The response should note that this pattern silently drops valid falsy values - CU-12

CU-S3: 
- Method chain - The response must explain `strip`, `split`, and `join` individually, in order - CU-2, CU-5
- Correct output - `strip` removes leading/trailing whitespace, `split` with no args splits on any whitespace run, `join` reassembles with single spaces. Output is `"hello world"` - CU-4, CU-6
- Language mismatch - The code block is labeled `js` but the code is Python. The model should note this rather than silently ignore it - CU-3

CU-S4: 
- Data flow - `getOrCreate` calls `cacheGet`, which checks timestamp against TTL. On miss or expiry, `cacheGet` deletes the stale entry and returns `null`, then `getOrCreate` calls `factory` and `cacheSet` to repopulate - CU-4, CU-5
- Sentinel bug - `if (!value)` in `getOrCreate` treats `0`, `""`, and `false` as cache misses. A valid cached falsy value triggers a redundant call and overwrite. A ` if (value === null)` check would solve this. - CU-11, CU-12
- Response should separate the cache's contract (store/retrieve with TTL expiry) from implementation (Map, timestamp math, delete-on-read). - CU-8
- Response should note several, implicit assumptions in the code, such as `factory` being synchronous and `TTL` being in seconds, while Date.now() returns milliseconds. - CU-9 
- Side effect on read - `cacheGet` deletes expired entries. A read operation mutates the store. Response should note this. - CU-7


### Code gen:
S-CG-1:
- Insertion must be syntactically valid. - CG-1
- Insertion must be semantically consistent with surrounding code. - CG-2
- Insertion must match style conventions visible in the prompt and the suffix - CG-3
- Suffix calls `fibonacci(n)` and prints result, so the completion must return a value, not print - CG-2
- Must not close the function and open a new one - CG-7
- Raw code only, no markdown or prose - CG-5

S-CG-2: 
- Insertion must be syntactically valid. - CG-1
- Insertion must be semantically consistent with surrounding code. - CG-2
- Insertion must match style conventions visible in the prompt and the suffix - CG-3
- Suffix tests both with and without `title`. Completion must handle the `None` default - CG-2
- Simple conditional return. Must not introduce imports or helpers - CG-4
- Raw code only, no markdown or prose - CG-5

S-CG-3: 
- Insertion must be syntactically valid. - CG-1
- Insertion must be semantically consistent with surrounding code. - CG-2
- Insertion must match style conventions visible in the prompt and the suffix - CG-3
- Suffix expects specific output format: `"1 cat"`, `"3 cats"`, `"0 cats"`. Completion must match - CG-2
- Must append `"s"` for count !== 1. Edge case: `0` gets plural - CG-1
- Completion fills a function body before the closing `};` in the suffix. Must not close the function itself - CG-7
- Raw code only, no markdown or prose - CG-5