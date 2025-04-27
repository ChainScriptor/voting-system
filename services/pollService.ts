import { Poll, Candidate, Targeting } from '@/types/poll';
import { v4 as uuidv4 } from 'uuid';

// In-memory polls storage
let polls: Poll[] = [];

// Helper function to generate a random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Initialize with sample data
const initializePolls = (): void => {
  if (polls.length === 0) {
    const now = new Date();
    const oneWeekFromNow = new Date(now);
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    const twoWeeksFromNow = new Date(now);
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    
    polls = [
      {
        id: uuidv4(),
        title: 'Company Retreat Location',
        description: 'Help us decide where to have our annual company retreat this year.',
        options: [
          { id: uuidv4(), text: 'Mountain Resort' },
          { id: uuidv4(), text: 'Beach Destination' },
          { id: uuidv4(), text: 'Urban Hotel' },
          { id: uuidv4(), text: 'Countryside Retreat' },
        ],
        candidates: [],
        targeting: {
          ageRanges: ['All Ages'],
          gender: ['All'],
          locations: ['All Locations'],
          occupation: ['All'],
          education: ['All'],
          maritalStatus: ['All'],
          income: ['All'],
          interests: ['All'],
          politicalViews: ['All'],
          socialPlatforms: ['All'],
          roles: ['All'] // Added roles
        },
        dateRange: {
          startDate: now,
          endDate: oneWeekFromNow
        },
        createdAt: randomDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), now),
        isActive: true
      },
      {
        id: uuidv4(),
        title: 'New Office Equipment',
        description: 'Vote on what new equipment we should purchase for the office.',
        options: [
          { id: uuidv4(), text: 'Standing Desks' },
          { id: uuidv4(), text: 'Ergonomic Chairs' },
          { id: uuidv4(), text: 'New Coffee Machine' },
          { id: uuidv4(), text: 'Office Plants' },
        ],
        candidates: [],
        targeting: {
          ageRanges: ['All Ages'],
          gender: ['All'],
          locations: ['Headquarters'],
          occupation: ['Office Staff'],
          education: ['All'],
          maritalStatus: ['All'],
          income: ['All'],
          interests: ['All'],
          politicalViews: ['All'],
          socialPlatforms: ['All'],
          roles: ['Office Staff'] // Added roles
        },
        dateRange: {
          startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
          endDate: twoWeeksFromNow
        },
        createdAt: randomDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), now),
        isActive: true
      }
    ];
  }
};

// Initialize sample data
initializePolls();

const pollService = {
  // Get all polls
  getPolls: (): Promise<Poll[]> => {
    return Promise.resolve([...polls]);
  },

  // Get a specific poll by ID
  getPoll: (id: string): Promise<Poll | undefined> => {
    const poll = polls.find(p => p.id === id);
    return Promise.resolve(poll);
  },

  // Create a new poll
  createPoll: (pollData: Omit<Poll, 'id' | 'createdAt'>): Promise<Poll> => {
    const newPoll: Poll = {
      ...pollData,
      id: uuidv4(),
      createdAt: new Date()
    };

    polls.push(newPoll);
    return Promise.resolve(newPoll);
  },

  // Update an existing poll
  updatePoll: (id: string, pollData: Partial<Omit<Poll, 'id' | 'createdAt'>>): Promise<Poll | undefined> => {
    const index = polls.findIndex(p => p.id === id);

    if (index !== -1) {
      polls[index] = {
        ...polls[index],
        ...pollData
      };
      return Promise.resolve(polls[index]);
    }

    return Promise.resolve(undefined);
  },

  // Delete a poll
  deletePoll: (id: string): Promise<boolean> => {
    const initialLength = polls.length;
    polls = polls.filter(p => p.id !== id);
    return Promise.resolve(initialLength !== polls.length);
  },

  // Add a candidate to a poll
  addCandidate: (pollId: string, candidate: Omit<Candidate, 'id'>): Promise<Candidate | undefined> => {
    const poll = polls.find(p => p.id === pollId);
    
    if (poll) {
      const newCandidate: Candidate = {
        ...candidate,
        id: uuidv4()
      };
      
      poll.candidates.push(newCandidate);
      return Promise.resolve(newCandidate);
    }
    
    return Promise.resolve(undefined);
  },

  // Remove a candidate from a poll
  removeCandidate: (pollId: string, candidateId: string): Promise<boolean> => {
    const poll = polls.find(p => p.id === pollId);
    
    if (poll) {
      const initialLength = poll.candidates.length;
      poll.candidates = poll.candidates.filter(c => c.id !== candidateId);
      return Promise.resolve(initialLength !== poll.candidates.length);
    }
    
    return Promise.resolve(false);
  },

  // Update poll targeting criteria
  updateTargeting: (pollId: string, targeting: Targeting): Promise<Targeting | undefined> => {
    const poll = polls.find(p => p.id === pollId);
    
    if (poll) {
      poll.targeting = targeting;
      return Promise.resolve(poll.targeting);
    }
    
    return Promise.resolve(undefined);
  }
};

export default pollService;
