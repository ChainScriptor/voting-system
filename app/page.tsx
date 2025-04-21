"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  LineChart,
  Vote,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;

  return (
    <div className="container mx-auto px-4">
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-blue-600 transition-transform duration-300 hover:translate-y-[-2px]">Σύγχρονη Πλατφόρμα</span>
              <span className="block transition-transform duration-300 hover:translate-y-[-2px]"> Ψηφοφορίας</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-prose mx-auto p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              Μια ασφαλής, διαφανής και προσβάσιμη πλατφόρμα για τη διεξαγωγή
              ψηφοφοριών. Συνδεθείτε ή εγγραφείτε για να συμμετάσχετε σε
              διαθέσιμες ψηφοφορίες.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
              <CardHeader>
                <Vote className="h-10 w-10 text-blue-600 mb-2 transition-transform duration-300 hover:scale-110" />
                <CardTitle className="text-slate-900 dark:text-white">Εύκολη Ψηφοφορία</CardTitle>
                <CardDescription>
                  Απλή και διαισθητική διεπαφή για την υποβολή της ψήφου σας
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Συμμετέχετε σε ψηφοφορίες με λίγα κλικ.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-purple-600 mb-2 transition-transform duration-300 hover:scale-110" />
                <CardTitle className="text-slate-900 dark:text-white">Επιλέξιμες Ψηφοφορίες</CardTitle>
                <CardDescription>
                  Δείτε μόνο τις ψηφοφορίες που σας αφορούν
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Φιλτράρισμα ανάλογα με το προφίλ σας.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
              <CardHeader>
                <LineChart className="h-10 w-10 text-green-600 mb-2 transition-transform duration-300 hover:scale-110" />
                <CardTitle className="text-slate-900 dark:text-white">Αποτελέσματα σε Πραγματικό Χρόνο</CardTitle>
                <CardDescription>
                  Παρακολουθήστε τα αποτελέσματα καθώς εξελίσσονται
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Με οπτικοποιήσεις και στατιστικά.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6 py-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Καλώς ήρθατε, {user.fullName}</h1>
            <p className="text-muted-foreground">
              Ο προσωπικός σας πίνακας ελέγχου ψηφοφοριών
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
              <CardHeader>
                <CardTitle>Ενεργές Ψηφοφορίες</CardTitle>
                <CardDescription>
                  Ψηφοφορίες στις οποίες μπορείτε να ψηφίσετε
                </CardDescription>
              </CardHeader>
              <CardContent className="h-36 flex items-center justify-center">
                <Link href="/elections" className="text-center">
                  <Vote className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Δείτε όλες τις διαθέσιμες ψηφοφορίες
                  </p>
                </Link>
              </CardContent>
              <CardFooter>
                <Link href="/elections" className="w-full">
                  <Button variant="outline" className="w-full transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                    Περιηγηθείτε στις Ψηφοφορίες
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
              <CardHeader>
                <CardTitle>Ιστορικό Ψηφοφοριών</CardTitle>
                <CardDescription>
                  Παρακολουθήστε τις προηγούμενες ψήφους σας
                </CardDescription>
              </CardHeader>
              <CardContent className="h-36 flex items-center justify-center">
                <Link href="/my-votes" className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mb-4 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Δείτε το πλήρες ιστορικό ψηφοφοριών σας
                  </p>
                </Link>
              </CardContent>
              <CardFooter>
                <Link href="/my-votes" className="w-full">
                  <Button variant="outline" className="w-full transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                    Δείτε το Ιστορικό
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {isAdmin && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Εργαλεία Διαχείρισης</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
                  <CardHeader>
                    <CardTitle>Διαχείριση Ψηφοφοριών</CardTitle>
                    <CardDescription>
                      Δημιουργήστε και διαμορφώστε ψηφοφορίες
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-36 flex items-center justify-center">
                    <Link href="/admin/elections" className="text-center">
                      <Vote className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Διαχείριση όλων των ψηφοφοριών
                      </p>
                    </Link>
                  </CardContent>
                  <CardFooter>
                    <Link href="/admin/elections" className="w-full">
                      <Button className="w-full transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                        Διαχείριση Ψηφοφοριών
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
                  <CardHeader>
                    <CardTitle>Πίνακας Ελέγχου Analytics</CardTitle>
                    <CardDescription>
                      Στατιστικά και οπτικοποιήσεις
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-36 flex items-center justify-center">
                    <Link href="/admin/dashboard" className="text-center">
                      <LineChart className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Πρόσβαση σε analytics εργαλείο
                      </p>
                    </Link>
                  </CardContent>
                  <CardFooter>
                    <Link href="/admin/dashboard" className="w-full">
                      <Button className="w-full transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                        Δείτε τον Πίνακα Ελέγχου
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
