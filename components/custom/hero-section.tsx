"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface Link {
  id: number;
  url: string;
  text: string;
}

interface HeroSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

async function fetchToken() {
  const response = await fetch("/api/token");
  const data = await response.json();
  return data.token;
}

export default function HeroSection({
  data,
}: {
  readonly data: HeroSectionProps;
}) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const { heading, subHeading, image, link } = data;
  const linkUrl = userLoggedIn ? "/dashboard/profile" : link.url;

  useEffect(() => {
    fetchToken().then((token) => {
      if (token) {
        setUserLoggedIn(true);
      }
    });
  }, []);

  return (
    <header className="relative h-[600px] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-40">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading}</p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={linkUrl}
        >
          {userLoggedIn ? "Perfil" : link.text}
        </Link>
      </div>
    </header>
  );
}
