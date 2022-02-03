# gs1-schema-dts

> TypeScript types for the [GS1 web vocabulary](https://www.gs1.org/voc/)

## Usage

```typescript
import {Product} from "gs1-schema-dts"

const myProduct: Product = {
    "@type": "https://schema.org/Product",
    "@id": "https://example.com/product/123",
    "name": "cool product name",
    "description": "product description goes here",
}
```

## Sample data (wip)

This package also includes a cli to assist you generate sample data.

### Setup

Clone repo

```bash
git clone https://github.com/hawyar/gs1-schema-dts
```

Install dependencies

```bash
cd <repo> && npm i
```

Now you can use the cli `gs1data`.

**Note**: While in the directory you can also install the CLI globally with `npm install -g gs1data`.

### Generate test data

Generate products (default: 10)

```bash
gs1data generate
```

Generate 50 products

```bash
gs1data generate --size 50
```

Generate 120 products with barcode images (can be used by scanner)

```bash
gs1data generate --size 120 --img
```

Generate 20 lots (default: 10)

```bash
gs1data generate --size 50
```

TODO:

- Add tests
- Prepare for npm
- Generate lots (with barcode images)
- Randomize key properties (expiry, action, owner, actions, etc)
