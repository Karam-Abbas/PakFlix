import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

  const filePath = path.join(process.cwd(), 'users.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(fileData);

  const existingUser = users.find(user => user.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User registered' });
}
