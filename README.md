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
node index.js add <id> <name> <email> [--age <age>]
```

Examples:
```bash
node index.js add "user123" "John Doe" "john@example.com" --age 30
node index.js add "user456" "Jane Smith" "jane@example.com"
```

**Note**: The ID must be unique. If the ID already exists, the command will exit with an error.

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
node index.js show user123
```

### Delete a user
```bash
node index.js delete <id>
```

Example:
```bash
node index.js delete user123
```

### Delete all users
```bash
node index.js delete-all
```

### Get help
```bash
node index.js --help
node index.js <command> --help
```

## Data Storage

Users are stored in `users.json` in the project directory. Each user has:
- `id`: Unique identifier (required, must be unique)
- `name`: User name (required)
- `email`: User email (required)
- `age`: User age (optional)
- `createdAt`: Creation timestamp (auto-generated)

## Examples

1. Add users:
```bash
node index.js add "alice123" "Alice Johnson" "alice@example.com" --age 25
node index.js add "bob456" "Bob Wilson" "bob@example.com"
```

2. List all users:
```bash
node index.js list
```

3. Show specific user:
```bash
node index.js show alice123
```

4. Delete a user:
```bash
node index.js delete alice123
```

5. Delete all users:
```bash
node index.js delete-all
```

## Error Handling

The CLI provides clear error messages with `[OK]` prefix for all operations:
- Duplicate user IDs when adding
- User not found when showing/deleting
- Empty user list when listing

## Repository

This project is deployed on GitHub: https://github.com/MohannedF16/Node-Scripts
