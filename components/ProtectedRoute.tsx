"use client";

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ProtectedRouteProps = {
  children: ReactNode;
  requireInvestor?: boolean;
};

export default function ProtectedRoute({ children, requireInvestor = false }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="w-full py-8 flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading…</div>
      </div>
    );
  }

  // If user is not present we are redirecting — render nothing.
  if (!user) return null;

  if (requireInvestor && !profile?.is_investor) {
    return (
      <div className="min-h-[200px] flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center bg-white border border-gray-100 rounded p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Investor access required</h2>
          <p className="text-sm text-gray-600 mb-4">
            This section is available to investor members. Upgrade to access investor features.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/investor-club" className="px-4 py-2 bg-indigo-600 text-white rounded">
              Go to Investor Club
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
