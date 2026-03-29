CU-S1: 
I have the following Python code snippet and would like an explanation of how it works, particularly the use of list comprehensions and the enumerate function.

```python
words = ["apple", "banana", "cherry", "date"]
indexed_words = [(index, word) for index, word in enumerate(words) if len(word) > 4]
print(indexed_words)
```

Please explain:
What does the enumerate function do?
How does the list comprehension work in this context?
What is the purpose of the if len(word) > 4 condition?

---

CU-S2:
Could you explain to me what filter does, what is considered a boolean value in JavaScript and what the .at is doing? I'm not familiar with it.

```js
const items = [0, "peach", null, "pear", "", undefined];
const getFirst = (items) => items.filter(Boolean).at(0);
```

---

CU-S3:
"What does each chained method do in the return statement? What would the output be for the input?"
```python
def clean(text):
    return " ".join(text.strip().split())

print(clean("  hello   world  "))
```

---

CU-S4: 
Can you walk me through how this cache works? What happens when getOrCreate is called and the key is expired?

```ts
type CacheEntry = { value: any; ts: number };

const store: Map<string, CacheEntry> = new Map();
const DEFAULT_TTL = 300;

function cacheGet(key: string, ttl: number = DEFAULT_TTL): any {
  const entry = store.get(key);
  if (entry && Date.now() - entry.ts < ttl * 1000) {
    return entry.value;
  }
  store.delete(key);
  return null;
}

function cacheSet(key: string, value: any): void {
  store.set(key, { value, ts: Date.now() });
}

function getOrCreate(key: string, factory: () => any, ttl: number = DEFAULT_TTL): any {
  const value = cacheGet(key, ttl);
  if (!value) {
    const newValue = factory();
    cacheSet(key, newValue);
    return newValue;
  }
  return value;
}
```