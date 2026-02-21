'use client';

import React from 'react';
import { Wallet, Plus, Calendar, Trash2 } from 'lucide-react';
// نخرج مرتين (../../) للوصول إلى admin/components/UI المشترك
import { Section, Input, Checkbox, Textarea } from '../../components/UI';

interface ProjectUnitsProps {
  units: any[];
  setUnits: (units: any[]) => void;
  updateUnit: (index: number, field: string, value: any) => void;
  // 🎯 قمنا بحذف toggleBadge من الخصائص (Props) لأننا سنصنعها بالداخل
}

export default function ProjectUnits({ units, setUnits, updateUnit }: ProjectUnitsProps) {
  
  // 🎯 الدالة أصبحت هنا داخل المكون ومستقلة تماماً 🎯
  const handleToggleBadge = (unitIndex: number, badge: string) => {
    // نأخذ نسخة من الوحدات
    const newUnits = [...units];
    
    // تأمين: التأكد من أن الباجات مصفوفة
    const currentBadges = Array.isArray(newUnits[unitIndex].badges) 
      ? newUnits[unitIndex].badges 
      : [];
    
    // إضافة أو إزالة الباج
    if (currentBadges.includes(badge)) {
newUnits[unitIndex].badges = currentBadges.filter((b: string) => b !== badge);    } else {
      newUnits[unitIndex].badges = [...currentBadges, badge];
    }
    
    // تحديث الحالة
    setUnits(newUnits);
  };

  return (
    <Section title="8. Unit Pricing & Payment Details" icon={<Wallet size={20} className="text-[#12AD65]"/>}>
      <div className="space-y-10">
        {units.map((unit, index) => (
          <div key={index} className="p-8 bg-slate-50 rounded-[32px] border border-slate-200 relative group transition-all hover:shadow-md">
            <button 
              type="button"
              onClick={() => setUnits(units.filter((_, i) => i !== index))}
              className="absolute top-6 right-6 text-red-400 hover:text-red-600 font-bold text-xs bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1"
            >
              <Trash2 size={12} /> Delete Unit
            </button>

            {/* Part A: Unit Specs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Input label="Unit Type (e.g. 1BR)" value={unit.unit_type} onChange={(v: string) => updateUnit(index, 'unit_type', v)} />
              <Input label="Price (USD)" type="number" value={unit.price} onChange={(v: string) => updateUnit(index, 'price', Number(v))} />
              <Input label="Size (SQM)" type="number" value={unit.size_sqm} onChange={(v: string) => updateUnit(index, 'size_sqm', Number(v))} />
              <div className="flex flex-col gap-1">
                 <label className="text-[10px] font-bold text-slate-400 uppercase">Availability</label>
                 <Checkbox label="Available for Sale" checked={unit.is_available} onChange={(v: boolean) => updateUnit(index, 'is_available', v)} />
              </div>
            </div>

            {/* Part B: Badges (Marketing Highlights) */}
            <div className="mb-8 p-4 bg-white rounded-2xl border border-slate-100">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-3 block tracking-widest">Property Highlights</label>
              <div className="flex flex-wrap gap-2">
                {['Sea View', 'High Floor', 'Turkish Citizenship', 'Golden Visa', 'Residency', 'High ROI', 'Ready to Move', 'Off-Plan'].map(badge => {
                  
                  const isSelected = Array.isArray(unit.badges) && unit.badges.includes(badge);
                  
                  return (
                    <button
                      key={badge}
                      type="button"
                      // 🎯 نستخدم الدالة الداخلية الجديدة هنا 🎯
                      onClick={() => handleToggleBadge(index, badge)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                        isSelected 
                        ? 'bg-[#12AD65] text-white border-[#12AD65]' 
                        : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {badge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Part C: Payment Configuration */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 italic">
                  <Calendar size={16} /> Payment Configuration
                </h4>
                <div className="flex gap-4">
                   <button 
                      type="button"
                      onClick={() => updateUnit(index, 'installment_months', 0)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${unit.installment_months === 0 ? 'bg-[#12AD65] text-white' : 'bg-slate-100 text-slate-500'}`}
                   >
                      Full Cash
                   </button>
                   <button 
                      type="button"
                      onClick={() => updateUnit(index, 'installment_months', 24)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${unit.installment_months > 0 ? 'bg-[#12AD65] text-white' : 'bg-slate-100 text-slate-500'}`}
                   >
                      Installments
                   </button>
                </div>
              </div>

              {unit.installment_months > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-300">
                  <Input label="Down Payment (%)" type="number" value={unit.down_payment_pct} onChange={(v: string) => updateUnit(index, 'down_payment_pct', Number(v))} />
                  <Input label="Installment Period (Months)" type="number" value={unit.installment_months} onChange={(v: string) => updateUnit(index, 'installment_months', Number(v))} />
                  <Input label="Installment Total %" type="number" value={unit.installment_total_pct} onChange={(v: string) => updateUnit(index, 'installment_total_pct', Number(v))} />
                  <div className="col-span-3 space-y-4">
                    <Textarea 
                      label="Milestones (EN)" 
                      value={unit.payment_milestones} 
                      onChange={(v: string) => updateUnit(index, 'payment_milestones', v)} 
                      placeholder="e.g. 10% on Handover..."
                    />
                    <Textarea 
                      label="الجدول الزمني (AR)" 
                      dir="rtl"
                      value={unit.payment_milestones_ar} 
                      onChange={(v: string) => updateUnit(index, 'payment_milestones_ar', v)} 
                      placeholder="مثلاً: 10% عند التسليم..."
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-10 rounded-2xl text-center border-2 border-dashed">
                   <Wallet className="mx-auto text-slate-300 mb-2" size={32} />
                   <p className="text-slate-500 font-bold text-sm">Full Cash Payment Mode Enabled</p>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Payment Summary (EN)" value={unit.payment_summary} onChange={(v: string) => updateUnit(index, 'payment_summary', v)} />
                <Input label="ملخص الدفع (AR)" dir="rtl" value={unit.payment_summary_ar} onChange={(v: string) => updateUnit(index, 'payment_summary_ar', v)} />
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button"
          onClick={() => setUnits([...units, { 
            unit_type: '', 
            price: 0, 
            size_sqm: 0, 
            is_available: true, 
            badges: [] as string[],
            has_installments: false, 
            down_payment_pct: 0, 
            installment_months: 0, 
            installment_total_pct: 60, 
            payment_summary: '', 
            payment_summary_ar: '',
            payment_milestones: '',
            payment_milestones_ar: '',
            installment_plan: '' 
          }])}
          className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Unit Variant
        </button>
      </div>
    </Section>
  );
}