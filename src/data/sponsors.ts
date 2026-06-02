export interface Sponsor {
  name: string;
  logo: string;
  description: string;
  website: string;
  tier: "Title" | "Gold" | "Silver" | "Partner";
}

export const collaborators: Sponsor[] = [
  {
    name: "Aether Technologies",
    logo: "Zap",
    description: "Empowering the next generation of cloud and quantum computing infrastructures.",
    website: "https://example.com",
    tier: "Title",
  },
  {
    name: "Vertex Labs",
    logo: "Cpu",
    description: "Pioneering AI research and localized machine learning operations.",
    website: "https://example.com",
    tier: "Gold",
  },
  {
    name: "DecentraCorp",
    logo: "Layers",
    description: "Decentralized database systems and secure cryptography solutions.",
    website: "https://example.com",
    tier: "Gold",
  },
  {
    name: "Helix BioSystems",
    logo: "Activity",
    description: "Integrating computational algorithms with molecular biology.",
    website: "https://example.com",
    tier: "Silver",
  },
  {
    name: "Novus Ventures",
    logo: "TrendingUp",
    description: "Supporting high-impact student startups and technical innovations.",
    website: "https://example.com",
    tier: "Silver",
  },
  {
    name: "EduSphere",
    logo: "Globe",
    description: "Bridging the gap between academic theory and active tech industries.",
    website: "https://example.com",
    tier: "Partner",
  },
];
