import ContactInfo from "./components/contact-info";
import ContactForm from "./components/contact-form";
import BackButton from "@/components/shared/back-button";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return (
    <main className="bg-white min-h-screen pt-12 lg:pt-32 pb-24">
      {/* Desktop-Only Back Button */}
      <div className="hidden lg:block mb-8">
        <BackButton lang={lang} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center mb-16 lg:mb-24">
        {/* Title and Subtitle */}
        <h1 className="text-5xl lg:text-8xl font-black text-black tracking-tighter mb-6 uppercase">
          {isAr ? "اتصل بنا" : "Contact Us"}
        </h1>
        <p className="text-gray-400 font-medium text-sm lg:text-lg max-w-2xl mx-auto">
          {isAr 
            ? "يسعدنا أن نسمع منك! أرسل لنا رسالة وسنقوم بالرد قريباً."
            : "We'd love to hear from you! Send us a message and we'll respond soon."}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Responsive Shuffle: Form first on mobile, Info first on desktop */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Info Section: Becomes order-2 on mobile (under form) */}
          <div className="order-2 lg:order-1 w-full lg:w-1/3">
            <ContactInfo lang={lang} />
          </div>

          {/* Form Section: Becomes order-1 on mobile (at top) */}
          <div className="order-1 lg:order-2 w-full lg:w-2/3">
            <ContactForm lang={lang} />
          </div>

        </div>
      </div>
    </main>
  );
}