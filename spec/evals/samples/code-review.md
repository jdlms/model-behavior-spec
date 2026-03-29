CR-S1: 
I have the following Python code that calculates the factorial of a number. Could you review it and suggest areas of improvement or optimization?

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        result = 1
        for i in range(1, n + 1):
            result *= i
        return result
```

---

CR-S2: 
"I'm concerned about how this handles failure. Can you review the error handling and anything else that stands out?"
```python
import requests

API_URL = "https://api.example.com/v1"
TIMEOUT = 30

def get_user_profile(user_id):
    try:
        response = requests.get(
            f"{API_URL}/users/{user_id}",
            headers={"Authorization": "Bearer sk-1234-abcd-5678"},
            timeout=TIMEOUT
        )
        response.raise_for_status()
        return response.json()
    except Exception:
        return None
```

---

CR-S3: 
"Something feels off about this function. Can you take a look?"
```typescript
function isEven(numbers: number[]): boolean[] {
  return numbers.map(n => n % 2 !== 0);
}
```
