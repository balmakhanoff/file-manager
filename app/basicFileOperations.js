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

export const createFolder = (answer, currentDir) => {
    const filePath = answer.slice(6).trim();
    const absolutePath = path.resolve(currentDir, filePath);

    fs.mkdir(absolutePath, {recursive: true}, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return;
        }
        console.log(`Directory ${filePath} created successfully.`);
    });
}

export const renameFileOrFolder = (answer, currentDir, otherDir) => {
    const filePath = answer.slice(3).trim();
    const [firstPart, secondPart] = filePath.split(' ');

    const sourcePath = path.isAbsolute(filePath) ? filePath : path.resolve(currentDir, firstPart);
    const destinationPath = path.isAbsolute(secondPart) ? secondPart : path.resolve(currentDir, secondPart);

    fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error('Error renaming file or directory:', err);
            return;
        } else {
            console.log(`File or directory ${sourcePath} renamed to ${destinationPath} successfully.`);
        }
    })
}

export const copyFile = (answer, currentDir) => {
    const filePath = answer.slice(3).trim();
    const [firstPart, secondPart] = filePath.split(" ");

    if (!firstPart || !secondPart) {
        console.error("Error: Invalid input. Usage: cp <source> <destination>");
        return;
    }

    const sourcePath = path.isAbsolute(firstPart) ? firstPart : path.resolve(currentDir, firstPart);
    let destinationPath = path.isAbsolute(secondPart) ? secondPart : path.resolve(currentDir, secondPart);

    if (fs.existsSync(destinationPath) && fs.lstatSync(destinationPath).isDirectory()) {
        const fileName = path.basename(destinationPath);
        destinationPath = path.join(destinationPath, fileName);
    }

    const readableStream = fs.createReadStream(sourcePath);
    const writableStream = fs.createWriteStream(destinationPath);

    readableStream.pipe(writableStream);

    readableStream.on("error", (err) => {
        console.error("Error reading file:", err.message);
    });

    writableStream.on("error", (err) => {
        console.error("Error writing file:", err.message);
    });

    writableStream.on("finish", () => {
        console.log(`File ${sourcePath} copied to ${destinationPath} successfully.`);
    });
};