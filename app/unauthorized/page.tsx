// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold">⛔ Δεν έχεις πρόσβαση</h1>
        <p className="mt-4 text-lg">Αυτή η σελίδα είναι προσβάσιμη μόνο από admin χρήστες.</p>
      </div>
    );
  }
  