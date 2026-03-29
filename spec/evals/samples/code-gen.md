S-CG-1: 
```python
model = "codestral-latest"
prompt = "def fibonacci(n: int):"
suffix = "n = int(input('Enter a number: '))\nprint(fibonacci(n))"
```

---

S-CG-2:
```python
model = "codestral-latest"
prompt = "def format_name(first, last, title=None):"
suffix = "print(format_name(\"Ada\", \"Lovelace\"))\nprint(format_name(\"Ada\", \"Lovelace\", \"Countess\"))"
```

---

S-CG-3:
```javascript
model = "codestral-latest"
prompt = "const pluralize = (count, word) => {"
suffix = "};\n\nconsole.log(pluralize(1, \"cat\"));   // \"1 cat\"\nconsole.log(pluralize(3, \"cat\"));   // \"3 cats\"\nconsole.log(pluralize(0, \"cat\"));   // \"0 cats\""
```
