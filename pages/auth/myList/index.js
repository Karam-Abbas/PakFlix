import AuthLayout from "@/components/layouts/AuthLayout";
import ContentCard from "@/components/ContentCard";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MyList = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }

    const fetchMyList = async () => {
      try {
        const response = await fetch('/api/user/getList');
        if (!response.ok) {
          throw new Error('Failed to fetch list');
        }
        const data = await response.json();
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [session]);

  if (!session) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load your list. {error}
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="bg-black pt-12">
        <p className="text-2xl mx-8 py-4 font-bold">My List 📋</p>
        {content.length === 0 ? (
          <p className="text-white text-center py-8">Your list is empty. Add some content to get started!</p>
        ) : (
          <div className="max-w-screen mx-auto px-4 md:px-8">
            <div className="flex overflow-x-auto space-x-4 pb-8 scrollbar-hide">
              {content.map((item) => (
                <div key={item.id} className="flex-none">
                  <ContentCard content={item} isShow={item.type === 'tv'} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default MyList;