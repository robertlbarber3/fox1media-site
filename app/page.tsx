export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">
          Fox 1 Media
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
          Automotive Media
          <span className="block text-gray-400">& Creative Branding</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
          High-impact automotive photography, video, and creative content built
          for brands, builders, and enthusiasts.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#portfolio"
            className="rounded-full border border-white px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gray-600 px-6 py-3 text-sm font-medium text-gray-200 transition hover:border-white"
          >
            Contact Me
          </a>
        </div>
      </section>

      <section
        id="portfolio"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Built to showcase your best work
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-8">
            <h3 className="mb-3 text-xl font-semibold">Automotive Photography</h3>
            <p className="text-gray-400">
              Rolling shots, static features, event coverage, and detail-focused
              creative imagery.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-8">
            <h3 className="mb-3 text-xl font-semibold">Video Content</h3>
            <p className="text-gray-400">
              Short-form social clips, cinematic edits, and branded content
              designed to get attention.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-8">
            <h3 className="mb-3 text-xl font-semibold">Merch & Media</h3>
            <p className="text-gray-400">
              Stickers, branded products, and creative media assets that help
              your brand stand out.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 pb-24"
      >
        <div className="rounded-3xl border border-gray-800 bg-zinc-950 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Ready to build something clean and fast
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Booking shoots, building brand visuals, and creating media that
            feels sharp, modern, and memorable.
          </p>
          <a
            href="mailto:hello@fox1media.com"
            className="mt-8 inline-block rounded-full border border-white px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            hello@fox1media.com
          </a>
        </div>
      </section>
    </main>
  );
}