// @ts-nocheck

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../../app/context/user-context"; // ✅ Contexto del usuario
import { loginUserAction } from "@/app/data/actions/auth-actions"; // Si existe esta función

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/submit-button";
import GoogleAuthButton from "../custom/google-auth-button";

export function SigninForm() {
  const { syncUser } = useUser(); // ✅ Función para sincronizar el usuario
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      // ✅ Llama a la acción para autenticar al usuario
      const response = await loginUserAction(formData);

      if (response && response.jwt) {
        // Guarda el token en localStorage
        localStorage.setItem("jwt", response.jwt);

        // Sincroniza el contexto del usuario
        await syncUser();

        // ✅ Redirige al usuario a la página de inicio
        router.push("/");

        // ✅ Espera un pequeño tiempo y recarga la página para actualizar el estado
        setTimeout(() => {
          window.location.href = "/"; // Asegura una recarga completa
        }, 500);
      } else {
        throw new Error("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="animate-slide-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Ingresa tus datos para acceder a tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Usuario o Correo</Label>
              <Input id="identifier" name="identifier" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton
              text="Iniciar Sesión"
              loadingText="Cargando..."
              disabled={loading}
            />
          </CardFooter>
        </Card>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">O</span>
        </div>
      </div>

      {/* <GoogleAuthButton text="Continuar con Google" /> */}

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?
        <Link
          href="/signup"
          className="underline ml-2 text-blue-600 hover:text-blue-700"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
}
