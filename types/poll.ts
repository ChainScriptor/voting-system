export interface Poll {
    id: string;
    title: string;
    description: string;
    options: PollOption[];
    candidates: Candidate[];
    targeting: Targeting;
    dateRange: {
      startDate: Date;
      endDate: Date;
    };
    createdAt: Date;
    isActive: boolean;
  }
  
  export interface PollOption {
    id: string;
    text: string;
  }
  
  export interface Candidate {
    id: string;
    name: string;
    position?: string;
    imageUrl?: string;
  }
  
  export interface Targeting {
    ageRanges?: string[];
    gender?: string[];
    locations?: string[];
    occupation?: string[];
    education?: string[];
    maritalStatus?: string[];
    income?: string[];
    interests?: string[];
    politicalViews?: string[];
    socialPlatforms?: string[];
    roles?: string[];
  }
  