import db from '@/utils/mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { movieId, tvShowId } = req.body;
  if (!movieId && !tvShowId) {
    return res.status(400).json({ message: 'Either movieId or tvShowId is required' });
  }

  try {
    const listItem = movieId ? { movieId } : { tvShowId };
    const result = await db.collection("users").updateOne(
      { email: session.user.email },
      { $addToSet: { list: listItem } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Content added to list' });
  } catch (error) {
    console.error('Error updating user list:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 