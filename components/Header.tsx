"use client";
import { ClerkLoaded, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import Form from 'next/form';
import { ClipboardPlus } from 'lucide-react';

function Header() {
  const { user } = useUser();

  // Έλεγχος αν ο χρήστης είναι admin
  const isAdmin = user?.publicMetadata?.role === 'voting_admin';

  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
      <div className='flex w-full flex-wrap justify-between items-center'>

        {/* Logo */}
        <Link href='/' className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
          Ψηφοφορίες
        </Link>

        {/* Search bar (μόνο αν υπάρχει user) */}
        {user && (
          <Form
            action='/search'
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
          >
            <input
              type="text"
              name='query'
              placeholder='Αναζήτηση Ψηφοφορίας'
              className='bg-gray-100 text-gray-800 px-4 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:ring-opacity-50 border w-full max-w-4xl'
            />
          </Form>
        )}

        {/* Buttons */}
        <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
          <ClerkLoaded>

            {/* Διαχείριση Ψηφοφοριών - μόνο για admin */}
            {user && isAdmin && (
              <Link
                href="/admin"
                className='flex-1 relative flex justify-center
                           sm:justify-start sm:flex-none items-center space-x-2 
                           bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <ClipboardPlus className='w-6 h-6' />
                <span>Διαχείριση Ψηφοφοριών</span>
              </Link>
            )}

            {/* User info ή login/signup */}
            {user ? (
              <div className='flex items-center space-x-2'>
                <UserButton />
                <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>Καλωσήρθατε</p>
                  <p className='font-bold'>{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <div className='flex items-center space-x-2'>
                <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  <SignInButton mode="modal">Σύνδεση</SignInButton>
                </div>
                <div className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                  <SignUpButton mode="modal">Εγγραφή</SignUpButton>
                </div>
              </div>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
