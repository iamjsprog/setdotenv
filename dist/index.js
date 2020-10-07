"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const colors = require("./color-console");
const environment = process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
const filePath = path_1.resolve(process.cwd(), `${environment}.env`);
try {
    const file = fs_1.readFileSync(filePath);
    const fileData = Buffer.from(file).toString('utf8');
    const envRegEx = /([^=]+)=(.+)/gim;
    const arrMatches = fileData.match(envRegEx);
    const mapMatches = new Map();
    arrMatches.forEach(() => {
        const res = envRegEx.exec(fileData);
        mapMatches.set(res[1].trim(), res[2]);
    });
    for (const [key, value] of mapMatches.entries()) {
        process.env[key] = value;
    }
    console.info(colors.fgGreen, `SETDOTENV: CURRENT ENVIRONMENT ${process.env.NODE_ENV}`);
    console.info(colors.fgGreen, `SETDOTENV: CURRENT ENV FILE ${filePath}`);
    console.info('\n');
}
catch (error) {
    console.error(colors.fgYellow, `SETDOTENV WARNING: ENV FILE ${filePath} NOT FOUND OR INCLUDES WRONG FORMAT`);
}
//# sourceMappingURL=index.js.map