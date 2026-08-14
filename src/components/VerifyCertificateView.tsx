import React, { useState, useEffect } from 'react';
import { CraftProduct, AppView } from '../types';
import QRCode from 'qrcode';
import {
  Search,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  QrCode,
  MapPin,
  Calendar,
  Layers,
  Award,
  Fingerprint,
} from 'lucide-react';

interface VerifyCertificateViewProps {
  products: CraftProduct[];
  activeCertificateId: string;
  onSelectCertificate: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

export const VerifyCertificateView: React.FC<VerifyCertificateViewProps> = ({
  products,
  activeCertificateId,
  onSelectCertificate,
  onNavigate,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [simulatedScanModal, setSimulatedScanModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Find active product matching certificateId
  const activeProduct =
    products.find((p) => p.certificateId.toUpperCase() === activeCertificateId.toUpperCase()) ||
    products[0];

  useEffect(() => {
    const generateProvenanceQR = async () => {
      try {
        const verifyUrl = `${window.location.origin}/verify/${activeProduct.certificateId}`;
        const url = await QRCode.toDataURL(verifyUrl, {
          width: 280,
          margin: 1,
          color: {
            dark: '#271811',
            light: '#ffffff',
          },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Error generating QR:', err);
      }
    };
    generateProvenanceQR();
  }, [activeProduct.certificateId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = products.find(
      (p) =>
        p.certificateId.toUpperCase() === query ||
        p.name.toUpperCase().includes(query) ||
        p.artisanName.toUpperCase().includes(query)
    );
    if (found) {
      onSelectCertificate(found.certificateId);
    } else {
      alert(`Certificate ID "${searchInput}" not found in current registry. Try "BG-2026-00142" or "WL-2025-01003".`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `${window.location.origin}/verify/${activeProduct.certificateId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-14 pb-24">
      {/* Certificate Search & Selector Header Bar */}
      <div className="max-w-3xl mx-auto mb-8 bg-[#fff1eb] p-4 rounded-[10px] border border-[#dbc1b8] flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#88726b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Lookup Tag (e.g. BG-2026-00142)..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] text-[13px] font-mono outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#994422] text-white rounded-[6px] text-[13px] font-semibold hover:bg-[#b85c38] transition-colors cursor-pointer"
          >
            Lookup
          </button>
        </form>

        {/* Quick select tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          <span className="text-[11px] font-bold text-[#88726b] uppercase whitespace-nowrap">
            Samples:
          </span>
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectCertificate(p.certificateId)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                p.certificateId === activeProduct.certificateId
                  ? 'bg-[#994422] text-white font-bold'
                  : 'bg-white border border-[#dbc1b8] text-[#55433c] hover:bg-[#ffeae1]'
              }`}
            >
              {p.certificateId}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header Section */}
      <div className="text-center mb-8">
        <h1 className="font-serif-display text-[32px] sm:text-[40px] md:text-[46px] text-[#994422] mb-1 uppercase tracking-tight font-medium">
          CraftPass Verified
        </h1>
        <div className="flex items-center justify-center gap-2 text-[#55433c]">
          <ShieldCheck className="w-5 h-5 text-[#994422]" />
          <p className="text-[13px] font-bold tracking-[0.2em] uppercase">
            Digital Provenance Record
          </p>
        </div>

        {/* Heritage Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="h-[1px] w-20 bg-[#dbc1b8]"></div>
          <Sparkles className="w-4 h-4 text-[#994422] mx-3" />
          <div className="h-[1px] w-20 bg-[#dbc1b8]"></div>
        </div>
      </div>

      {/* Certificate Container (Patterned Canvas Card) */}
      <div className="bg-[#fff8f6] rounded-[16px] border border-[#dbc1b8] p-6 md:p-10 shadow-[0_8px_32px_rgba(59,42,34,0.06)] relative overflow-hidden bg-pattern max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          {/* Product Details (Left Side / 8 cols) */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="mb-6">
                <h2 className="font-serif-display text-[28px] sm:text-[34px] text-[#271811] font-semibold mb-1">
                  {activeProduct.name}
                </h2>
                <p className="text-[14px] text-[#88726b] font-mono tracking-widest font-semibold flex items-center gap-2">
                  <span>ID: {activeProduct.certificateId}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-[#274c3e]/10 text-[#274c3e] rounded font-bold">
                    GI PROTECTED
                  </span>
                </p>
              </div>

              {/* Artisan Identity Block */}
              <div className="flex items-start gap-4 p-4 bg-white/70 rounded-[10px] border border-[#dbc1b8]/70 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#994422] flex-shrink-0 shadow-xs">
                  <img
                    src={activeProduct.artisanAvatar}
                    alt={activeProduct.artisanName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif-display text-[22px] font-semibold text-[#271811] mb-0.5">
                    {activeProduct.artisanName}
                  </h3>
                  <p className="text-[14px] text-[#55433c] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#994422]" />
                    {activeProduct.origin}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-2 bg-[#ffce51] text-[#735700] px-3 py-1 rounded-full shadow-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-bold">
                      Verified: {activeProduct.verificationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Verification Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeProduct.verificationChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-center gap-3 p-3.5 bg-[#fff8f6] border border-[#dbc1b8] rounded-[8px] shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#b85c38]/15 text-[#994422] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#994422]" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#271811]">
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Product in Store CTA */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('product-detail')}
                className="text-[13px] font-semibold text-[#994422] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Product Dossier & Materials Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* QR Code Section (Right Side / 4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white border border-[#dbc1b8] rounded-[12px] text-center shadow-xs">
            <div
              onClick={() => setSimulatedScanModal(true)}
              className="w-48 h-48 bg-white p-2 border border-[#dbc1b8] mb-4 relative flex items-center justify-center cursor-pointer group hover:border-[#994422] transition-colors rounded-[8px]"
            >
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`Provenance QR for ${activeProduct.certificateId}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-[#88726b] animate-pulse" />
                </div>
              )}
              <div className="absolute inset-0 bg-[#271811]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[12px] font-medium p-2 text-center rounded-[8px]">
                Click to Test Scanner
              </div>
            </div>

            <p className="text-[12px] font-bold text-[#88726b] uppercase tracking-wider mb-4 flex items-center gap-1.5 justify-center">
              <Fingerprint className="w-3.5 h-3.5 text-[#994422]" />
              Scan to verify provenance
            </p>

            <button
              onClick={handleShare}
              className="w-full bg-[#7a766c] hover:bg-[#3e2d24] text-white px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Record'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Journey of Verification Timeline */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="font-serif-display text-[26px] sm:text-[30px] text-center mb-8 text-[#271811] font-semibold">
          Journey of Verification
        </h3>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] bg-[#dbc1b8] z-0"></div>
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute left-[23px] top-4 bottom-4 w-[1px] bg-[#dbc1b8] z-0"></div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-2">
            {activeProduct.timeline.map((event) => {
              const isIssued = event.title === 'CraftPass Issued';
              const isPending = event.status === 'pending';

              return (
                <div
                  key={event.step}
                  className={`flex md:flex-col items-center gap-4 md:gap-3 group ${
                    isPending ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 relative z-10 shadow-xs ${
                      isIssued
                        ? 'bg-[#994422] border-[#994422] text-white'
                        : isPending
                        ? 'bg-[#fff8f6] border-[#dbc1b8] text-[#88726b]'
                        : 'bg-[#fff8f6] border-[#994422] text-[#994422]'
                    }`}
                  >
                    {isIssued ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div className="text-left md:text-center">
                    <p
                      className={`text-[13px] font-bold ${
                        isIssued ? 'text-[#994422]' : 'text-[#271811]'
                      }`}
                    >
                      {event.title}
                    </p>
                    <p className="text-[12px] text-[#88726b]">{event.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulated Scanner Dialog */}
      {simulatedScanModal && (
        <div className="fixed inset-0 z-50 bg-[#271811]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#fff1eb] border border-[#dbc1b8] flex items-center justify-center text-[#994422]">
              <QrCode className="w-8 h-8" />
            </div>
            <h3 className="font-serif-display text-[22px] font-semibold text-[#271811]">
              Simulate NFC / QR Scan
            </h3>
            <p className="text-[14px] text-[#55433c]">
              In physical retail, scanning the tag on the textile opens this exact cryptographic registry record instantly.
            </p>
            <div className="p-3 bg-white border border-[#dbc1b8] rounded-[8px] text-[13px] font-mono text-[#271811]">
              Payload: {activeProduct.certificateId} • Blockchain Stamp: Verified
            </div>
            <button
              onClick={() => setSimulatedScanModal(false)}
              className="w-full bg-[#994422] text-white py-2.5 rounded-[8px] font-semibold text-[14px] hover:bg-[#b85c38] transition-colors cursor-pointer"
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
