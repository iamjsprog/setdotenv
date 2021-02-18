# Setdotenv

Simple way to load `.env` file to process.env object

---

Just use next string in your main file (the file that is loaded first in your project) and there we go!

For typescript

```typescript
export * from 'setdotenv';
import express from 'express';
```

For javascript

```javascript
require('setdotenv');
const express = require('express');
```

## How it works

```typescript
process.env.NODE_ENV = 'production';
export * from 'setdotenv';

// it reads from production.env file
const myEnv = process.env.MY_ENV;
```

or

```typescript
export * from 'setdotenv';

// it reads from development.env file by default
const myEnv = process.env.MY_ENV;
```

## Note

It doesn't read just `.env` file. Only `NODE_ENV.env` file.

## .env file format

```bash
MY_ENV=show must go on
SECRET=my secret key
EXAMPLE=example string
# We can use comments here
NUMBER=123
__TEST=test
@SOME=data
SYMBOLS=@!@!@#$$#%;/23$%$#%%^&
```

and, then

```typescript
process.env.MY_ENV === 'show must go on'; // true
process.env.NUMBER === '123'; // true
process.env.__TEST === 'test'; // true
process.env.SOME === 'data'; // true
process.env.SYMBOLS === '@!@!@#$$#%;/23$%$#%%^&'; // true
```
