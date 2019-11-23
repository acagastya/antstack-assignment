const csv = require('csv-parser');
const fs = require('fs');

const CSV_FILE = '../assets/data.csv';
const DATABASE = '../assets/db.json';

const res = [];

fs.createReadStream(CSV_FILE)
  .pipe(csv())
  .on('data', data => res.push(data))
  .on('end', () => {
    const content = res.map(el => {
      const items = el.items.split(';');
      items.pop();
      const itemsObj = items.reduce((acc, cur) => {
        const data = cur.split(':');
        const obj = {};
        obj[data[0]] = data[1];
        return { ...acc, ...obj };
      }, {});
      const temp = {};
      temp['items'] = itemsObj;
      return { ...el, ...temp };
    });
    const db = { content };
    const jsonified = JSON.stringify(db, null, 2);
    fs.writeFileSync(DATABASE, jsonified);
  });
