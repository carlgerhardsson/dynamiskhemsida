"use client";
import { useEffect, useState } from "react";

type IntresseAnmalan = {
  id: number;
  namn: string;
  email: string;
  telefon?: string;
  meddelande?: string;
  dates?: string;
  createdAt: string;
};
type MailUtskick = {
  id: number;
  namn: string;
  email: string;
  createdAt: string;
};


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function IntresseAdmin() {
  const [anmalningar, setAnmalningar] = useState<IntresseAnmalan[]>([]);
  const [mailutskick, setMailutskick] = useState<MailUtskick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/intresse-lista").then((res) => res.json()),
      fetch("/api/mailutskick-lista").then((res) => res.json()),
    ])
      .then(([anm, mail]) => {
        setAnmalningar(anm);
        setMailutskick(mail);
        setLoading(false);
      })
      .catch(() => {
        setError("Kunde inte hämta data.");
        setLoading(false);
      });
  }, []);

  // Grupp: datumsträng (YYYY-MM-DD) => anmälningar
  const groupedByDate: Record<string, IntresseAnmalan[]> = {};
  anmalningar.forEach((anm) => {
    if (anm.dates) {
      anm.dates.split(",").forEach((date) => {
        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(anm);
      });
    }
  });

  return (
    <div className="space-y-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Intresseanmälningar per datum</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div>Laddar...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <>
              {Object.keys(groupedByDate).length === 0 && <div className="mb-4">Inga valda datum ännu.</div>}
              {Object.entries(groupedByDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, list]) => (
                <div key={date} className="mb-6">
                  <div className="font-bold mb-1">{date}</div>
                  <div className="overflow-x-auto">
                    <table className="w-full border mb-2 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2">Namn</th>
                          <th className="border p-2">E-post</th>
                          <th className="border p-2">Telefon</th>
                          <th className="border p-2">Meddelande</th>
                          <th className="border p-2">Skapad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((anm) => (
                          <tr key={anm.id}>
                            <td className="border p-2">{anm.namn}</td>
                            <td className="border p-2">{anm.email}</td>
                            <td className="border p-2">{anm.telefon}</td>
                            <td className="border p-2">{anm.meddelande}</td>
                            <td className="border p-2">{new Date(anm.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Mailutskick</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div>Laddar...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Namn</th>
                    <th className="border p-2">E-post</th>
                    <th className="border p-2">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {mailutskick.map((mail) => (
                    <tr key={mail.id}>
                      <td className="border p-2">{mail.namn}</td>
                      <td className="border p-2">{mail.email}</td>
                      <td className="border p-2">{new Date(mail.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
