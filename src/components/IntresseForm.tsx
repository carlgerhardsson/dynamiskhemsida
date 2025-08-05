
"use client";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function IntresseForm() {
  const [form, setForm] = useState({
    namn: "",
    email: "",
    telefon: "",
    meddelande: "",
  });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedDates.length === 0) {
      alert("Välj minst ett datum!");
      return;
    }
    try {
      const res = await fetch("/api/intresse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dates: selectedDates.map(d => d.toISOString().slice(0,10)).join(",") }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Något gick fel vid inskickning. Försök igen.");
      }
    } catch {
      alert("Något gick fel vid inskickning. Försök igen.");
    }
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-100 rounded shadow text-green-800 text-center">
        Tack för din intresseanmälan! Vi hör av oss snart.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium">Välj datum du kan/vill träffas</label>
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={dates => setSelectedDates(dates ?? [])}
          fromDate={new Date()}
          className="mb-2"
          required={false}
        />
        {selectedDates.length > 0 && (
          <div className="text-sm text-muted-foreground mb-2">
            Valda datum: {selectedDates.map(d => d.toLocaleDateString()).join(", ")}
          </div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="namn">Ditt namn</label>
        <Input
          type="text"
          id="namn"
          name="namn"
          value={form.namn}
          onChange={handleChange}
          required
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
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="telefon">Telefon (valfritt)</label>
        <Input
          type="text"
          id="telefon"
          name="telefon"
          value={form.telefon}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="meddelande">Meddelande (valfritt)</label>
        <Textarea
          id="meddelande"
          name="meddelande"
          value={form.meddelande}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">Skicka intresseanmälan</Button>
    </form>
  );
}
