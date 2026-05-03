import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-blue-50 to-white w-full">
        
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
          Manage Your Crafts <br />
          <span className="text-blue-600">the Smart Way</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          Craftora helps you organize, track, and grow your handmade business — all in one simple dashboard.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>

        {/* HERO IMAGE */}
        <div className="relative w-full max-w-5xl mx-auto">

          {/* Glow background (subtle premium effect) */}
          <div className="absolute inset-0 bg-blue-200/30 blur-3xl rounded-full -z-10"></div>

          {/* Desktop */}
          <Image
            src="/craftoraHeroImageDesktopView2.jpg"
            width={1200}
            height={800}
            className="hidden md:block w-full h-auto rounded-2xl shadow-2xl"
            alt="Craftora hero image desktop version"
            priority
          />

          {/* Mobile */}
          <Image
            src="/craftoraMobileImage.jpg"
            width={600}
            height={700}
            className="block md:hidden w-full h-auto rounded-2xl shadow-xl"
            alt="Craftora hero image mobile version"
            priority
          />
        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl w-full py-20 px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">
              Inventory Tracking
            </h3>
            <p className="text-gray-600 text-sm">
              Keep track of all your craft items in one place.
            </p>
          </div>

          <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">
              Easy Management
            </h3>
            <p className="text-gray-600 text-sm">
              Add, edit, and organize your products effortlessly.
            </p>
          </div>

          <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">
              Simple Dashboard
            </h3>
            <p className="text-gray-600 text-sm">
              Get a clear overview of your business at a glance.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}