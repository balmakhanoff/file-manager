import os from "os";

export const getEOL = () => {
    console.log(`EOL: ${JSON.stringify(os.EOL)}`);
};

export const getCpuINFO = () => {
    const cpus = os.cpus();

    console.log(`all CPU's: ${cpus.length}`);
    console.log('Info about every CPU:');

    cpus.forEach((cpu, index) => {
        const {model, speed} = cpu;
        const speedGHz = (speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: ${model}, ${speedGHz} GHz`);
    })
}

export const getHomeDir = () => {
    const homeDir = os.homedir();
    console.log(`Home directory: ${homeDir}`);
}

export const getOsUserName = () => {
    const userName = os.userInfo().username;
    console.log(`User name: ${userName}`);
}

export const getCpuArchitecture = () => {
    const architecture = os.arch();
    console.log(`CPU architecture: ${architecture}`);
}