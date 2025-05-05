import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const calculateHash = (answer, currentDir) => {
    const filePath = answer.slice(5).trim();
    const absolutePath = path.resolve(currentDir, filePath);

    const hash = crypto.createHash('sha256');
    hash.update(absolutePath);
    const result = hash.digest('hex');
    console.log(`Hash of ${filePath}: ${result}`);

}