import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let clientPromise = await client.connect();
const db = clientPromise.db("pakflix");
export default db;