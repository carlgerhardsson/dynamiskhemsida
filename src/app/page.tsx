
"use client";



import Kommentarer from "@/components/Kommentarer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="relative font-sans min-h-screen overflow-hidden">
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
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
        <div className="z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center min-h-[60vh]">
          <div className="flex-1 flex items-start justify-start">
            <Card className="w-full max-w-md bg-white/90 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Välkommen!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button asChild variant="outline" className="w-full bg-white text-gray-900 border-gray-300 hover:bg-gray-100">
                  <a href="/intresse">Anmäl intresse för dagsaktivitet</a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white text-gray-900 border-gray-300 hover:bg-gray-100">
                  <a href="/mail">Anmäl dig till kommande mailutskick</a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-white text-gray-900 border-gray-300 hover:bg-gray-100">
                  <a href="/admin">Admin: Visa intresseanmälningar</a>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="w-full bg-white text-gray-900 border-gray-300 hover:bg-gray-100 mt-2">
                  Logga ut
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex items-start justify-end min-w-0 w-full md:min-w-[400px] md:w-[700px] md:max-w-full">
            <Kommentarer />
          </div>
        </div>
      </main>
    </div>
  );
}
