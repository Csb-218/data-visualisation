

// eslint-disable-next-line @typescript-eslint/no-require-imports
const csv = require('csv-parser')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')

const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data)
    results.push(data)})
  .on('end', () => {
    // console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });