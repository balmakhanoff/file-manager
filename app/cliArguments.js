const args = process.argv.slice(2);

export const parsedCliArgs = Object.fromEntries(
    args.map(arg => {
        const [key, value] = arg.split('=');
        return [key, value];
    })
)