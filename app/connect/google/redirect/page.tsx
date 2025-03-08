"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback?access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.jwt) {
            document.cookie = `jwt=${data.jwt}; path=/`;
            router.push("/");
          } else {
            console.error("Error al autenticar con Google:", data);
          }
        });
    }
  }, [searchParams, router]);

  return <p>Redirigiendo...</p>;
}
