import React from 'react';

// في النسخ الحديثة، يجب أن تكون الوظيفة async للتعامل مع params
export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  // يجب عمل await للـ params قبل استخراج lang
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  return (
    <main className="max-w-5xl mx-auto px-6 py-24 lg:py-32 min-h-screen">
      {/* القسم العلوي: هادئ ومنظم */}
      <div className="border-b border-gray-100 pb-12 mb-16">
        <h1 className="text-3xl lg:text-5xl font-black text-black uppercase tracking-tighter mb-4">
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
          {isAr ? "آخر تحديث: فبراير 2026" : "Last Updated: February 2026"}
        </p>
      </div>

      {/* المحتوى: مقسم بوضوح مع عناوين متوسطة الحجم */}
      <div className="grid lg:grid-cols-3 gap-12">
        <aside className="lg:col-span-1">
          <div className="sticky top-32 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-xs font-black uppercase text-[#12AD65] mb-2">{isAr ? "ثقتك تهمنا" : "Trust Matters"}</p>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {isAr ? "نحن نلتزم بحماية بياناتك الشخصية وفق أعلى المعايير." : "We are committed to protecting your personal data following the highest standards."}
            </p>
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-16">
  {/* 01. البيانات التي نجمعها */}
  <section className="space-y-4">
    <h2 className="text-xl lg:text-2xl font-bold text-black flex items-center gap-3">
      <span className="text-[#12AD65]">01.</span>
      {isAr ? "البيانات التي نجمعها" : "Data Collection"}
    </h2>
    <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
      {isAr 
        ? "نحن في Best Dar نجمع فقط المعلومات الضرورية التي تقدمها لنا طوعاً من خلال نماذج الاتصال أو عند التسجيل في نادي المستثمرين. تشمل هذه البيانات: الاسم الكامل، رقم الهاتف، والبريد الإلكتروني. كما قد نجمع بيانات تقنية غير معرفة مثل نوع الجهاز لتحسين تجربة تصفح الموقع." 
        : "At Best Dar, we only collect essential information that you voluntarily provide through contact forms or when registering for the Investor Club. This includes your full name, phone number, and email address. We may also collect non-identifying technical data such as device type to enhance your browsing experience."}
    </p>
  </section>

  {/* 02. استخدام المعلومات */}
  <section className="space-y-4">
    <h2 className="text-xl lg:text-2xl font-bold text-black flex items-center gap-3">
      <span className="text-[#12AD65]">02.</span>
      {isAr ? "استخدام المعلومات" : "How We Use Information"}
    </h2>
    <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
      {isAr 
        ? "تُستخدم بياناتك حصراً لتقديم الاستشارات العقارية التي تطلبها، وإطلاعك على أحدث الفرص الاستثمارية في دبي وتركيا. نحن لا نقوم ببيع أو تأجير بياناتك لأطراف ثالثة؛ بل تُستخدم فقط لتسهيل تواصلك مع خبراء العقارات لدينا وضمان حصولك على المعلومات التي تهمك." 
        : "Your data is used exclusively to provide the real estate consultancy you request and to keep you updated on the latest investment opportunities in Dubai and Turkey. We do not sell or rent your data to third parties; it is solely used to facilitate communication with our property experts."}
    </p>
  </section>

  {/* 03. أمن البيانات وحمايتها */}
  <section className="space-y-4">
    <h2 className="text-xl lg:text-2xl font-bold text-black flex items-center gap-3">
      <span className="text-[#12AD65]">03.</span>
      {isAr ? "أمن البيانات وحمايتها" : "Data Security"}
    </h2>
    <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
      {isAr 
        ? "نحن نأخذ أمن بياناتك على محمل الجد، حيث يتم تخزين كافة المعلومات الشخصية في قواعد بيانات مشفرة وآمنة. نطبق بروتوكولات حماية متقدمة لمنع أي وصول غير مصرح به، ونضمن لك الحق في طلب مراجعة أو حذف بياناتك من سجلاتنا في أي وقت." 
        : "We take your data security seriously, as all personal information is stored in secure, encrypted databases. We implement advanced protection protocols to prevent unauthorized access and guarantee your right to request the review or deletion of your data at any time."}
    </p>
  </section>
</div>
      </div>
    </main>
  );
}