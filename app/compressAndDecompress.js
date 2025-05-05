import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export const compressFile = (answer, currentDir) => {
    const filePath = answer.slice(9).trim().split(" ");
    const [sourceFile, destinationFile] = filePath;

    if (!sourceFile || !destinationFile) {
        console.error('Provide both paths: compress source destination');
        return;
    }

    const sourcePath = path.isAbsolute(sourceFile)
        ? sourceFile
        : path.resolve(currentDir, sourceFile);
    const destinationPath = path.isAbsolute(destinationFile)
        ? destinationFile
        : path.resolve(currentDir, destinationFile);

    if (!fs.existsSync(sourcePath)) {
        console.error('Source file not found:', sourcePath);
        return;
    }

    const input = fs.createReadStream(sourcePath);
    const output = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();

    input.on('error', err => console.error('Error of reading:', err.message));
    brotli.on('error', err => console.error('Error of compressing::', err.message));
    output.on('error', err => console.error('Error of writing:', err.message));

    input.pipe(brotli).pipe(output).on('finish', () => {
        console.log('File succesfully completed:', destinationPath);
    });
};

export const decompressFile = (answer, currentDir) => {
    const filePath = answer.slice(11).trim().split(" ");
    const [sourceFile, destinationFile] = filePath;

    if (!sourceFile || !destinationFile) {
        console.error('Provide both paths: compress source destination');
        return;
    }

    const sourcePath = path.isAbsolute(sourceFile)
        ? sourceFile
        : path.resolve(currentDir, sourceFile);
    const destinationPath = path.isAbsolute(destinationFile)
        ? destinationFile
        : path.resolve(currentDir, destinationFile);

    if (!fs.existsSync(sourcePath)) {
        console.error('Source file not found:', sourcePath);
        return;
    }

    const input = fs.createReadStream(sourcePath);
    const output = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();

    input.on('error', err => console.error('Error of reading:', err.message));
    brotli.on('error', err => console.error('Error of unpacking:', err.message));
    output.on('error', err => console.error('Error of writing:', err.message));

    input.pipe(brotli).pipe(output).on('finish', () => {
        console.log('Unpacking completed:', destinationPath);
    });
};