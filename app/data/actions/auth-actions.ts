// @ts-nocheck

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginUserService,
  registerUserService,
} from "@/app/data/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function loginUserAction(formData: FormData) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const responseData = await loginUserService({ identifier, password });

  if (responseData.error) {
    throw new Error(responseData.error);
  }

  const cookieStore = await cookies(); // ✅ Asegurar que es await
  await cookieStore.set("jwt", responseData.jwt, config); // ✅ Usar await para set()

  redirect("/dashboard/profile");
}

export async function registerUserAction(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const responseData = await registerUserService({ username, email, password });

  if (responseData.error) {
    throw new Error(responseData.error);
  }

  const cookieStore = await cookies();
  await cookieStore.set("jwt", responseData.jwt, config);

  redirect("/dashboard/profile");
}
