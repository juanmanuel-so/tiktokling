"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = storedTheme ? (storedTheme === "dark" ? "dark" : "light") : systemDark ? "dark" : "light";

    root.classList.toggle("dark", currentTheme === "dark");
    root.style.colorScheme = currentTheme;
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };
  const [form, setForm] = useState({ usuario: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <Card className="w-full max-w-md p-6">
        <form className="flex flex-col gap-6" >
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-foreground">Buscar usuario</h1>
            <Button type="button" variant="outline" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
          </div>

          <div className="flex gap-3">
            <Input placeholder="Usuario" aria-label="Usuario" type="text" id="usuario" onChange={handleInputChange}/>
            <Link href="/[user]" as={`/${encodeURIComponent(form.usuario)}`} passHref>
              <Button type="submit" variant={"default"}>
                Ir
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </main>
  );
}