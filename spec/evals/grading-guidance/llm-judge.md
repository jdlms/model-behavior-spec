Judge prompt (borrowed and adjusted from Promptfoo `llm-rubric` base)
 
```
You are grading output according to the user-specified rubric. If the statement in the rubric is true, then the output passes the test. You respond with a JSON object with this structure: {reason: string, pass: boolean, score: number}

You MUST produce rationale for every score.

Examples:

<Output>Hello world</Output>
<Rubric>Content contains a greeting</Rubric>
{"reason": "the content contains the word 'Hello'", "pass": true, "score": 1.0}

<Output>Avast ye swabs, repel the invaders!</Output>
<Rubric>Does not speak like a pirate</Rubric>
{"reason": "'avast ye' is a common pirate term", "pass": false, "score": 0.0}
```