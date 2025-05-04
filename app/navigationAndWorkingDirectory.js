import fs from 'fs';
import path from 'path';

export const moveToUpperDir = (currentDir) => {
    const currentPath = path.dirname(currentDir);
    process.chdir(currentPath);
    return path.dirname(currentDir);
}

export const moveToOtherDir = (answer, currentDir) => {
    let dirPath = answer.slice(3);
    try {
        const targetPath = path.resolve(currentDir, dirPath);
        process.chdir(targetPath);
        return targetPath;
    } catch (error) {
        console.log(`Invalid input: ${error.message}`);
    }
}

export const showDirList = (currentDir) => {
    const entries = fs.readdirSync(currentDir);

    const tableData = entries.map((name) => {
        const fullPath = path.join(currentDir, name);
        const stats = fs.statSync(fullPath);
        return {
            Name: name,
            Type: stats.isDirectory() ? "Directory" : "File",
            Size: stats.isFile() ? stats.size + " B" : ""
        };
    });

    tableData.sort((a, b) => {
        if (a.Type !== b.Type) {
            return a.Type === "Directory" ? -1 : 1;
        }
        return a.Name.localeCompare(b.Name);

    })

    console.table(tableData);
}