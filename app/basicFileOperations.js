import fs from "fs";
import path from "path";

export const readAndShowFile = (answer, currenDir) => {

    const filePath = answer.slice(4).trim();
    const absolutePath = path.resolve(currenDir, filePath);

    const stream = fs.createReadStream(absolutePath, {encoding: "utf-8"});

    stream.on("data", chunk => {
        console.log(chunk)
    })

    stream.on("error", () => {
        console.log("Error: Reading file is failed");
    })
}

export const createFile = (answer, currentDir) => {
    const filePath = answer.slice(4).trim();
    const absolutePath = path.resolve(currentDir, filePath);

    fs.writeFile(absolutePath, '', (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return;
        }
        console.log(`File ${filePath} created successfully.`);
    })
}