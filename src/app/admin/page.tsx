export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Projects</p>
          <h3 className="text-3xl font-bold mt-1">24</h3>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">New Leads (24h)</p>
          <h3 className="text-3xl font-bold mt-1 text-[#12AD65]">12</h3>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Active Users</p>
          <h3 className="text-3xl font-bold mt-1">156</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-4">Welcome back!</h3>
        <p className="text-gray-600">
          From here you can manage all your website dynamic content, translate sections, and track leads.
        </p>
      </div>
    </div>
  );
}