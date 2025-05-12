import db from '@/utils/mongodb';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

  const users = await db.collection("users").find({}).toArray({});
  const existingUser = users.find(user => user.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const newUser = {
    name,
    email,
    password,
    list: []
  };

  const result = await db.collection("users").insertOne(newUser);
  console.log(result);
  return res.status(201).json({ message: 'User registered' });
}