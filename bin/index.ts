import * as fs from 'fs';
import {createFile, EncodingMode, SymbologyType} from 'symbology'
import args from 'arg'
import {Product, Thing, WithContext} from 'schema-dts';

const usage = `
Usage:
  pushin-p [command] [options]
  
Commands:
  generate  Generate sample data
  
Options:
  --help  Show this help
  
  --size  Number of records to generate
  --img   Whether to generate barcode images
  --out   Output directory to place image files
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

    // current batch
    const current = {
        init: new Date(),
        products: new Map<string, Product>(),
    }

    console.log(args)

    const defaults = {
        size: 10,
        img: false,
        range: {
            start: '2019-01-01',
            end: '2019-03-25',
            increment: 1,
        },
        out: process.cwd(),
    }

    const outputDir = 'data' || args.out;

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const item of Array.from({length: defaults.size})) {
        const gtin = `[01]10614141543219[10]3456789[21]3456789012`

        const product = newProduct(gtin);

        if (!product["@id"]) {
            process.stderr.write(`Product has no id\n`);
            process.exit(1);
        }

        current.products.set(product["@id"], product);

        // generate barcode images, only interested in the GS1 DataMatrix for now
        await createFile({
            symbology: SymbologyType.DATAMATRIX,
            encoding: EncodingMode.GS1_MODE,
            fileName: `./data/${product["@id"]}.png`,
        }, gtin).catch(err => {
            process.stderr.write(`Failed to create file: ${err}\n`);
            process.exit(1);
        })
    }
}

const arg = args({
    '--help': Boolean,
    '--size': Number,
    '--img': Boolean,

    // aliases
    '-h': '--help',
    '-s': '--size',
    '-i': '--img',
});

run(arg).finally(() => {
    process.stdout.write(`generated data\n`);
    process.exit(0);
}).catch((err) => {
    console.error(err)
    process.exit(1)
})

function datesInReange(start: Date, end: Date, increment: number): Date[] {
    if (end < start) {
        throw new Error('End date must be after start date')
    }

    const dates: Date[] = [];

    let current = start;
    while (current <= end) {
        dates.push(current);
        current = new Date(current.getTime() + increment);
    }
    return dates;
}

function newProduct(raw: string): Product {
    const p: Product = {
        '@id': `P-${Date.now()}-${raw}`,
        '@type': 'Product',
        name: 'blood_product',
        description: 'blood product description',
        sku: '12345',
        category: 'blood',
        brand: {
            '@id': 'brand:1',
            '@type': 'Organization',
            name: 'Blood Bank of New York',
            description: 'Blood Bank of New York description',
            url: 'https://example.com/brand',
            location: 'New York, NY',
            memberOf: 'organization:1',
        },
        offers: {
            '@type': 'Offer',
            price: '10.00',
            priceCurrency: 'USD',
            url: 'http://www.example.com/product/12345',
        },
        gtin14: `[01]10614141543219[10]3456789[21]3456789012`, // AIs are wrapped in []
        height: '10.00',
        width: '15.00',
        productID: '5476',
        potentialAction: {
            '@type': 'CreateAction',
            agent: {
                '@type': 'Organization',
                name: 'Blood Bank',
            },
        },
    };
    return p
}

function JsonLd<T extends Thing>(json: WithContext<T>): string {
    return JSON.stringify(json, null, 2);
}