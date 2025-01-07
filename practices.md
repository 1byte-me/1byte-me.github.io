---
layout: default
title: Clean Code Practices
---

# Clean Code Practices

Here are practical tips and techniques for writing cleaner code in your daily work.

## Code Organization

### 1. File Structure
```
src/
  ├── components/      # Reusable UI components
  ├── services/        # Business logic and API calls
  ├── utils/          # Helper functions and utilities
  ├── constants/      # Configuration and constants
  └── tests/          # Test files
```

### 2. Consistent Formatting
Use an automated formatter (like Prettier, Black, or gofmt) and stick to it:

```javascript
// Bad - inconsistent formatting
function calculateTotal(items){
    let total=0;
    for(let i=0;i<items.length;i++){
        total+=items[i].price;
    }
    return total;
}

// Good - consistent formatting
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}
```

## Function Design

### 1. Keep Functions Small
Aim for functions that do one thing and do it well:

```python
# Bad - function doing too much
def process_user_data(user_data):
    # Validate data
    if not user_data.get('email'):
        raise ValueError('Email required')
    if not user_data.get('name'):
        raise ValueError('Name required')
    
    # Format data
    email = user_data['email'].lower().strip()
    name = user_data['name'].title()
    
    # Save to database
    user = User(email=email, name=name)
    db.session.add(user)
    db.session.commit()
    
    # Send welcome email
    send_email(
        to=email,
        subject='Welcome!',
        body=f'Welcome {name}!'
    )

# Good - separated concerns
def validate_user_data(user_data):
    if not user_data.get('email'):
        raise ValueError('Email required')
    if not user_data.get('name'):
        raise ValueError('Name required')

def format_user_data(user_data):
    return {
        'email': user_data['email'].lower().strip(),
        'name': user_data['name'].title()
    }

def save_user(user_data):
    user = User(**user_data)
    db.session.add(user)
    db.session.commit()
    return user

def send_welcome_email(user):
    send_email(
        to=user.email,
        subject='Welcome!',
        body=f'Welcome {user.name}!'
    )

def process_user_data(user_data):
    validate_user_data(user_data)
    formatted_data = format_user_data(user_data)
    user = save_user(formatted_data)
    send_welcome_email(user)
```

### 2. Use Descriptive Error Messages

```java
// Bad
throw new Exception("Invalid input");

// Good
throw new ValidationException("Username must be between 3 and 20 characters and contain only letters and numbers");
```

## Variable Naming

### 1. Use Intention-Revealing Names

```python
# Bad
d = 7  # elapsed time in days
lst = ['apple', 'banana']  # list of fruits
val = user.age > 18  # check if user is adult

# Good
days_elapsed = 7
fruits = ['apple', 'banana']
is_adult = user.age > 18
```

### 2. Use Consistent Terminology

```javascript
// Bad - mixing terms
getUserInfo()
fetchUserData()
retrieveUserRecord()

// Good - consistent terminology
fetchUser()
fetchProduct()
fetchOrder()
```

## Testing Practices

### 1. Follow AAA Pattern
Arrange, Act, Assert:

```python
def test_user_registration():
    # Arrange
    user_data = {
        'email': 'test@example.com',
        'password': 'secure123'
    }
    
    # Act
    response = client.post('/register', json=user_data)
    
    # Assert
    assert response.status_code == 201
    assert response.json['message'] == 'Registration successful'
```

### 2. Test Edge Cases

```javascript
describe('divide', () => {
    it('handles normal division', () => {
        expect(divide(10, 2)).toBe(5);
    });
    
    it('handles zero dividend', () => {
        expect(divide(0, 5)).toBe(0);
    });
    
    it('handles division by zero', () => {
        expect(() => divide(10, 0)).toThrow('Division by zero');
    });
    
    it('handles decimal results', () => {
        expect(divide(5, 2)).toBe(2.5);
    });
});
```

Remember: These practices should be adapted to your team's needs and project requirements. The goal is to make code more maintainable and easier to understand for everyone on the team. 