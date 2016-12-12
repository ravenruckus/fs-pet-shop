'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

fs.readFile(petsPath, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const pets = JSON.parse(data);

  console.log(pets);
})
