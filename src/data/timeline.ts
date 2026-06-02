export interface TimelineItem {
  time: string;
  event: string;
  venue: string;
}

export interface TimelineConfig {
  enabled: boolean;
  dayOne: TimelineItem[];
  dayTwo: TimelineItem[];
}

export const timelineConfig: TimelineConfig = {
  enabled: true, // Configurable flag to show/hide the timeline section
  dayOne: [
    {
      time: "09:00 AM - 10:00 AM",
      event: "Inauguration Ceremony & Lamp Lighting",
      venue: "Main Auditorium",
    },
    {
      time: "10:30 AM - 12:30 PM",
      event: "Keynote: The Future of Quantum & Local AI",
      venue: "Seminar Hall 1",
    },
    {
      time: "11:00 AM - Onwards",
      event: "Avinyā Hackathon Commences (24 Hrs)",
      venue: "Computing Lab 4",
    },
    {
      time: "01:30 PM - 04:30 PM",
      event: "RoboCombat 6.0: Qualifying Rounds",
      venue: "Main Campus Arena",
    },
    {
      time: "02:00 PM - 05:00 PM",
      event: "Web3 & Smart Contracts Workshop",
      venue: "Technology Center Lab",
    },
  ],
  dayTwo: [
    {
      time: "09:30 AM - 12:00 PM",
      event: "Autonomous Maze Solver Competition",
      venue: "Robotics Arena",
    },
    {
      time: "11:00 AM - Onwards",
      event: "Valorant Arena: Finals & Live Cast",
      venue: "Main Auditorium Screen",
    },
    {
      time: "02:00 PM - 04:00 PM",
      event: "Hackathon Projects Showcase & Demos",
      venue: "Seminar Hall 2",
    },
    {
      time: "04:30 PM - 05:30 PM",
      event: "Closing Ceremony & Prize Distribution",
      venue: "Main Auditorium",
    },
  ],
};
