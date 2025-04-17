
export interface Account {
  id: number;
  name: string;
  matchScore: number;
  status: "Target" | "Not Target";
  linkedinUrl?: string;
}

// Sample account data
export const accounts: Account[] = [
  {
    id: 1,
    name: "Microsoft",
    matchScore: 85,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/microsoft/"
  },
  {
    id: 2,
    name: "Google",
    matchScore: 92,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/google/"
  },
  {
    id: 3,
    name: "Amazon",
    matchScore: 78,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/amazon/"
  },
  {
    id: 4,
    name: "Apple",
    matchScore: 88,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/apple/"
  },
  {
    id: 5,
    name: "Facebook",
    matchScore: 75,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/facebook/"
  },
  {
    id: 6,
    name: "Netflix",
    matchScore: 82,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/netflix/"
  },
  {
    id: 7,
    name: "Tesla",
    matchScore: 90,
    status: "Target",
    linkedinUrl: "https://www.linkedin.com/company/tesla-motors/"
  },
  {
    id: 8,
    name: "IBM",
    matchScore: 65,
    status: "Not Target",
    linkedinUrl: "https://www.linkedin.com/company/ibm/"
  }
];
