import ProtectedRoute from '@/components/ProtectedRoute';

export default function InvestorClubPage() {
  return (
    <ProtectedRoute requireInvestor>
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="mx-auto max-w-4xl bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">Investor Club</h1>
          <p className="text-gray-600 mb-4">
            Welcome to the Investor Club — exclusive content for verified investors.
          </p>

          <section className="mt-4">
            <h2 className="text-lg font-semibold">Exclusive Insights</h2>
            <p className="text-gray-700 mt-2">This content is only visible to investor members.</p>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
