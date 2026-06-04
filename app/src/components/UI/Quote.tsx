import { Caveat } from "next/font/google";

const hand = Caveat({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Quote() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-12 pt-3 text-center md:pt-20">
      <h1
        className={`${hand.className} max-w-3xl text-5xl leading-none text-zinc-900 md:text-7xl`}
      >
        Write, plan, share.
        <br />
        With AI at your side.
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-lg">
        Notion is the connected workspace where better,
        faster work happens.
      </p>
    </section>
  );
}