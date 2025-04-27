'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { User, UserPlus } from 'lucide-react';
import DashboardLayout from '@/app/admin/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import pollService from '@/services/pollService';
import Link from 'next/link';
import Image from 'next/image';

// Define the type for the candidate with poll info
type CandidateWithPoll = {
  id: string;
  name: string;
  position?: string;
  imageUrl?: string;
  pollId: string;
  pollTitle: string;
};

export default function CandidatesList() {
  const router = useRouter();
  
  // Fetch polls using react-query
  const { data: polls, isLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: pollService.getPolls
  });

  // Combine all candidates from all polls
  const allCandidates: CandidateWithPoll[] | undefined = polls?.reduce<CandidateWithPoll[]>((acc, poll) => {
    const pollCandidates = poll.candidates.map(candidate => ({
      ...candidate,
      pollId: poll.id,
      pollTitle: poll.title
    }));
    return [...acc, ...pollCandidates];
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-poll-purple"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Υποψήφιοι</h1>
          <Button onClick={() => router.push('/admin/polls')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Προσθήκη Υποψηφίου
          </Button>
        </div>

        {(!allCandidates || allCandidates.length === 0) ? (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Δεν υπάρχουν υποψήφιοι</h3>
            <p className="text-muted-foreground mt-1">
              Προσθέστε υποψηφίους σε μια ψηφοφορία για να εμφανιστούν εδώ
            </p>
            <Button onClick={() => router.push('/admin/polls')} className="mt-6">
              Προσθήκη Πρώτου Υποψηφίου
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCandidates.map((candidate) => (
              <Card key={`${candidate.id}-${candidate.pollId}`} className="overflow-hidden">
                <div className="relative w-full h-48">
                  {candidate.imageUrl ? (
                    <Image
                      src={candidate.imageUrl}
                      alt={candidate.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{candidate.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.position && (
                    <p className="text-sm text-muted-foreground mb-2">{candidate.position}</p>
                  )}
                  <Link href={`/admin/polls/${candidate.pollId}/candidates`}>
                    <Button variant="outline" className="w-full">
                      Προβολή Ψηφοφορίας
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
