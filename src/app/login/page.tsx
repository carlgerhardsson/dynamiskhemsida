"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/");
    } else {
      setError("Fel användarnamn eller lösenord");
    }
  }

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/IMG_20140728_161255.jpg"
          alt="Familj som leker utomhus"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center pt-12 px-4 w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow">Välkommen till familjeföreningen</h1>
        </div>
        <Card className="w-full max-w-sm mx-auto shadow-lg bg-white/60">
          <CardHeader>
          <CardTitle className="text-2xl text-black/60">Logga in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium" htmlFor="username">Användarnamn</label>
              <Input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="password">Lösenord</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <Button type="submit" variant="outline" className="w-full bg-white/60 text-gray-900 border-gray-300 hover:bg-gray-100">Logga in</Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
