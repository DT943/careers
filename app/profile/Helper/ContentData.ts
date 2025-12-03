export type ContactInfo = {
  fullName: string;
  location: string;
  birthDate: string;
  email: string;
  mobilePhone: string;
  address: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
};

export type Attachment = {
  id: number;
  name: string;
  type: string;
};

export type TimelineItem = {
  id: number;
  title: string;
  companyOrSchool: string;
  period: string;
  location: string;
  description: string;
};

export const contactInfo: ContactInfo = {
  fullName: "Mouayad Hawari",
  location: "Damascus, Syria",
  birthDate: "21-3-1995",
  email: "mouayadhawari@gmail.com",
  mobilePhone: "+963 935679806",
  address: "Damascus, Syria",
  portfolioUrl: "https://dribbble.com/Mouayad-Hawari",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
};

export const attachments: Attachment[] = [
  {
    id: 1,
    name: "Mouayad C.V UI UX.pdf",
    type: "Resume",
  },
];

export const workHistory: TimelineItem[] = [
  {
    id: 1,
    title: "Senior Backend Developer",
    companyOrSchool: "SkyHigh Airlines",
    period: "15-12-2020 – Present",
    location: "Damascus, Syria",
    description:
      "Led development of scalable microservices architecture, managed a team of 5 developers, implemented CI/CD pipelines, and reduced system response time by 40% through optimization.",
  },
  {
    id: 2,
    title: "Customer Service Agent",
    companyOrSchool: "Global Airways",
    period: "2018 – 2020",
    location: "Damascus, Syria",
    description: "Handled customer inquiries and ticketing operations.",
  },
];

export const educationHistory: TimelineItem[] = [
  {
    id: 1,
    title: "Bachelor of Science in Aviation Management",
    companyOrSchool: "Damascus University",
    period: "15-12-2020 – 15-2-2024",
    location: "Damascus, Syria",
    description: "78/100",
  },
];
