const chalk = require('chalk');

const { getBlogposts } = require('./directus/blogposts');
const { getResources } = require('./directus/resources');
const { getTeam } = require('./directus/team');
const { getDemocracy } = require('./directus/democracy');
const { getModal } = require('./directus/modal');

console.log('');
console.log(chalk.green('Starting importing data from Directus...'));
console.log('');
console.log(chalk.green('[ REBOOT: BLOGPOSTS - RESOURCES - TEAM - DEMOCRACY - MODAL ]'));

getBlogposts();
getResources();
getTeam();
getDemocracy();
getModal();
