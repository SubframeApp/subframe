import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Image
        src="subframe-logo.svg"
        width={112}
        height={20}
        alt="Subframe logo"
      />

      <div className="flex flex-col gap-1 mt-20">
        <div className="relative mx-auto max-w-4xl gap-12 px-6 lg:px-8">
          <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl sm:leading-[4.25rem]">
            Welcome to your Subframe Next.js Starter Kit
          </h1>
        </div>
        <div className="relative mx-auto max-w-2xl gap-12 px-6 lg:px-8">
          <div className="mt-6 text-lg text-base sm:text-lg text-center max-w-">
            Use this project to kickstart Subframe. It includes configuration
            files, dependencies you will need, and a clean slate for getting
            started.
          </div>
        </div>
      </div>

      <div className="flex gap-2 max-w-md mt-12 gap-4">
        <a
          className="rounded-lg bg-slate-950 text-white px-4 py-2 text-center"
          href="https://docs.subframe.com/installation"
          target="_blank"
        >
          Install Subframe
        </a>

        <a
          className="rounded-lg text-slate-950 px-4 py-2 text-center border border-slate-300"
          href="https://www.loom.com/embed/6b6a31569e1540d7a69a18b8620bf51a"
          target="_blank"
        >
          See how it works
        </a>
      </div>
    </main>
  );
}
