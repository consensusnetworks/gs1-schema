import args from 'arg'
import path from 'path';

const usage = `
Usage:
  gs1data [command] [options]
  
Commands:
  generate  Generate sample data
  
Options:
  --help  Show this help
  
  --size  Number of items to generate (default: 10)
  --img   Whether to generate barcode images (default: false)
  --out   Output directory to place image files (default: ./out)
  `

async function run(args: args.Result<any>): Promise<void> {
    const {_: commands} = args;

    if (commands.includes('--help')) {
        process.stdout.write(usage + '\n');
        process.exit(0);
    }

    if (commands.length < 1 || !commands.includes('generate')) {
        process.stdout.write(usage + '\n');
        process.exit(1);
    }

    const opt = {
        size: args['--size'] || 10,
        range: {
            start: '2019-01-01',
            end: '2019-03-25',
            increment: 1,
        },
        outDir: args["--out"] || path.join(process.cwd() + "out")
    }

    // TODO: gen data
    // const gtin = `[01]10614141543219[10]3456789[21]3456789012`
    //
    // // for (const item of Array.from({length: opt.size})) {
    // // }
}

const arg = args({
    '--help': Boolean,
    '--size': Number,
    '--out': String,

    // aliases
    '-h': '--help',
    '-s': '--size',
    '-o': '--out',
});

run(arg).finally(() => {
    process.stdout.write(`generated data\n`);
    process.exit(0);
}).catch((err) => {
    console.error(err)
    process.exit(1)
})