import readline from 'readline';
import {parsedCliArgs} from './app/cliArguments.js';
import os from 'os';
import {moveToOtherDir, showDirList, moveToUpperDir} from "./app/navigationAndWorkingDirectory.js";
import {createFile, readAndShowFile} from "./app/basicFileOperations.js";

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

        if (answer.toLowerCase() === "up") {
            currentDir = moveToUpperDir(currentDir);
        }
        else if (answer.toLowerCase().startsWith("cd ")) {
            currentDir = moveToOtherDir(answer, currentDir);
        }
        else if (answer.toLowerCase() === "ls") {
            showDirList(currentDir)
        }
        else if (answer.toLowerCase().startsWith("cat ")) {
            readAndShowFile(answer, currentDir)
        }
        else if (answer.toLowerCase().startsWith("add ")) {
            createFile(answer, currentDir)
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