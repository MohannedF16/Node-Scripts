# User Manager CLI

A Node.js command-line tool for managing users using yargs. Users are stored in a JSON file.

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

### Add a new user
```bash
node index.js add <name> <email> [--age <age>]
```

Examples:
```bash
node index.js add "John Doe" "john@example.com" --age 30
node index.js add "Jane Smith" "jane@example.com"
```

### List all users
```bash
node index.js list
```

### Show specific user
```bash
node index.js show <id>
```

Example:
```bash
node index.js show 1234567890123
```

### Delete a user
```bash
node index.js delete <id>
```

Example:
```bash
node index.js delete 1234567890123
```

### Get help
```bash
node index.js --help
node index.js <command> --help
```

## Data Storage

Users are stored in `users.json` in the project directory. Each user has:
- `id`: Unique identifier (timestamp)
- `name`: User name
- `email`: User email
- `age`: User age (optional)
- `createdAt`: Creation timestamp

## Examples

1. Add users:
```bash
node index.js add "Alice Johnson" "alice@example.com" --age 25
node index.js add "Bob Wilson" "bob@example.com"
```

2. List all users:
```bash
node index.js list
```

3. Show specific user:
```bash
node index.js show <user-id-from-list>
```

4. Delete a user:
```bash
node index.js delete <user-id-from-list>
```
