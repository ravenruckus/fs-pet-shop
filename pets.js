/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const pet = process.argv[3];
// const petsJSON = {};

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
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(3);
    }
    else if (age && kind && name) {
      const newPet = {};
      newPet.age = parseInt(age);
      newPet.kind = kind;
      newPet.name = name;
      pets.push(newPet);
      console.log(newPet);
      pets = JSON.stringify(pets);

      fs.writeFile(petsPath, pets, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }

      });
    }
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(2);
}
