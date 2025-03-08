"use client";

import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function GoogleRedirectPage() {
  return (
    <Suspense fallback={<p>Cargando autenticación...</p>}>
      <GoogleAuthHandler />
    </Suspense>
  );
}

function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const accessToken = searchParams.get("access_token");
        if (!accessToken) {
          console.error("No se encontró el token de acceso en la URL.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback?access_token=${accessToken}`
        );
        const data = await response.json();

        if (data.jwt) {
          document.cookie = `jwt=${data.jwt}; path=/`;
          router.push("/");
        } else {
          console.error("Error al autenticar con Google:", data);
        }
      } catch (error) {
        console.error("Error en la autenticación:", error);
      }
    };

    authenticate();
  }, [searchParams, router]);

  return <p>Redirigiendo...</p>;
}
