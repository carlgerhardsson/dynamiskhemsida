
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MailForm() {
  const [form, setForm] = useState({ namn: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.namn) {
      setError("Namn krävs");
      return;
    }
    if (!form.email) {
      setError("E-post krävs");
      return;
    }
    try {
      const res = await fetch("/api/mailutskick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Något gick fel vid inskickning. Försök igen.");
      }
    } catch {
      setError("Något gick fel vid inskickning. Försök igen.");
    }
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-100 rounded shadow text-green-800 text-center">
        Tack för din anmälan till mailutskick!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium" htmlFor="namn">Ditt namn</label>
        <Input
          type="text"
          id="namn"
          name="namn"
          value={form.namn}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="email">E-post</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <Button type="submit" className="w-full">Anmäl dig</Button>
    </form>
  );
}
