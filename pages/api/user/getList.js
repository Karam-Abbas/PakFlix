import db from '@/utils/mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const token = process.env.NEXT_TMDB_ACCESS_TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch details for each item in the user's list
    const contentDetails = await Promise.all(
      user.list.map(async (item) => {
        let url;
        if (item.movieId) {
          url = `https://api.themoviedb.org/3/movie/${item.movieId}`;
        } else if (item.tvShowId) {
          url = `https://api.themoviedb.org/3/tv/${item.tvShowId}`;
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`TMDB API error: ${response.status}`);
        }
        
        const data = await response.json();
        return {
          ...data,
          type: item.movieId ? 'movie' : 'tv'
        };
      })
    );

    return res.status(200).json({ content: contentDetails });
  } catch (error) {
    console.error('Error fetching user list:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 