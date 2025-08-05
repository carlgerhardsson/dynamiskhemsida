
"use client";


import Kommentarer from "@/components/Kommentarer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div
      className="relative font-sans min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/IMG_20140728_161255.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col md:flex-row h-full min-h-screen">
        <div className="flex-1 flex items-start justify-start p-8">
          <Card className="w-full max-w-md bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Välkommen!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild variant="default" className="w-full">
                <a href="/intresse">Anmäl intresse för dagsaktivitet</a>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a href="/mail">Anmäl dig till kommande mailutskick</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="/admin">Admin: Visa intresseanmälningar</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Kommentarer />
      </div>
    </div>
  );
}
