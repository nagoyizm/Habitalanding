import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { WorkflowAnimation } from "@/components/WorkflowAnimation";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Showcase />
        <WorkflowAnimation />
        <Features />
        <Pricing />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
