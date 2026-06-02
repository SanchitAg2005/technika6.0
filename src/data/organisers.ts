export interface OrganiserMember {
  name: string;
  designation: string;
  image: string; // URL, asset import, or initials-based placeholder fallback
}

export interface OrganisersConfig {
  convenors: OrganiserMember[];
  faculty: OrganiserMember[];
  core: OrganiserMember[];
  technical: OrganiserMember[];
}

export const organisers: OrganisersConfig = {
  convenors: [
    {
      name: "Dr. Aravind Swaminathan",
      designation: "General Convenor, Technica 6.0",
      image: "AS",
    },
    {
      name: "Prof. Mira Sen",
      designation: "Co-Convenor & Student Welfare Dean",
      image: "MS",
    },
  ],
  faculty: [
    {
      name: "Dr. Rajesh K. Mehta",
      designation: "Faculty Advisor, CSE Department",
      image: "RM",
    },
    {
      name: "Dr. Elena Gilbert",
      designation: "Faculty Coordinator, Tech Club",
      image: "EG",
    },
    {
      name: "Prof. Vikram Malhotra",
      designation: "Robotics Labs Supervisor",
      image: "VM",
    },
  ],
  core: [
    {
      name: "Rohan Malhotra",
      designation: "Student President, Tech Association",
      image: "RO",
    },
    {
      name: "Anjali K. Rao",
      designation: "Vice President & Operations Head",
      image: "AR",
    },
    {
      name: "Dhruv Sharma",
      designation: "Treasurer & Sponsor Relations",
      image: "DS",
    },
    {
      name: "Sanya Kapoor",
      designation: "Public Relations & Media Manager",
      image: "SK",
    },
  ],
  technical: [
    {
      name: "Tushar Gupta",
      designation: "Technical Lead & Web Architecture",
      image: "TG",
    },
    {
      name: "Pooja V. Nair",
      designation: "App Dev Lead & Coding Coordinator",
      image: "PN",
    },
    {
      name: "Sagar Verma",
      designation: "Cybersecurity & CTF Host",
      image: "SV",
    },
    {
      name: "Nikhil Joshi",
      designation: "Hardware Systems & IoT Lead",
      image: "NJ",
    },
  ],
};
