import fs from 'fs';
import path from 'path';

export const readFileData = (_filePath: string): Promise<string> => {
    const filePath = path.join(__dirname, _filePath);
    return new Promise((resolve, reject) =>
        fs.readFile(filePath, 'utf8', (metaError, data) => {
            if (metaError) reject(metaError);
            resolve(data);
        })
    );
};
