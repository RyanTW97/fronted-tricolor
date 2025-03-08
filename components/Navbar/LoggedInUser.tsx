"use client";

import Link from "next/link";

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href="/dashboard/profile"
        className="font-normal text-blue-800 hover:scale-125 hover:text-red-500 transition-transform duration-200"
      >
        {userData.username}
      </Link>
    </div>
  );
}
