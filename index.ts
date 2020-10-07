import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as colors from './color-console';

const environment =
  process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
const filePath = resolve(process.cwd(), `${environment}.env`);

try {
  const file: Buffer = readFileSync(filePath);
  const fileData: string = Buffer.from(file).toString('utf8');
  const envRegEx = /([^=]+)=(.+)/gim;

  const arrMatches: Array<string> = fileData.match(envRegEx);
  const mapMatches: Map<string, string> = new Map();

  arrMatches.forEach(() => {
    const res: RegExpExecArray = envRegEx.exec(fileData);
    mapMatches.set(res[1].trim(), res[2]);
  });

  for (const [key, value] of mapMatches.entries()) {
    process.env[key] = value;
  }

  console.info(
    colors.fgGreen,
    `SETDOTENV: CURRENT ENVIRONMENT ${process.env.NODE_ENV}`,
  );
  console.info(colors.fgGreen, `SETDOTENV: CURRENT ENV FILE ${filePath}`);
  console.info('\n');
} catch (error) {
  console.error(
    colors.fgYellow,
    `SETDOTENV WARNING: ENV FILE ${filePath} NOT FOUND OR INCLUDES WRONG FORMAT`,
  );
}
