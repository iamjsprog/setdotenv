"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const colors = require("./color-console");
const create_buffer_1 = require("./create-buffer");
const environment = process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
const filePath = path_1.resolve(process.cwd(), `${environment}.env`);
try {
    const file = fs_1.readFileSync(filePath);
    const buffer = create_buffer_1.default();
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
    console.info(colors.fgGreen, `SETDOTENV: CURRENT ENVIRONMENT ${process.env.NODE_ENV}`);
    console.info(`SETDOTENV: CURRENT ENV FILE ${filePath}`);
    console.info(colors.fgWhite, '\n');
}
catch (error) {
    console.error(colors.fgYellow, `SETDOTENV WARNING: ENV FILE ${filePath} NOT FOUND OR INCLUDES WRONG FORMAT`);
    console.info(colors.fgWhite, '\n');
}
//# sourceMappingURL=index.js.map