import Footer from "@/ui-components/sections/Footer";
import Header from "@/ui-components/sections/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mode App",
  description: "A modern project management tool built with Next.js.",
};

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
