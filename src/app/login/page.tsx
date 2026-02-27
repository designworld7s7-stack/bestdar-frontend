'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useParams } from 'next/navigation'; // أضفنا useParams [cite: 2026-02-27]

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams(); // لجلب اللغة من الرابط [cite: 2026-02-27]
  const lang = params.lang as string || 'en'; // التأكد من وجود اللغة [cite: 2026-02-27]
  const isAr = lang === 'ar';
  
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(isAr ? "خطأ" : "Error");
  } else {
    // ✅ التعديل: التوجه للمسار العام في الجذر [cite: 2026-02-27]
    router.push('/admin'); 
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-[#12AD65] tracking-tighter mb-2">BEST DAR</h1>
          <p className="text-gray-400 text-sm">
            {isAr ? "مركز التحكم في الإدارة" : "Admin Control Center"}
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder={isAr ? "البريد الإلكتروني" : "Email"} 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#12AD65] transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder={isAr ? "كلمة المرور" : "Password"} 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#12AD65] transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            disabled={loading}
            className="w-full bg-[#12AD65] text-white py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            {loading ? (isAr ? "جاري التحقق..." : "Checking...") : (isAr ? "دخول للوحة التحكم" : "Login to Dashboard")}
          </button>
        </form>
      </div>
    </div>
  );
}