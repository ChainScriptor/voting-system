import { checkRole } from '@/utils/roles';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/app/admin/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Ελέγχουμε αν ο χρήστης έχει τον ρόλο του admin
  const isAdmin = await checkRole('voting_admin');
  
  // Αν δεν είναι admin, τον ανακατευθύνουμε στην αρχική σελίδα
  if (!isAdmin) {
    redirect('/');
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Πίνακας Διαχείρισης</h1>
          <p className="text-muted-foreground">Καλώς ήρθατε στον πίνακα διαχείρισης ψηφοφοριών</p>
        </div>

        {/* Cards με στατιστικά στοιχεία */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[ 
            { title: "Σύνολο Ψηφοφοριών", value: "12", icon: <BarChart className="w-5 h-5 text-muted-foreground" />, subtitle: "+2 από τον προηγούμενο μήνα" },
            { title: "Ενεργές Ψηφοφορίες", value: "4", icon: <CheckCircle className="w-5 h-5 text-muted-foreground" />, subtitle: "+1 από τον προηγούμενο μήνα" },
            { title: "Σύνολο Υποψηφίων", value: "32", icon: <Users className="w-5 h-5 text-muted-foreground" />, subtitle: "+5 από τον προηγούμενο μήνα" },
            { title: "Προγραμματισμένες Ψηφοφορίες", value: "3", icon: <Calendar className="w-5 h-5 text-muted-foreground" />, subtitle: "Καμία αλλαγή" },
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Γρήγοροι σύνδεσμοι */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[ 
            { href: "/polls/create", title: "Δημιουργία Νέας Ψηφοφορίας", description: "Δημιουργήστε μια νέα ψηφοφορία με επιλογές και στόχευση", text: "Γρήγορος οδηγός δημιουργίας για πλήρεις ψηφοφορίες με όλες τις απαραίτητες ρυθμίσεις." },
            { href: "/polls", title: "Διαχείριση Ψηφοφοριών", description: "Δείτε και διαχειριστείτε όλες τις υπάρχουσες ψηφοφορίες", text: "Επεξεργαστείτε, διαγράψτε και παρακολουθήστε την κατάσταση όλων των ψηφοφοριών σας." },
            { href: "/candidates", title: "Διαχείριση Υποψηφίων", description: "Προσθέστε ή αφαιρέστε υποψηφίους από ψηφοφορίες", text: "Διαχειριστείτε τα προφίλ των υποψηφίων και αναθέστε τους σε σχετικές ψηφοφορίες." },
          ].map((link, index) => (
            <Card key={index} className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <Link href={link.href} className="block p-4">
                <CardHeader>
                  <CardTitle className="text-poll-purple group-hover:text-purple-700 transition-colors">
                    {link.title}
                  </CardTitle>
                  <CardDescription>
                    {link.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {link.text}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
