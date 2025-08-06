

import IntresseAdmin from "@/components/IntresseAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-white/90">
        <CardHeader>
          <CardTitle className="text-2xl">Admin: Intresseanmälningar & mailutskick</CardTitle>
        </CardHeader>
        <CardContent>
          <IntresseAdmin />
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
