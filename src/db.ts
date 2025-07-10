import { MongoClient, ObjectId, Db, Collection } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DATABASE_NAME = "memory_mcp";
const COLLECTION_NAME = "memories";

export interface Memory {
  _id?: ObjectId;
  memories: string[];
  timestamp: Date;
  llm: string;
  userId?: string;
}

let client: MongoClient;
let db: Db;
let collection: Collection<Memory>;

export async function initializeDatabase() {
  if (client && db && collection) return;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DATABASE_NAME);
  collection = db.collection(COLLECTION_NAME);
}

export function getCollection() {
  if (!collection) throw new Error("Database not initialized");
  return collection;
}

export async function saveMemories(
  memories: string[],
  llm: string,
  userId?: string,
): Promise<void> {
  await initializeDatabase();
  const memoryDoc: Memory = {
    memories,
    timestamp: new Date(),
    llm,
    userId,
  };
  await collection.insertOne(memoryDoc);
}

export async function getAllMemories(): Promise<Memory[]> {
  await initializeDatabase();
  return collection.find({}).sort({ timestamp: -1 }).toArray();
}

export async function clearAllMemories(): Promise<number> {
  await initializeDatabase();
  const result = await collection.deleteMany({});
  return result.deletedCount || 0;
}

export async function closeDatabase() {
  if (client) await client.close();
}
