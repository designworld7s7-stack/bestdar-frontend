'use client';
import React from 'react';

export const Section = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
      {icon}
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
    {children}
  </div>
);

export const Input = ({ label, value, onChange, type = "text", dir = "ltr" }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">{label}</label>
    <input
      type={type}
      dir={dir}
      // التعديل هنا: استخدام الـ nullish coalescing لضمان عدم تمرير null
      value={value ?? ""} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-[#12AD65]/20 transition-all outline-none"
    />
  </div>
);

export const Checkbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 rounded border-slate-200 text-[#12AD65] focus:ring-[#12AD65]"
    />
    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
  </label>
);

export const Textarea = ({ label, value, onChange, dir = "ltr" }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">{label}</label>
    <textarea
      dir={dir}
      // التعديل هنا أيضاً للحماية من الـ null
      value={value ?? ""} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-[#12AD65]/20 transition-all outline-none min-h-[100px]"
    />
  </div>
);