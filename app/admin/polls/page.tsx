"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Next.js Link
import { format } from "date-fns";
import { 
  BarChart, 
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Filter
} from "lucide-react";
import DashboardLayout from "@/app/admin/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Poll } from "@/types/poll";
import pollService from "@/services/pollService";
import { useToast } from "@/components/ui/use-toast";

const PollsList = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await pollService.getPolls();
        setPolls(data);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
        toast({
          title: "Error",
          description: "Failed to load polls. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolls();
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ψηφοφορία?")) {
      try {
        await pollService.deletePoll(id);
        setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== id));
        toast({
          title: "Επιτυχία",
          description: "Η ψηφοφορία διαγράφηκε επιτυχώς.",
        });
      } catch (error) {
        console.error("Αποτυχία διαγραφής της ψηφοφορίας:", error);
        toast({
          title: "Error",
          description: "Αποτυχία διαφραγής της ψηφοφορίας. Παρακαλώ δοκιμάστε ξανά.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredPolls = polls.filter((poll) => 
    poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poll.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPollStatusBadge = (poll: Poll) => {
    const now = new Date();

    if (now < new Date(poll.dateRange.startDate)) {
      return <Badge variant="secondary">Προγραμματίστηκε</Badge>;
    } else if (now > new Date(poll.dateRange.endDate)) {
      return <Badge variant="outline">Τέλειωσε</Badge>;
    } else {
      return <Badge className="bg-green-500">Ενεργή</Badge>;
    }
  };

  const renderTargetingBadges = (poll: Poll) => {
    if (poll.targeting.roles && poll.targeting.roles.length > 0) {
      return poll.targeting.roles.map((role) => (
        <Badge key={role} variant="outline" className="mr-1">
          {role}
        </Badge>
      ));
    }

    if (poll.targeting.locations && poll.targeting.locations.length > 0) {
      return poll.targeting.locations.map((location) => (
        <Badge key={location} variant="outline" className="mr-1">
          {location}
        </Badge>
      ));
    }

    return <Badge variant="outline">All</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ψηφοφορίες</h1>
            <p className="text-muted-foreground">Διαχειριστείτε τις ψηφοφορίες και τις επιλογές σας</p>
          </div>
          <Link href="/polls/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Δημιουργία Ψηφοφορίας
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Αναζήτηση ψηφοφοριών..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Φίλτρα
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-poll-purple"></div>
          </div>
        ) : (
          <>
            {filteredPolls.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Δεν βρέθηκαν ψηφοφορίες</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm ? "Δοκιμάστε διαφορετικούς όρους αναζήτησης" : "Δημιουργήστε την πρώτη σας ψηφοφορία"}
                </p>
                {!searchTerm && (
                  <Link href="/polls/create" className="mt-4">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Δημιουργία Ψηφοφορίας
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Τίτλος</TableHead>
                      <TableHead>Κατάσταση</TableHead>
                      <TableHead>Χρονικό Διάστημα</TableHead>
                      <TableHead>Στόχευση</TableHead>
                      <TableHead>Υποψήφιοι</TableHead>
                      <TableHead>Δημιουργήθηκε</TableHead>
                      <TableHead className="text-right">Ενέργειες</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPolls.map((poll) => (
                      <TableRow key={poll.id}>
                        <TableCell className="font-medium">
                          <div className="font-medium">{poll.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                            {poll.description}
                          </div>
                        </TableCell>
                        <TableCell>{getPollStatusBadge(poll)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {format(new Date(poll.dateRange.startDate), "MMM d, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            έως {format(new Date(poll.dateRange.endDate), "MMM d, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell>{renderTargetingBadges(poll)}</TableCell>
                        <TableCell>{poll.candidates.length}</TableCell>
                        <TableCell>
                          {format(new Date(poll.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/polls/${poll.id}/candidates`}>
                              <Button variant="ghost" size="sm">
                                <Users className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/polls/${poll.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(poll.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PollsList;
