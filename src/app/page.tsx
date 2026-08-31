import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <form
        action="/"
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Buscar usuario
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            name="user"
            placeholder="@usuario"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
          />

          <button
            formAction={async (formData) => {
              "use server";

              const user = formData.get("user")?.toString().trim();

              if (!user) return;

              const { redirect } = await import("next/navigation");
              redirect(`/${encodeURIComponent(user)}`);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 active:scale-95"
          >
            Ir
          </button>
        </div>
      </form>
    </main>
  );
}