const chalk = require('chalk');

const { getItems } = require('./directus/items');

console.log('');
console.log(chalk.green('Starting importing data from Directus...'));
console.log('');
console.log(chalk.green('[ BLOGPOSTS]'));

getItems();
