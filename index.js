import readline from 'readline';
import {parsedCliArgs} from './app/cliArguments.js';
import os from 'os';
import {moveToOtherDir, showDirList, moveToUpperDir} from "./app/navigationAndWorkingDirectory.js";
import {
    copyFile,
    createFile,
    createFolder,
    moveFile,
    readAndShowFile,
    renameFileOrFolder
} from "./app/basicFileOperations.js";
import {
    getCpuArchitecture,
    getCpuINFO,
    getEOL,
    getHomeDir,
    getOsUserName
} from "./app/operationSystemInfo.js";
import {calculateHash} from "./app/hashCalculation.js";

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const username = parsedCliArgs.username;
const homeDir = os.homedir();

let currentDir = homeDir;
process.chdir(currentDir);
let firstLogin = true;

function askQuestion(username) {
    if (!username) {
        console.log("Invalid input: arg -- username=name missing.");
        reader.close();
        return;
    }

    if (firstLogin) {
        console.log(`Welcome to the File Manager, ${username}!`);
        console.log(`You are currently in ${currentDir}`)
        firstLogin = false;
    }

    reader.question(`Enter command: `, (answer) => {
        if (answer.toLowerCase() === ".exit") {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            reader.close();
            return;
        }

        // navigation
        if (answer.toLowerCase() === "up") {
            currentDir = moveToUpperDir(currentDir);
        }
        else if (answer.toLowerCase().startsWith("cd ")) {
            currentDir = moveToOtherDir(answer, currentDir);
        }
        else if (answer.toLowerCase() === "ls") {
            showDirList(currentDir)
        } // basic file operations
        else if (answer.toLowerCase().startsWith("cat ")) {
            readAndShowFile(answer, currentDir)
        }
        else if (answer.toLowerCase().startsWith("add ")) {
            createFile(answer, currentDir)
        }
        else if (answer.toLowerCase().startsWith("mkdir ")) {
            createFolder(answer, currentDir);
        }
        else if (answer.toLowerCase().startsWith("rn ")) {
            renameFileOrFolder(answer, currentDir);
        }
        else if (answer.toLowerCase().startsWith("cp ")) {
            copyFile(answer, currentDir);
        }
        else if (answer.toLowerCase().startsWith("mv ")) {
            moveFile(answer, currentDir);
        }
        else if (answer.toLowerCase().startsWith("rm ")) {
            deleteFile(answer, currentDir);
        } // operating system info
        else if (answer.trim() === "os --EOL") {
            getEOL();
        }
        else if (answer.trim() === "os --cpus") {
            getCpuINFO();
        }
        else if (answer.trim() === "os --homedir") {
            getHomeDir();
        }
        else if (answer.trim() === "os --username") {
            getOsUserName();
        }
        else if (answer.trim() === "os --architecture") {
            getCpuArchitecture();
        } // hash calculation
        else if (answer.toLowerCase().startsWith("hash ")) {
            calculateHash(answer, currentDir);
        }
        else {
            console.log("Invalid input");
        }

        console.log(`You are currently in ${currentDir}`);

        askQuestion(username);
    });
}

reader.on("SIGINT", () => {
    console.log(`\nThank you for using File Manager, ${parsedCliArgs.username}, goodbye!`);
    reader.close();
    process.exit();
});

askQuestion(username);