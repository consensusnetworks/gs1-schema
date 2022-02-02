#!/usr/bin/env node
var w=Object.create;var p=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var P=e=>p(e,"__esModule",{value:!0});var k=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of b(t))!x.call(e,o)&&(r||o!=="default")&&p(e,o,{get:()=>t[o],enumerable:!(n=y(t,o))||n.enumerable});return e},l=(e,t)=>k(P(p(e!=null?w(D(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var m=(e,t,r)=>new Promise((n,o)=>{var u=i=>{try{s(r.next(i))}catch(d){o(d)}},c=i=>{try{s(r.throw(i))}catch(d){o(d)}},s=i=>i.done?n(i.value):Promise.resolve(i.value).then(u,c);s((r=r.apply(e,t)).next())});var g=l(require("fs")),a=require("symbology"),f=l(require("arg"));const h=`
Usage:
  pushin-p [command] [options]
  
Commands:
  generate  Generate sample data
  
Options:
  --help  Show this help
  
  --size  Number of records to generate
  --img   Whether to generate barcode images
  --out   Output directory to place image files
  `;function z(e){return m(this,null,function*(){const{_:t}=e;t.includes("--help")&&(process.stdout.write(h+`
`),process.exit(0)),(t.length<1||!t.includes("generate"))&&(process.stdout.write(h+`
`),process.exit(1));const r={init:new Date,products:new Map};console.log(e);const n={size:10,img:!1,range:{start:"2019-01-01",end:"2019-03-25",increment:1},out:process.cwd()},o="data";g.existsSync(o)||g.mkdirSync(o);for(const u of Array.from({length:n.size})){const c="[01]10614141543219[10]3456789[21]3456789012",s=N(c);s["@id"]||(process.stderr.write(`Product has no id
`),process.exit(1)),r.products.set(s["@id"],s),yield(0,a.createFile)({symbology:a.SymbologyType.DATAMATRIX,encoding:a.EncodingMode.GS1_MODE,fileName:`./data/${s["@id"]}.png`},c).catch(i=>{process.stderr.write(`Failed to create file: ${i}
`),process.exit(1)}).finally(()=>{process.stdout.write(`Generated files are in ${o}
`)})}})}const B=(0,f.default)({"--help":Boolean,"--size":Number,"--img":Boolean,"-h":"--help","-s":"--size","-i":"--img"});z(B).catch(e=>{console.error(e),process.exit(1)});function $(e,t,r){if(t<e)throw new Error("End date must be after start date");const n=[];let o=e;for(;o<=t;)n.push(o),o=new Date(o.getTime()+r);return n}function N(e){return{"@id":`P-${Date.now()}-${e}`,"@type":"Product",name:"blood_product",description:"blood product description",sku:"12345",category:"blood",brand:{"@id":"brand:1","@type":"Organization",name:"Blood Bank of New York",description:"Blood Bank of New York description",url:"https://example.com/brand",location:"New York, NY",memberOf:"organization:1"},offers:{"@type":"Offer",price:"10.00",priceCurrency:"USD",url:"http://www.example.com/product/12345"},gtin14:"[01]10614141543219[10]3456789[21]3456789012",height:"10.00",width:"15.00",productID:"5476",potentialAction:{"@type":"CreateAction",agent:{"@type":"Organization",name:"Blood Bank"}}}}function E(e){return JSON.stringify(e,null,2)}
