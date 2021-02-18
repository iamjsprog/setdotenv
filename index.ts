import { readFileSync } from 'fs';
import { resolve } from 'path';
import createBuffer from './create-buffer';

const environment =
  process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
const filePath = resolve(process.cwd(), `${environment}.env`);

try {
  const file: Buffer = readFileSync(filePath);
  const buffer = createBuffer();

  for (const bit of file) {
    buffer.addBit(bit);
  }

  const bytes = buffer.end();
  const strings = bytes.map((buf) => buf.toString('utf-8'));
  strings.forEach((str) => {
    const index = str.indexOf('=');
    const key = str.substr(0, index);
    const value = str.substr(index + 1);

    process.env[key] = value;
  });

  console.info(`SETDOTENV: current environment ${process.env.NODE_ENV}`);
  console.info(
    `SETDOTENV: current env file ${filePath}. Was uploaded ${strings.length} variables`,
  );
} catch (error) {
  console.error(
    `SETDOTENV: env file ${filePath} not found or includes wrong format`,
  );
}
