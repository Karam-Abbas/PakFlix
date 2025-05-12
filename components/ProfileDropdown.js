import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  const profile = { name: session.user.name, locked: false };
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    alert("You have been logged out.");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center">
      {/* Profile avatar button that toggles dropdown */}
      <div className="relative">
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-black bg-opacity-90 border border-gray-800 rounded shadow-lg z-50">
            {/* Profile selection section */}
            <div className="border-b border-gray-800">
                <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 transition cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <UserCircle/>
                    <span className="text-white">{profile.name}</span>
                  </div>
                </div>
            </div>
            
            {/* Sign out section */}
            <div className="px-4 py-3 hover:bg-gray-800 transition cursor-pointer flex justify-center" onClick={handleLogout}>
              <span className="text-white">Log Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}