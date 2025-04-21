// Mock authentication service for academic users
interface AcademicUser {
    userId: string;
    fullName: string;
    academicId: string;
    department: string;
    university: string;
    hasVoted: boolean;
    voteHash: string | null;
    isWeb3User: boolean;
    isVerified: boolean;
    verificationStatus?: 'pending' | 'approved' | 'rejected';
  }
  
  // Δημιουργία λιστών για πανεπιστήμια και τμήματα
  export const universities = [
    "Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών",
    "Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",
    "Πανεπιστήμιο Πατρών",
    "Πανεπιστήμιο Κρήτης",
    "Πολυτεχνείο Κρήτης",
    "Οικονομικό Πανεπιστήμιο Αθηνών",
    "Πάντειο Πανεπιστήμιο",
    "Πανεπιστήμιο Πειραιώς",
    "Πανεπιστήμιο Μακεδονίας",
    "Πανεπιστήμιο Ιωαννίνων",
    "Πανεπιστήμιο Θεσσαλίας"
  ];
  
  export const departments = [
    "Πληροφορικής και Τηλεπικοινωνιών",
    "Φυσικής",
    "Χημείας",
    "Μαθηματικών",
    "Βιολογίας",
    "Ιατρικής",
    "Νομικής",
    "Φιλολογίας",
    "Ιστορίας και Αρχαιολογίας",
    "Οικονομικών Επιστημών",
    "Πολιτικών Επιστημών",
    "Ψυχολογίας",
    "Κοινωνιολογίας",
    "Επιστήμης Υπολογιστών",
    "Μηχανικών Η/Υ και Πληροφορικής"
  ];
  
  // Sample data
  const sampleAcademicUser: AcademicUser = {
    userId: 'test-user-123',
    fullName: 'Δοκιμαστικός Χρήστης',
    academicId: 'AM2023001',
    department: 'Πληροφορικής και Τηλεπικοινωνιών',
    university: 'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών',
    hasVoted: false,
    voteHash: null,
    isWeb3User: false,
    isVerified: true,
    verificationStatus: 'approved'
  };
  
  // Define the return type for login function
  interface LoginResponse {
    success: boolean;
    user: AcademicUser;
    userId: string;
    fullName: string;
    academicId: string;
    hasVoted: boolean;
    voteHash: string | null;
    isVerified: boolean;
    error?: string;
  }
  
  // Mock service
  export const mockAcademicAuth = {
    // Check authentication status
    checkAuthStatus: () => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      return {
        isAuthenticated: !!userData,
        userData
      };
    },
  
    // Mock login function
    login: (username: string, password: string, university?: string, department?: string): LoginResponse => {
      // For testing, any credentials will be accepted
      const user = { ...sampleAcademicUser };
      
      // Αν παρέχονται πανεπιστήμιο και τμήμα, ενημερώνουμε τα δεδομένα του χρήστη
      if (university) {
        user.university = university;
      }
      if (department) {
        user.department = department;
      }
      
      localStorage.setItem('academicUser', JSON.stringify(user));
      return { 
        success: true, 
        user,
        userId: user.userId,
        fullName: user.fullName,
        academicId: user.academicId,
        hasVoted: user.hasVoted,
        voteHash: user.voteHash,
        isVerified: user.isVerified
      };
    },
  
    // Mock registration function
    register: (userData: { 
      fullName: string, 
      academicId: string, 
      department: string, 
      university: string, 
      password: string 
    }) => {
      const newUser: AcademicUser = {
        userId: `user-${Date.now()}`,
        fullName: userData.fullName,
        academicId: userData.academicId,
        department: userData.department,
        university: userData.university,
        hasVoted: false,
        voteHash: null,
        isWeb3User: false,
        isVerified: false
      };
      
      localStorage.setItem('academicUser', JSON.stringify(newUser));
      return { success: true, user: newUser };
    },
  
    // Mock logout function
    logout: () => {
      localStorage.removeItem('academicUser');
      return { success: true };
    },
  
    // Set a user as verified (for testing)
    setAsVerified: () => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      if (userData) {
        userData.isVerified = true;
        userData.verificationStatus = 'approved';
        localStorage.setItem('academicUser', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: 'No logged in user' };
    },
  
    // Mock login as the pre-verified test user
    loginAsVerifiedUser: () => {
      localStorage.setItem('academicUser', JSON.stringify(sampleAcademicUser));
      return { success: true, user: sampleAcademicUser };
    },
    
    // Update vote status for a user
    updateVoteStatus: (userId: string, hasVoted: boolean, voteHash?: string) => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      if (userData && userData.userId === userId) {
        userData.hasVoted = hasVoted;
        if (voteHash) {
          userData.voteHash = voteHash;
        }
        localStorage.setItem('academicUser', JSON.stringify(userData));
        return true;
      }
      return false;
    }
  };
  
  // Utility functions for academic voting
  export const academicVotingUtils = {
    // Record a vote for an academic user
    recordVote: (candidateId: string, electionId?: string) => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      if (userData) {
        // Check if user has already voted
        if (userData.hasVoted) {
          return { success: false, error: 'Έχετε ήδη ψηφίσει. Δεν επιτρέπεται η διπλή ψήφος.' };
        }
        
        userData.hasVoted = true;
        const voteHash = `vote-${candidateId}-${Date.now()}`;
        userData.voteHash = voteHash;
        
        // Store which elections the user has voted in
        if (!userData.votedElections) {
          userData.votedElections = [];
        }
        
        if (electionId) {
          userData.votedElections.push({
            electionId,
            timestamp: Date.now(),
            voteHash
          });
        }
        
        localStorage.setItem('academicUser', JSON.stringify(userData));
        return { success: true, voteHash: userData.voteHash };
      }
      return { success: false, error: 'No logged in user' };
    },
  
    // Check if user has voted
    hasVoted: () => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      return userData ? userData.hasVoted : false;
    },
  
    // Check if user has voted in a specific election
    hasVotedInElection: (electionId: string) => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      if (!userData || !userData.votedElections) return false;
      
      return userData.votedElections.some((vote: any) => vote.electionId === electionId);
    },
  
    // Get vote hash for a specific election
    getVoteHashForElection: (electionId: string) => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      if (!userData || !userData.votedElections) return null;
      
      const vote = userData.votedElections.find((v: any) => v.electionId === electionId);
      return vote ? vote.voteHash : null;
    },
  
    // Get vote receipt
    getVoteReceipt: () => {
      const userData = JSON.parse(localStorage.getItem('academicUser') || 'null');
      return userData ? userData.voteHash : null;
    }
  };