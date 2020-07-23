# Setdotenv

Simple way to load `.env` file to process.env object

---

Just use next string in your main file (the file that is loaded first in your project) and there we go!

```typescript
export * from 'setdotenv';
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
NUMBER=123
```

and, then

```typescript
process.env.MY_ENV === 'show must go on'; // true
process.env.NUMBER === '123'; // true
```
