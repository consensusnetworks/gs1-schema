import * as fs from 'fs';
import {createFile, EncodingMode, OutputType, SymbologyType} from 'symbology'
import args from 'arg'
import {Product, Thing, WithContext} from 'schema-dts';

function newProduct(raw: string): Product {
    const p: Product = {
        '@id': '',
        '@type': 'Product',
        name: 'blood_product',
        description: 'blood product description',
        sku: '12345',
        category: 'blood',
        brand: 'blood bank',
        offers: {
            '@type': 'Offer',
            price: '10.00',
            priceCurrency: 'USD',
            url: 'http://www.example.com/product/12345',
        },
        gtin14: `[01]10614141543219[10]3456789[21]3456789012`, // GS1 DataMatrix
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

function genDate(start: Date, end: Date, increment: number): Date[] {
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

const usage = `
Usage:
  pushin-p [command] [options]
  
Commands:
  generate  Generate sample data
  
Options:
  --help  Show this help
  --size  Number of records to generate
  --img   Whether to generate barcode images
  --out   Output directory
  `

async function run(args: args.Result<any>): Promise<args.Result<any>> {
    const {_: commands} = args;


    if (commands.length < 1) {
        process.stdout.write(usage);
        process.exit(1);
    }

    console.log(args)
    // const defaults = {
    //     size: 10,
    //     img: false,
    //     range: {
    //         start: '2019-01-01',
    //         end: '2019-03-25',
    //         increment: 1,
    //     }
    // }
    //
    // const p = JsonLd<Product>({
    //     '@context': "https://schema.org",
    //     '@type': "Product",
    // });
    //
    // const max = 120
    // const batch = {
    //     init: new Date(),
    //     products: new Map<string, Product>(),
    // }
    // const gtin = `[01]10614141543219[10]3456789[21]3456789012`
    //
    // // check if data dir exists ifnot create it
    // const dataDir = 'data'
    // if (!fs.existsSync(dataDir)) {
    //     fs.mkdirSync(dataDir)
    // }
    //
    // for (const item of Array.from({length: 30})) {
    //     // create product
    //     const p = newProduct(gtin);
    //
    //     // add to current batch
    //     batch.products.set(p.productID.toString(), p);
    //     const symData = await createFile({
    //         symbology: SymbologyType.DATAMATRIX,
    //         encoding: EncodingMode.GS1_MODE,
    //         fileName: `./data/${p.name}-${Date.now()}.png`,
    //     }, gtin);
    // }
    //
    return args
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

run(arg).catch((err) => {
    console.error(err)
    process.exit(1)
})