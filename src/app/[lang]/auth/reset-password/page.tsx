'use client';

import React, { useState } from 'react';
import RequestStep from './components/request-step';
import SuccessStep from './components/success-step';
import NewPasswordStep from './components/new-password-step';

export default function ResetPasswordPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [step, setStep] = useState<'request' | 'success' | 'new-password'>('request');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      {/* CARD: Smaller mobile padding and fixed width */}
      <div 
        style={{ maxWidth: '460px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-7 sm:p-12 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-500"
      >
        {step === 'request' && (
          <RequestStep isAr={isAr} onNext={(val) => { setEmail(val); setStep('success'); }} />
        )}
        {step === 'success' && (
          <SuccessStep isAr={isAr} email={email} onResend={() => console.log('Resent')} />
        )}
        {step === 'new-password' && (
          <NewPasswordStep isAr={isAr} onComplete={() => window.location.href = `/${params.lang}/auth/login`} />
        )}
        
        {/* Debug: Manual toggle for your testing */}
        <button onClick={() => setStep('new-password')} className="mt-6 text-[9px] font-black uppercase tracking-widest text-gray-200 self-center">(Test Step 3)</button>
      </div>
    </div>
  );
}