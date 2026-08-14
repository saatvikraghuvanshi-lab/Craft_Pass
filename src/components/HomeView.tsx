import React from 'react';
import { AppView } from '../types';
import { HeritageDivider } from './HeritageDivider';
import {
  ArrowRight,
  QrCode,
  Eye,
  ShieldCheck,
  Wallet,
  Globe,
  Scroll,
  Palette,
  CheckCircle2,
  Handshake,
  Rocket,
  TrendingUp,
  Scale,
  Sparkles,
  Key,
  Users,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onSelectProduct: (productId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <div className="w-full pb-20 md:pb-24">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12 pb-12 md:pb-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="col-span-1 md:col-span-6 z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fff1eb] border border-[#dbc1b8] rounded-full text-[12px] font-bold text-[#994422] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Provenance & Heritage Integrity</span>
            </div>
            <h1 className="font-serif-display text-[36px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-[#271811] leading-[1.1] font-medium tracking-tight">
              Know the hands behind what you buy.
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#55433c] leading-relaxed max-w-lg">
              Bridging ancient tactile traditions with high-end modern commerce through verified provenance and authentic artisan stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => onNavigate('explore')}
                className="bg-[#b85c38] text-white px-8 py-3.5 rounded-[6px] font-semibold text-[15px] hover:-translate-y-[2px] transition-transform shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-[#994422]"
              >
                <span>Explore Crafts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-verify-btn"
                onClick={() => onNavigate('verify')}
                className="border border-[#271811] text-[#271811] px-8 py-3.5 rounded-[6px] font-semibold text-[15px] hover:-translate-y-[2px] transition-transform bg-transparent hover:bg-[#fff1eb] flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#994422]" />
                <span>Verify a Product</span>
              </button>
            </div>
          </div>

          {/* Right Column: Artisan Block Printing Hero Image */}
          <div className="col-span-1 md:col-span-6 relative mt-4 md:mt-0">
            <div
              onClick={() => {
                onSelectProduct('prod-bagru-dupatta');
                onNavigate('product-detail');
              }}
              className="aspect-[4/5] w-full relative overflow-hidden rounded-[12px] border border-[#dbc1b8]/60 shadow-[0_12px_32px_rgba(59,42,34,0.08)] cursor-pointer group"
            >
              <img
                alt="Artisan block printing"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCznciwuiy7bfALVdjN-H8xb_uyMs8GuKLob5PxZTmtN6xF5yXLy3ziiTfFSzO8vTwlpYloqyH0YHG08WGUl26tql9D02trygGGoygB_S6kJheMwbvOMNhVYkugaxmMlYmJOXMVaf6dfmOkkl-znuFjCGG2vVChqNm9O3pzVEzKWk9tOn8azl4KpPS01D3jA5m4e8mZQxSDHmP5rIFFWIyqTNcDhd_y8BgBGU6-sFwfRfOfxxog04T7"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271811]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-[14px] font-medium flex items-center gap-2">
                  <span>View Kamla Devi's Bagru Workshop</span>
                  <Eye className="w-4 h-4" />
                </p>
              </div>
            </div>
            {/* Decorative block print motif pattern in corner */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 block-print-motif opacity-25 -z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Heritage Divider */}
      <HeritageDivider />

      {/* Problem Section: "Beautiful crafts. Broken value chains." */}
      <section className="py-12 md:py-16 px-4 md:px-12 bg-[#fff1eb] max-w-7xl mx-auto rounded-[14px] border border-[#dbc1b8]/40 my-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif-display text-[30px] md:text-[38px] text-[#271811] font-medium mb-3">
            Beautiful crafts. Broken value chains.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#55433c] max-w-2xl mx-auto leading-relaxed">
            The global market desires authentic heritage, but struggles with transparency, fair compensation, and true provenance.
          </p>
        </div>

        {/* 4 Cards in Sand Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Authenticity */}
          <div className="bg-[#DCC9A3] p-6 rounded-[10px] border border-[#c9b487] hover:-translate-y-1 transition-transform flex flex-col items-center text-center shadow-xs">
            <ShieldCheck className="w-9 h-9 text-[#271811] mb-3" />
            <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-2">
              Authenticity
            </h3>
            <p className="text-[14px] text-[#3e2d24] leading-relaxed">
              Protecting genuine craft from mass-produced synthetic imitations and unauthorized replications.
            </p>
          </div>

          {/* Fair Value */}
          <div className="bg-[#DCC9A3] p-6 rounded-[10px] border border-[#c9b487] hover:-translate-y-1 transition-transform flex flex-col items-center text-center shadow-xs">
            <Wallet className="w-9 h-9 text-[#271811] mb-3" />
            <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-2">
              Fair Value
            </h3>
            <p className="text-[14px] text-[#3e2d24] leading-relaxed">
              Ensuring artisans receive equitable 75%+ compensation directly for their generational skill and labor.
            </p>
          </div>

          {/* Market Access */}
          <div className="bg-[#DCC9A3] p-6 rounded-[10px] border border-[#c9b487] hover:-translate-y-1 transition-transform flex flex-col items-center text-center shadow-xs">
            <Globe className="w-9 h-9 text-[#271811] mb-3" />
            <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-2">
              Market Access
            </h3>
            <p className="text-[14px] text-[#3e2d24] leading-relaxed">
              Connecting rural makers directly with conscious global buyers who value provenance and slow craft.
            </p>
          </div>

          {/* Provenance */}
          <div className="bg-[#DCC9A3] p-6 rounded-[10px] border border-[#c9b487] hover:-translate-y-1 transition-transform flex flex-col items-center text-center shadow-xs">
            <Scroll className="w-9 h-9 text-[#271811] mb-3" />
            <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-2">
              Provenance
            </h3>
            <p className="text-[14px] text-[#3e2d24] leading-relaxed">
              Tracing the origin, raw materials, GI tags, and cultural significance of every individual piece.
            </p>
          </div>
        </div>
      </section>

      {/* The Preservation Journey Section */}
      <section className="py-14 md:py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-serif-display text-[30px] md:text-[38px] text-[#271811] text-center font-medium mb-12">
          The Preservation Journey
        </h2>

        <div className="relative">
          {/* Horizontal Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-10 left-16 right-16 h-[1px] bg-[#dbc1b8] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1: Create */}
            <div className="flex flex-col items-center text-center px-3">
              <div className="w-20 h-20 rounded-full bg-[#faddd0] border border-[#dbc1b8] flex items-center justify-center mb-4 shadow-xs">
                <Palette className="w-7 h-7 text-[#994422]" />
              </div>
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-1.5">
                Create
              </h3>
              <p className="text-[14px] text-[#55433c] leading-relaxed max-w-[220px]">
                Artisans craft pieces using authentic generational techniques and natural organic dyes.
              </p>
            </div>

            {/* Step 2: Verify */}
            <div className="flex flex-col items-center text-center px-3">
              <div className="w-20 h-20 rounded-full bg-[#faddd0] border border-[#dbc1b8] flex items-center justify-center mb-4 shadow-xs">
                <QrCode className="w-7 h-7 text-[#994422]" />
              </div>
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-1.5">
                Verify
              </h3>
              <p className="text-[14px] text-[#55433c] leading-relaxed max-w-[220px]">
                Each item receives a unique, immutable digital provenance certificate and QR tag.
              </p>
            </div>

            {/* Step 3: Connect */}
            <div className="flex flex-col items-center text-center px-3">
              <div className="w-20 h-20 rounded-full bg-[#faddd0] border border-[#dbc1b8] flex items-center justify-center mb-4 shadow-xs">
                <Handshake className="w-7 h-7 text-[#994422]" />
              </div>
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-1.5">
                Connect
              </h3>
              <p className="text-[14px] text-[#55433c] leading-relaxed max-w-[220px]">
                Buyers scan to read the artisan's story, inspect batch provenance, and verify authenticity.
              </p>
            </div>

            {/* Step 4: Reach */}
            <div className="flex flex-col items-center text-center px-3">
              <div className="w-20 h-20 rounded-full bg-[#faddd0] border border-[#dbc1b8] flex items-center justify-center mb-4 shadow-xs">
                <Rocket className="w-7 h-7 text-[#994422]" />
              </div>
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-1.5">
                Reach
              </h3>
              <p className="text-[14px] text-[#55433c] leading-relaxed max-w-[220px]">
                Equitable value flows back to the creator, sustaining heritage guilds across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scale the market, not the craft section (Bento Grid) */}
      <section className="py-12 md:py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-serif-display text-[32px] md:text-[40px] text-[#271811] text-center font-medium mb-12">
          Scale the market, not the craft.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* What we Scale */}
          <div className="col-span-1 md:col-span-5 bg-[#ffe2d6] p-8 md:p-10 rounded-[14px] flex flex-col justify-center border border-[#dbc1b8]/60 shadow-xs">
            <h3 className="font-serif-display text-[24px] font-semibold text-[#271811] mb-6 pb-3 border-b border-[#dbc1b8]">
              What we Scale
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-[#994422] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Market Access
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Global reach and transparent direct sales for remote craftspeople.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-[#994422] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Visibility
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Illuminating historically invisible and layered supply chains.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#994422] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Trust
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Verified, immutable product provenance tags and lab tests.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Center Visual / Balance Scale Icon */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[120px] md:min-h-[auto] relative">
            <div className="w-[1px] h-full bg-[#dbc1b8] hidden md:block"></div>
            <div className="w-16 h-16 rounded-full bg-[#fff8f6] border border-[#dbc1b8] flex items-center justify-center text-[#b85c38] shadow-md z-10 md:absolute">
              <Scale className="w-8 h-8" />
            </div>
            <div className="w-full h-[1px] bg-[#dbc1b8] block md:hidden"></div>
          </div>

          {/* What we Protect */}
          <div className="col-span-1 md:col-span-5 bg-[#fff8f6] border border-[#dbc1b8] p-8 md:p-10 rounded-[14px] flex flex-col justify-center shadow-xs">
            <h3 className="font-serif-display text-[24px] font-semibold text-[#271811] mb-6 pb-3 border-b border-[#dbc1b8]">
              What we Protect
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Palette className="w-6 h-6 text-[#775a00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Craft Techniques
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Preserving slow, deliberate creation and unhurried craftsmanship.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="w-6 h-6 text-[#775a00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Cultural Identity
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Honoring regional heritage, sacred motifs, and botanical dyes.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Key className="w-6 h-6 text-[#775a00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-[#271811] uppercase tracking-wider">
                    Artisan Ownership
                  </h4>
                  <p className="text-[14px] text-[#55433c]">
                    Direct control over their personal narrative, pricing, and IP.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Explore CTA banner */}
        <div className="mt-14 p-8 bg-[#DCC9A3]/30 rounded-[14px] border border-[#DCC9A3] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif-display text-[26px] text-[#271811] font-semibold mb-1">
              Ready to explore authentic heritage?
            </h3>
            <p className="text-[15px] text-[#55433c]">
              Every purchase directly sustains traditional Indian artisan guilds.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="bg-[#b85c38] text-white px-8 py-3.5 rounded-[6px] font-semibold text-[15px] hover:bg-[#994422] transition-colors whitespace-nowrap cursor-pointer"
          >
            Browse Verified Catalog
          </button>
        </div>
      </section>
    </div>
  );
};
