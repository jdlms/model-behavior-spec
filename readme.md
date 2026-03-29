
## Assignment
```
A brief model behavior spec for three user intents related to code:
- Understanding
- Review
- Generation 
```

## Approach

- Criteria holds distinct sets of requirements that relevant model responses must follow 
- Evals holds a small number of code samples for each user intent, and grading guidance for an llm judge. A rubric outlining the format and scale, a prompt, and examples suggesting which criteria are relevant for each code sample, as well as what a good response would contain.
- Style guide is an attempt to shape the model's voice and tone, the format it responds in, the persona it should adopt.
- I added a simple, naive Promptfoo setup where I could directly test criteria and style guide against model responses. This was helpful for iterating and as a result I discovered many of my initial criteria were poorly worded, vague, or lacked clear signal.

## Todos & room for improvement:

- A taxonomy of the many common ways that code fails, or that models can fail when discussing code in chat would be very helpful to create and have.
- The style guide is written to my own preferences and tastes. Ideally it would be shaped and directed by a product vision and data.
- Robust pass/fail examples for every criteria should be added
- Ideally there would be more code samples, more criteria
- There are other user intents, such as Agentic where the user expects the model to actively use tools. This requires it's own category of criteria, evals, and style guide. 

## File tree
```
.
├── Homework-Prompt.pdf
├── promptfoo
│   ├── build-prompt.js
│   ├── package-lock.json
│   ├── package.json
│   ├── promptfooconfig.yaml
│   └── prompts
│       ├── chat.js
│       └── chat.json
├── readme.md
└── spec
    ├── criteria
    │   ├── chat
    │   │   ├── code-review.md
    │   │   └── code-understanding.md
    │   └── FIM
    │       └── code-gen.md
    ├── evals
    │   ├── grading-guidance
    │   │   ├── criteria-rubric.md
    │   │   ├── llm-judge.md
    │   │   └── sample-examples.md
    │   └── samples
    │       ├── code-gen.md
    │       ├── code-review.md
    │       └── code-understanding.md
    └── style-guide
        └── code.md
```
