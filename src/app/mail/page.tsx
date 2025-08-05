"use client";

import MailForm from "@/components/MailForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MailPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg mx-auto shadow-lg bg-white/90">
        <CardHeader>
          <CardTitle className="text-2xl">Anmäl dig till kommande mailutskick</CardTitle>
        </CardHeader>
        <CardContent>
          <MailForm />
          <div className="mt-6 flex justify-between">
            <Button asChild variant="outline">
              <Link href="/">Till startsidan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
