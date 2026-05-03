import Image from "next/image";

const QUOTE_ICON = "/team_images/quote1.png";

const LEADERS = [
  {
    name: "Pankaj Jain",
    role: "CEO, Algebrik AI",
    imageAlt: "Pankaj Jain",
    image: "/team_images/pj.png",
    quote:
      "Lending volume shouldn't be a manual burden; we're helping CUs turn 2025's record 31.5% income recovery into an AI-native engine for safe, 10x growth.",
  },
  {
    name: "Andrea Silvers",
    role: "VP – Business Development",
    imageAlt: "Andrea Silvers",
    image: "/team_images/andreaS.png",
    quote:
      "Lending volume shouldn't be a manual burden; we're helping CUs turn 2025's record 31.5% income recovery into an AI-native engine for safe, 10x growth.",
  },
  {
    name: "Jeremy Carcich",
    role: "RVP – Business Development",
    imageAlt: "Jeremy Carcich",
    image: "/team_images/JeremyC.png",
    quote:
      "While 74% of the industry remains tethered to manual workflows, we are equipping the forward-thinking few with AI to deliver the instant outcomes members now demand.",
  },
] as const;

export default function Solr26LeadersSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h2 className="mb-10 text-3xl font-bold text-center leading-tight text-[#1f4f95] md:mb-14 md:text-4xl">
          What Leaders Are Saying
        </h2>

        <div className="grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {LEADERS.map((leader) => (
            <figure
              key={leader.name}
              className="group relative isolate min-h-[420px] overflow-hidden rounded-2xl shadow-md md:min-h-[460px] md:rounded-[22px]"
            >
              <Image
                src={leader.image}
                alt={leader.imageAlt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
                aria-hidden
              />

              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-7">
                <Image
                  src={QUOTE_ICON}
                  alt=""
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] opacity-95"
                />
                <blockquote className="text-[16px] font-medium leading-relaxed text-white md:text-base">
                  {leader.quote}
                </blockquote>
                <div className="pt-1 flex text-white">
                  <span className="block text-base min-w-max font-semibold md:text-[16px]">
                    {leader.name}
                  </span>
                  <span className="mt-0.5 block min-w-max text-sm font-semibold text-white/90 md:text-[16px]">
                    {leader.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
