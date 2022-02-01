# pushin-p

> Generate deterministic test data for HealthNet

## Setup

Clone repo

```bash
git clone <repo>
```

Install dependencies

```bash
cd <repo> && npm install
```

Now you can use `pushin-p`. While in the directory you can also install the CLI globally with `npm install -g pushin-p`.

## Usage

Generate 50 products (default: 10)

```bash
pushin-p generate --size 50
```

Generate 120 products with barcode images (can be used by scanner)

```bash
pushin-p generate --size 120 --img
```

Generate 20 lots (default: 10)

```bash
pushin-p generate --size 50
```