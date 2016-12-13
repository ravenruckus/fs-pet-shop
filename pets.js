/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const pet = process.argv[3];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if (pet) {
      if (pet < 0 || pet > pets.length - 1) {
        console.error(`Usage: ${node} ${file} read INDEX`);
      }
      else {
        console.log(pets[pet]);
      }
    }
    else {
      console.log(pets);
    }
  });
}
else if (cmd === 'create') {
  console.log('created');
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(2);
}
