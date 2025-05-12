import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function DonePage({ session }) {
  const router = useRouter();
    console.log(session);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    alert("You have been logged out.");
    router.push("/login");
  };

  return (
    <div className="h-screen bg-black text-white relative">
      {/* Logout Button - Top Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Centered Welcome Message */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-semibold">
          Welcome, {session.user.name}!
        </h1>
      </div>
    </div>
  );
}