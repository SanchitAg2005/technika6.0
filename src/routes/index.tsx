import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { CampusReveal } from "@/components/CampusReveal";
import { Collaborations } from "@/components/Collaborations";
import { WhyParticipate } from "@/components/WhyParticipate";
import { EventsList } from "@/components/EventsList";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Organisers } from "@/components/Organisers";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Technica 6.0 (Avinya) — Innovate. Collaborate. Elevate." },
      {
        name: "description",
        content:
          "Technica 6.0 (Avinya) is our annual tech fest bringing together bright minds to build, compete, and innovate with purpose and harmony.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;500;600&family=Tiro+Devanagari+Sanskrit&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <CampusReveal />
      <Collaborations />
      <WhyParticipate />
      <EventsList />
      <Timeline />
      <Gallery />
      <Organisers />
      <Contact />
    </>
  );
}
