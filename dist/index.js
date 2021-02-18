"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
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
    console.info(`SETDOTENV: current environment ${process.env.NODE_ENV}`);
    console.info(`SETDOTENV: current env file ${filePath}. Was uploaded ${strings.length} variables`);
}
catch (error) {
    console.error(`SETDOTENV WARNING: env file ${filePath} not found or includes wrong format`);
}
//# sourceMappingURL=index.js.map