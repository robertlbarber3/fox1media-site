export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Welcome to
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
          Fox 2 Media
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
          Creative media, photography, branding, and digital content built to
          help businesses stand out.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#services"
            className="rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90"
          >
            View Services
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </section>

      <section id="services" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Photography</h3>
              <p className="text-gray-600">
                Professional photo services for automotive, lifestyle, branding,
                and events.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Content Creation</h3>
              <p className="text-gray-600">
                High-quality visual and promotional content for social media,
                websites, and marketing campaigns.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Brand Support</h3>
              <p className="text-gray-600">
                Design, creative direction, and media solutions to help your
                brand grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Why Choose Fox 1 Media?</h2>
          <p className="text-lg text-gray-600">
            We focus on clean visuals, strong branding, and creative media that
            makes an impact. Whether you need content for your business, your
            products, or your online presence, we help bring your vision to
            life.
          </p>
        </div>
      </section>

      <section id="contact" className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Let’s Work Together</h2>
          <p className="mb-8 text-lg text-gray-300">
            Ready to build your brand and create something great?
          </p>

          <a
            href="mailto:hello@fox1media.com"
            className="inline-block rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            Email Us
          </a>
        </div>
      </section>
    </main>
  );
}