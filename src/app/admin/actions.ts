"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

const cookieName = "ema_admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function matches(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return false;
  const jar = await cookies();
  const token = jar.get(cookieName)?.value || "";
  return matches(token, digest(secret));
}

export async function loginAdmin(formData: FormData) {
  const secret = process.env.ADMIN_SECRET?.trim();
  const password = String(formData.get("password") || "");
  if (!secret || !matches(password, secret)) {
    redirect("/admin/subscribers?error=1");
  }
  const jar = await cookies();
  jar.set(cookieName, digest(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin/subscribers");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(cookieName);
  redirect("/admin/subscribers");
}

export async function setAccessStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/subscribers");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!["pending", "granted", "revoked"].includes(status)) return;
  const db = createAdminClient();
  if (!db) return;
  await db
    .from("indicator_subscriptions")
    .update({ access_status: status, updated_at: new Date().toISOString() })
    .eq("id", id);
  redirect("/admin/subscribers");
}
