"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUserAction } from "@/app/data/actions/auth-actions"; // ✅ Importación corregida
import { StrapiErrors } from "@/components/custom/strapi-errors";
import { SubmitButton } from "@/components/custom/submit-button";

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

import { ZodErrors } from "@/components/custom/zod-errors";
import GoogleAuthButton from "../custom/google-auth-button";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function SignupForm() {
  const [formState, formAction] = useActionState(
    registerUserAction, // ✅ Se asegura que la función está correctamente referenciada
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md p-6 animate-fade-in">
      <form action={formAction} className="space-y-6">
        <Card className="animate-slide-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Regístrate
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Ingresa tus datos para crear una cuenta nueva.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              text="Registrarse"
              loadingText="Registrando..."
            />
            <StrapiErrors error={formState?.strapiErrors} />
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

      <GoogleAuthButton
        text="Registrarse con Google"
        className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-lg flex justify-center items-center space-x-2 shadow-md transition-all"
      />

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?
        <Link
          className="underline ml-2 text-blue-600 hover:text-blue-700 transition-all"
          href="signin"
        >
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
}
