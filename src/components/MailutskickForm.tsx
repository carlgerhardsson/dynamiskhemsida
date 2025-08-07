import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MailutskickForm() {
  const [form, setForm] = useState({ namn: "", email: "" });
  const [csrfToken, setCsrfToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/mailutskick")
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken || ""));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/mailutskick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      console.log('API response:', res.status, data);
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
        Tack för din anmälan till mailutskick!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium" htmlFor="namn">Namn</label>
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
      <Button type="submit" className="w-full">Anmäl dig till mailutskick</Button>
    </form>
  );
}
