import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voting System",
  description: "Voting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={
        {
          locale: "el",
          translations: {
            signIn: {
              start: {
                title: "Καλώς ήρθες!",
                subtitle: "Συνδέσου για να συνεχίσεις",
                actionText: "Σύνδεση",
              },
              alternativeMethods: {
                title: "Ή χρησιμοποίησε άλλον τρόπο",
                actionLink: "Εναλλακτική σύνδεση",
              },
              passwordResetLink: "Ξέχασες τον κωδικό σου;",
              noAccount: {
                title: "Δεν έχεις λογαριασμό;",
                actionLink: "Εγγράψου",
              },
            },
            signUp: {
              start: {
                title: "Δημιουργία λογαριασμού",
                subtitle: "Ξεκίνα με το email σου",
                actionText: "Εγγραφή",
              },
              loginLink: {
                title: "Έχεις ήδη λογαριασμό;",
                actionLink: "Σύνδεση",
              },
            },
            socialButtonsBlockButton: "Συνέχεια με {{provider|titleize}}",
            formFieldLabel__emailAddress: "Διεύθυνση Email",
            formFieldLabel__password: "Κωδικός",
            formFieldLabel__confirmPassword: "Επιβεβαίωση Κωδικού",
            formFieldLabel__username: "Όνομα χρήστη",
            formFieldLabel__firstName: "Όνομα",
            formFieldLabel__lastName: "Επώνυμο",
            formFieldInputPlaceholder__emailAddress: "π.χ. maria@example.com",
            formFieldInputPlaceholder__password: "Ο κωδικός σας",
            formFieldInputPlaceholder__confirmPassword: "Επαναλάβετε τον κωδικό",
            formFieldInputPlaceholder__firstName: "π.χ. Μαρία",
            formFieldInputPlaceholder__lastName: "π.χ. Παπαδοπούλου",
            formFieldInputPlaceholder__username: "π.χ. maria123",
            formButtonPrimary: "Συνέχεια",
            backButton: "Πίσω",
          },
        } as any
      }
    >
      <html lang="el">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
