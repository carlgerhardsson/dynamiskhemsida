"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


type Kommentar = {
  id: number;
  namn: string;
  text: string;
  createdAt: string;
};

export default function Kommentarer() {
  const [namn, setNamn] = useState("");
  const [text, setText] = useState("");
  const [kommentarer, setKommentarer] = useState<Kommentar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchKommentarer() {
    const res = await fetch("/api/kommentarer");
    setKommentarer(await res.json());
  }

  useEffect(() => {
    fetchKommentarer();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!namn || !text) {
      setError("Fyll i både namn och kommentar.");
      return;
    }
    if (text.length > 300) {
      setError("Max 300 tecken i kommentaren.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/kommentarer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namn, text }),
    });
    if (res.ok) {
      setText("");
      setNamn("");
      setKommentarer(await res.json());
    } else {
      setError("Något gick fel. Försök igen.");
    }
    setLoading(false);
  }

  return (
    <aside className="w-full md:w-2/3 max-w-full md:pl-8 mt-8 md:mt-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kommentarer</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="mb-4 px-8">
          <Input
            type="text"
            placeholder="Ditt namn"
            value={namn}
            onChange={e => setNamn(e.target.value)}
            maxLength={40}
            className="mb-2 w-full"
          />
          <Textarea
            placeholder="Din kommentar (max 300 tecken)"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={300}
            className="mb-2 w-full"
          />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            Skicka kommentar
          </Button>
        </form>
        <div className="space-y-4 px-8 pb-8">
          {kommentarer.length === 0 && <div className="text-gray-500">Inga kommentarer än.</div>}
          {kommentarer.map((k, i) => (
            <Card key={k.id || i} className="bg-gray-100 p-4 shadow-sm w-full">
              <div className="font-semibold text-blue-800">{k.namn}</div>
              <div className="text-gray-800 whitespace-pre-line break-words">{k.text}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(k.createdAt).toLocaleString()}</div>
            </Card>
          ))}
        </div>
      </Card>
    </aside>
  );
}
