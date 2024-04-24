"use client"

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export const ProtectRouters = ({ children }) => {
  const { data: session } = useSession();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is not authenticated or does not exist
    if (!user) {
      // Redirect to sign-in page
      router.push('/');
    }
  }, [session, user, router.pathname]); // Watch for changes in session, user, and pathname

  // Return children only if both session and user exist
  return session && user ? children : null;
};
