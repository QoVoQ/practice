const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');

const inp = fs.createReadStream('vendor.bundle.min.js');
const outp = fs.createWriteStream('out.js.gz');

inp.pipe(gzip).pipe(outp)
