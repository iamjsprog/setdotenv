import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as colors from './color-console';
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

  console.info(
    colors.fgGreen,
    `SETDOTENV: CURRENT ENVIRONMENT ${process.env.NODE_ENV}`,
  );
  console.info(`SETDOTENV: CURRENT ENV FILE ${filePath}`);
  console.log(colors.fgWhite, '\n');
} catch (error) {
  console.error(
    colors.fgYellow,
    `SETDOTENV WARNING: ENV FILE ${filePath} NOT FOUND OR INCLUDES WRONG FORMAT`,
  );
  console.log(colors.fgWhite, '\n');
}
