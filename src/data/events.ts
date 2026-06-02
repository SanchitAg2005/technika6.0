export interface EventConfig {
  id: string;
  name: string;
  description: string;
  category: "Coding" | "Robotics" | "Gaming" | "Workshops";
  image: string; // image path or placeholder name
}

export const events: EventConfig[] = [
  {
    id: "hackathon",
    name: "Avinyā Hackathon",
    description: "A 24-hour intense coding hackathon focusing on AI-driven local solutions. Build, deploy, and pitch your prototypes to industry veterans.",
    category: "Coding",
    image: "Code2",
  },
  {
    id: "robo-war",
    name: "RoboCombat 6.0",
    description: "The ultimate clash of metallic beasts. Design, construct, and pilot your combat robots to claim supremacy in the battle arena.",
    category: "Robotics",
    image: "Bot",
  },
  {
    id: "valorant-arena",
    name: "Valorant Championship",
    description: "Gather your agents and step into the high-stakes tactical shooter arena. Compete in a double-elimination tournament for glory.",
    category: "Gaming",
    image: "Gamepad2",
  },
  {
    id: "web3-workshop",
    name: "Web3 & Smart Contracts",
    description: "Hands-on developer-led workshop on building decentralized apps (dApps) on Ethereum using Solidity and modern tooling.",
    category: "Workshops",
    image: "Lightbulb",
  },
  {
    id: "ui-ux-design",
    name: "Design-a-Thon",
    description: "Bring your wireframes and creative juices. Solve complex usability problems under time constraints using modern design tokens.",
    category: "Coding",
    image: "Palette",
  },
  {
    id: "maze-solver",
    name: "Autonomous Maze Solver",
    description: "Program an autonomous micro-mouse to navigate and map a complex maze in the shortest time possible without human input.",
    category: "Robotics",
    image: "GitFork",
  },
];
