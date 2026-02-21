'use client';

import React, { useState } from 'react';
import { Save, Plus, ArrowLeft, Loader2 } from 'lucide-react';
import { saveProjectWithUnitsAction } from '../../actions';

// استيراد الأقسام الثمانية
import ProjectHeader from './ProjectHeader';
import ProjectMedia from './ProjectMedia';
import ProjectDetails from './ProjectDetails';
import ProjectMap from './ProjectMap';
import ProjectFloorPlans from './ProjectFloorPlans';
import ProjectAmenities from './ProjectAmenities';
import ProjectDeveloper from './ProjectDeveloper';
import ProjectUnits from './ProjectUnits';

export default function Projects({ initialData = [] }: { initialData: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<any>({
    country_code: 'AE',
    title: '', title_ar: '', location: '', location_ar: '',
    price: 0, property_ref: '', property_type: '', is_featured_home: false,
    project_status: '', project_status_ar: '', delivery_date: '', delivery_date_ar: '',
    currency: 'AED', slug: '', is_published: true, image_url: '',
    thumbnail_url: '', bedrooms: 0, bathrooms: 0, area_sqft: 0,
    total_floors: 0, view_type: '', view_type_ar: '', orientation: '',
    orientation_ar: '', neighborhood_description: '', neighborhood_description_ar: '',
    landmarks: '', landmarks_ar: '', map_longitude: '', map_latitude: '',
    map_location_url: '', floor_plan_urls: '', amenities: [],
    custom_amenities: '', developer_name: '', dev_description: '',
    dev_description_ar: '', overview_text: '', overview_text_ar: ''
  });

  const [units, setUnits] = useState<any[]>([
    {
      unit_type: '', price: 0, size_sqm: 0, is_available: true,
      badges: [], has_installments: false, down_payment_pct: 0,
      installment_months: 0, installment_total_pct: 60, payment_summary: '',
      payment_summary_ar: '', payment_milestones: '', payment_milestones_ar: '',
      installment_plan: ''
    }
  ]);

  // --- 1. الدوال المساعدة ---
  const formatLandmarksValue = (val: any) => {
    if (!val) return '';
    if (Array.isArray(val)) return val.map((item: any) => item.name).join(', ');
    return typeof val === 'string' ? val : '';
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  };

  // --- 2. دوال التعامل مع البيانات ---
  const handleEdit = (project: any) => {
    setFormData({
      ...project,
      landmarks: formatLandmarksValue(project.landmarks),
      landmarks_ar: formatLandmarksValue(project.landmarks_ar),
      amenities: Array.isArray(project.amenities) ? project.amenities : [],
      custom_amenities: '' 
    });

    if (project.units) { 
      setUnits(project.units);
    }
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
  setLoading(true);
  try {
    // 1. تحضير المرافق (Amenities)
    const manualAmenities = formData.custom_amenities?.split(',').map((s: string) => s.trim()) || [];
    const combinedAmenities = [...(formData.amenities || []), ...manualAmenities].filter(Boolean);

    // 2. تحضير المعالم (Landmarks)
    const formatToJSONB = (text: string) => {
      if (!text || typeof text !== 'string') return [];
      return text.split(',').map(item => ({
        name: item.trim(),
        time: "10 min",
        type: "general"
      }));
    };

    // 3. تجهيز بيانات الوحدات أولاً (لحل خطأ Variable used before declaration)
    const cleanUnitsData = units.map(unit => ({
      unit_type: unit.unit_type || '',
      price: Number(unit.price) || 0,
      size_sqm: Number(unit.size_sqm) || 0,
      is_available: Boolean(unit.is_available),
      down_payment_pct: Number(unit.down_payment_pct) || 0,
      installment_months: Number(unit.installment_months) || 0,
      installment_total_pct: Number(unit.installment_total_pct) || 0,
      has_installments: (Number(unit.installment_months) || 0) > 0,
      payment_summary: unit.payment_summary || '',
      payment_summary_ar: unit.payment_summary_ar || '',
      payment_milestones: unit.payment_milestones || '',
      payment_milestones_ar: unit.payment_milestones_ar || '',
      
      // 👇 هذا هو السطر السحري الذي سيحفظ الباجات في قاعدة البيانات
      badges: Array.isArray(unit.badges) ? unit.badges : []
    }));

    // 4. تجهيز بيانات المشروع وحذف الحقول الزائدة لمنع خطأ Schema Cache
    const projectSubmission = {
      ...formData,
      id: editingId || undefined, 
      amenities: combinedAmenities.join(', '),
      landmarks: formatToJSONB(formData.landmarks), 
      landmarks_ar: formatToJSONB(formData.landmarks_ar),
      map_latitude: formData.map_latitude ? parseFloat(formData.map_latitude) : null,
      map_longitude: formData.map_longitude ? parseFloat(formData.map_longitude) : null,
    };

    // حذف الحقول التي ليست أعمدة في جدول projects لمنع خطأ Schema Cache
    delete (projectSubmission as any).project_units; 
    delete (projectSubmission as any).units; 
    delete (projectSubmission as any).custom_amenities;

    // 5. الآن نقوم بالإرسال الفعلي للأكشن بعد أن أصبحت كل المتغيرات جاهزة ومعرفة
    await saveProjectWithUnitsAction(projectSubmission, cleanUnitsData);
    
    alert("Success! Project and Units saved.");
    window.location.reload();
  } catch (err: any) {
    console.error("Detailed Save Error:", err);
    alert("Error: " + (err.message || "Unknown error occurred"));
  } finally {
    setLoading(false);
  }
};

  // --- 3. العرض (UI) ---
  if (!isAdding) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black italic">PROJECTS DIRECTORY</h1>
          <button onClick={() => { setEditingId(null); setIsAdding(true); }} className="bg-[#12AD65] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
            <Plus size={18} /> Add New Project
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {initialData.map((p) => (
            <div key={p.id} className="p-6 bg-white rounded-[24px] border flex justify-between items-center hover:border-[#12AD65] transition-all">
              <div>
                <p className="font-black italic uppercase">{p.title}</p>
                <p className="text-slate-400 text-xs">{p.location}</p>
              </div>
              <button onClick={() => handleEdit(p)} className="px-6 py-2 bg-slate-50 rounded-xl font-bold text-xs hover:bg-[#12AD65] hover:text-white transition-all">
                Edit Full Project
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 p-6">
      <div className="flex items-center justify-between mb-8 sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4">
        <button onClick={() => setIsAdding(false)} className="flex items-center gap-2 font-bold text-slate-500"><ArrowLeft size={20} /> Back</button>
        <button onClick={handleSave} disabled={loading} className="bg-black text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Project
        </button>
      </div>
      <div className="space-y-6">
        <ProjectHeader formData={formData} setFormData={setFormData} generateSlug={generateSlug} />
        
        {/* نمرر فقط البيانات للمكون الفرعي، هو من يتولى الرفع الآن */}
        <ProjectMedia formData={formData} setFormData={setFormData} />
        
        <ProjectDetails formData={formData} setFormData={setFormData} />
        <ProjectMap formData={formData} setFormData={setFormData} />
        
        {/* المخططات أيضاً أصبحت داخل مكون الميديا الموحد أو مكونها الخاص الذي سنربطه بنفس الطريقة */}
        <ProjectFloorPlans formData={formData} setFormData={setFormData} />
        
        <ProjectAmenities formData={formData} setFormData={setFormData} />
        <ProjectDeveloper formData={formData} setFormData={setFormData} />
        <ProjectUnits 
          units={units} 
          setUnits={setUnits} 
          updateUnit={(i, f, v) => {
            const newUnits = [...units];
            newUnits[i] = { ...newUnits[i], [f]: v };
            setUnits(newUnits);
          }} 
          
        />
      </div>
    </div>
  );
}