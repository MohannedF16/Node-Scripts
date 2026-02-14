
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const { demandOption } = require('yargs');

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper functions
function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// CLI setup
yargs(hideBin(process.argv))
  .command(
    'add <id> <name> <email>',
    'Add a new user',
    builder = {
      id: {
        describe: 'User ID',
        demandOption: true,
        type: 'string'
      },
      name: {
        describe: 'User name',
        demandOption: true,
        type: 'string'
      },
      email: {
        describe: 'User email',
        demandOption: true,
        type: 'string'
      },
      age: {
        describe: 'User age',
        demandOption: false,
        type: 'number',
        default: null
      }
    },
    handler = async (argv) => {
      const users = loadUsers();
      const newUser = {
        id: argv.id,
        name: argv.name,
        email: argv.email,
        age: argv.age,
        createdAt: new Date().toISOString()
      };
      users.forEach(user => {
        if (user.id === argv.id) {
          console.log(`[OK] User with ID "${argv.id}" already exists.`);
          process.exit(1);
        }
      });
      users.push(newUser);
      saveUsers(users);
      console.log(`[OK] User "${argv.name}" added successfully!`);
      console.log(`ID: ${newUser.id}`);
    }
  )
  .command(
    'delete <id>',
    'Delete a user by ID',
    builder = {
      id: {
        describe: 'User ID to delete',
        demandOption: true,
        type: 'string'
      }
    },
    handler = async (argv) => {
      const users = loadUsers();
      const initialLength = users.length;
      const filteredUsers = users.filter(user => user.id !== argv.id);
      
      if (filteredUsers.length === initialLength) {
        console.log(`[OK] User with ID "${argv.id}" not found.`);
        process.exit(1);
      }
      
      saveUsers(filteredUsers);
      console.log(`[OK] User with ID "${argv.id}" deleted successfully!`);
    }
  )
  .command(
    'delete-all',
    'Delete all users',
    builder = {},
    handler = async () => {
      saveUsers([]);
      console.log('[OK] All users deleted successfully!');
    }
  )
  .command(
    'list',
    'List all users',
    builder = {},
    handler = async (argv) => {
      const users = loadUsers();
      
      if (users.length === 0) {
        console.log('[OK] No users found.');
        return;
      }
      
      console.log(`[OK] Found ${users.length} user(s):`);
      console.log('');
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   ID: ${user.id}`);
        if (user.age) console.log(`   Age: ${user.age}`);
        console.log(`   Created: ${new Date(user.createdAt).toLocaleDateString()}`);
        console.log('');
      });
    }
  )
  .command(
    'show <id>',
    'Show specific user details',
    builder = {
      id: {
        describe: 'User ID to show',
        demandOption: true,
        type: 'string'
      }
    },
    handler = async (argv) => {
      const users = loadUsers();
      const user = users.find(u => u.id === argv.id);
      
      if (!user) {
        console.log(`[OK] User with ID "${argv.id}" not found.`);
        process.exit(1);
      }
      
      console.log(`[OK] User Details:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      if (user.age) console.log(`   Age: ${user.age}`);
      console.log(`   Created: ${new Date(user.createdAt).toLocaleString()}`);
    }
  )
  .demandCommand(1, 'You need to specify a command')
  .help()
  .alias('help', 'h')
  .alias('version', 'v')
  .strict()
  .argv;
