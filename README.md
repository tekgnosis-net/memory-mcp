# Memory MCP

A Model Context Protocol (MCP) server for logging and retrieving memories from LLM conversations.

## Features

- **Save Memories**: Store memories from LLM conversations with timestamps and LLM identification
- **Retrieve Memories**: Get all stored memories with detailed metadata
- **Add Memories**: Append new memories without overwriting existing ones
- **Clear Memories**: Remove all stored memories
- **MongoDB Storage**: Persistent storage using MongoDB database

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

## Configuration

Set the MongoDB connection string via environment variable:

```bash
export MONGODB_URI="mongodb://localhost:27017"
```

Default: `mongodb://localhost:27017`

## Usage

### Available Tools

1. **save-memories**: Save all memories to the database, overwriting existing ones
   - `memories`: Array of memory strings to save
   - `llm`: Name of the LLM (e.g., 'chatgpt', 'claude')
   - `userId`: Optional user identifier

2. **get-memories**: Retrieve all memories from the database
   - No parameters required

3. **add-memories**: Add new memories to the database without overwriting existing ones
   - `memories`: Array of memory strings to add
   - `llm`: Name of the LLM (e.g., 'chatgpt', 'claude')
   - `userId`: Optional user identifier

4. **clear-memories**: Clear all memories from the database
   - No parameters required

### Example Usage in LLM

1. **Save all memories** (overwrites existing):

   ```
   User: "Save all my memories from this conversation to the MCP server"
   LLM: [Uses save-memories tool with current conversation memories]
   ```

2. **Retrieve all memories**:

   ```
   User: "Get all my memories from the MCP server"
   LLM: [Uses get-memories tool to retrieve stored memories]
   ```

3. **Add new memories** (preserves existing):
   ```
   User: "Add these new memories to my existing ones"
   LLM: [Uses add-memories tool to append new memories]
   ```

## Database Schema

Memories are stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId,
  memories: string[],        // Array of memory strings
  timestamp: Date,          // When memories were saved
  llm: string,             // LLM identifier (e.g., 'chatgpt', 'claude')
  userId?: string          // Optional user identifier
}
```

## Development

To run in development mode:

```bash
npm run build
node build/index.js
```
