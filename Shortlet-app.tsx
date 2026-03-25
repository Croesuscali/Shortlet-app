import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ApartmentCard from "@/components/ApartmentCard";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Zap, Headphones, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const features = [
  { icon: <Shield className="w-6 h-6" />, title: "Verified & Secure", desc: "Every property is vetted for quality and safety" },
  { icon: <Zap className="w-6 h-6" />, title: "Instant Booking", desc: "Book in minutes, move in the same day" },
  { icon: <Headphones className="w-6 h-6" />, title: "24/7 Support", desc: "Dedicated concierge at your service" },
];

const Index = () => {
  const [apartments, setApartments] = useState<Tables<"apartments">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      const { data, error } = await supabase.from("apartments").select("*");
      if (!error && data) setApartments(data);
      setLoading(false);
    };
    fetchApartments();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Features */}
      <section className="py-16 px-4 bg-navy">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-gold mb-3 flex justify-center">{f.icon}</div>
              <h3 className="font-heading text-lg font-semibold text-card mb-1">{f.title}</h3>
              <p className="text-gold-light/60 font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apartments */}
      <section id="apartments" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-body text-center mb-2">Our Collection</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Featured Apartments</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : apartments.length === 0 ? (
            <p className="text-center text-muted-foreground font-body">No apartments available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apt) => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-heading text-xl font-bold text-gold mb-2">LUXESTAY</p>
          <p className="text-gold-light/50 font-body text-xs">© 2026 LuxeStay. Premium short-let apartments in Lagos.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
