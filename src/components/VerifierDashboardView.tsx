import React, { useState } from 'react';
import { VerificationRequest, AppView } from '../types';
import { HeritageDivider } from './HeritageDivider';
import {
  CheckCircle2,
  Clock,
  Info,
  ShieldCheck,
  Award,
  Sparkles,
  User,
  MapPin,
  Layers,
  Circle,
  Loader2,
  ArrowRight,
  ChevronRight,
  FileCheck,
} from 'lucide-react';

interface VerifierDashboardViewProps {
  requests: VerificationRequest[];
  onApproveRequest: (requestId: string, notes: string) => void;
  onRequestMoreInfo: (requestId: string, notes: string) => void;
  onNavigate: (view: AppView) => void;
}

export const VerifierDashboardView: React.FC<VerifierDashboardViewProps> = ({
  requests,
  onApproveRequest,
  onRequestMoreInfo,
  onNavigate,
}) => {
  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    requests[0]?.id || 'req-1'
  );
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'pending' | 'needs_info' | 'verified'>('all');
  const [verifierNotes, setVerifierNotes] = useState<string>('');
  const [localChecks, setLocalChecks] = useState<Record<string, { artisanIdentity: boolean; originAndGi: boolean; processAndMaterials: boolean }>>({
    'req-1': { artisanIdentity: true, originAndGi: true, processAndMaterials: true },
    'req-2': { artisanIdentity: true, originAndGi: true, processAndMaterials: false },
    'req-3': { artisanIdentity: true, originAndGi: true, processAndMaterials: true },
  });
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiAuditResult, setAiAuditResult] = useState<string | null>(null);

  const selectedRequest = requests.find((r) => r.id === selectedRequestId) || requests[0];

  const currentChecks = localChecks[selectedRequest?.id] || {
    artisanIdentity: false,
    originAndGi: false,
    processAndMaterials: false,
  };

  const toggleCheck = (key: 'artisanIdentity' | 'originAndGi' | 'processAndMaterials') => {
    setLocalChecks((prev) => ({
      ...prev,
      [selectedRequest.id]: {
        ...currentChecks,
        [key]: !currentChecks[key],
      },
    }));
  };

  const handleRunAiAudit = async () => {
    setAiAnalyzing(true);
    try {
      const res = await fetch('/api/ai/verify-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          craftName: selectedRequest.craftName,
          region: selectedRequest.region,
          productName: selectedRequest.productName,
          artisanRegNumber: selectedRequest.artisanRegNumber,
          processNotes: `${selectedRequest.declaredProcess}. Materials: ${selectedRequest.declaredMaterials.join(', ')}`,
          giTagName: selectedRequest.giTagName,
        }),
      });
      if (!res.ok) throw new Error('AI audit request failed');
      const data = await res.json();
      if (data.auditNotes) {
        const analysis = `${data.verdict || 'AI Audit'}: ${data.auditNotes}`;
        setAiAuditResult(analysis);
        setVerifierNotes((prev) => (prev ? `${prev}\n\n[AI Audit Note]: ${analysis}` : `[AI Audit Note]: ${analysis}`));
      }
    } catch (err) {
      console.error('AI audit error:', err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleApprove = () => {
    onApproveRequest(selectedRequest.id, verifierNotes);
    setActionSuccessMsg(`CraftPass Certificate successfully issued for ${selectedRequest.certificateId}!`);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const handleRequestInfo = () => {
    onRequestMoreInfo(selectedRequest.id, verifierNotes);
    setActionSuccessMsg(`Status updated to "Needs info" with verifier instructions.`);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTabFilter === 'all') return true;
    return r.status === activeTabFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-28">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif-display text-[32px] sm:text-[40px] md:text-[46px] text-[#271811] font-medium mb-2 leading-tight">
          Verification requests
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#55433c] max-w-2xl leading-relaxed">
          Review and authenticate artisan submissions to maintain the Provenance Registry.
        </p>
      </div>

      {actionSuccessMsg && (
        <div className="mb-6 p-4 bg-[#ffce51]/30 border border-[#D4A72C] rounded-[10px] flex items-center justify-between text-[#735700] text-[14px] font-semibold animate-fadeIn shadow-xs">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#735700]" />
            {actionSuccessMsg}
          </span>
          <button
            onClick={() => onNavigate('verify')}
            className="underline hover:text-[#271811] text-[13px] ml-4 whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            <span>View Live Certificate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Left Column Queue + Right Column Detail View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Queue List */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#dbc1b8] pb-2">
            <h2 className="font-serif-display text-[22px] font-semibold text-[#271811]">
              Queue ({filteredRequests.length})
            </h2>
            <div className="flex gap-1 text-[12px]">
              <button
                onClick={() => setActiveTabFilter('all')}
                className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                  activeTabFilter === 'all'
                    ? 'bg-[#b85c38] text-white font-semibold'
                    : 'text-[#55433c] hover:bg-[#fff1eb]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTabFilter('pending')}
                className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                  activeTabFilter === 'pending'
                    ? 'bg-[#b85c38] text-white font-semibold'
                    : 'text-[#55433c] hover:bg-[#fff1eb]'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTabFilter('verified')}
                className={`px-2.5 py-1 rounded-[6px] transition-colors cursor-pointer ${
                  activeTabFilter === 'verified'
                    ? 'bg-[#b85c38] text-white font-semibold'
                    : 'text-[#55433c] hover:bg-[#fff1eb]'
                }`}
              >
                Verified
              </button>
            </div>
          </div>

          {/* Queue Items */}
          <div className="space-y-3.5">
            {filteredRequests.map((req) => {
              const isSelected = req.id === selectedRequest.id;

              return (
                <button
                  key={req.id}
                  onClick={() => {
                    setSelectedRequestId(req.id);
                    setVerifierNotes(req.verifierNotes || '');
                    setAiAuditResult(null);
                  }}
                  className={`text-left w-full rounded-[12px] p-4 flex flex-col gap-2.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#DCC9A3] border-[#c8b590] shadow-[0_4px_16px_rgba(59,42,34,0.08)] -translate-y-0.5'
                      : 'bg-[#fff8f6] border-[#dbc1b8] hover:bg-[#fff1eb] hover:border-[#994422]'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[11px] font-mono font-bold text-[#55433c] bg-[#fff8f6] px-2 py-0.5 rounded border border-[#dbc1b8]/50">
                      {req.certificateId}
                    </span>

                    {/* Status Pill */}
                    {req.status === 'pending' && (
                      <span className="text-[11px] font-bold text-white bg-[#b85c38] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                    {req.status === 'needs_info' && (
                      <span className="text-[11px] font-bold text-[#3e2d24] bg-[#ffce51] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Needs info
                      </span>
                    )}
                    {req.status === 'verified' && (
                      <span className="text-[11px] font-bold text-white bg-[#7a766c] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif-display text-[19px] font-semibold text-[#271811] leading-snug">
                      {req.craftName}
                    </h3>
                    <div className="text-[13px] text-[#55433c] flex items-center gap-2 mt-1">
                      <span className="w-5 h-5 rounded-full overflow-hidden inline-block bg-[#ffeae1]">
                        <img
                          src={req.artisanAvatar}
                          alt={req.artisanName}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span>{req.artisanName}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#88726b] flex justify-between items-center border-t border-[#dbc1b8]/40 pt-2">
                    <span>{req.region}</span>
                    <span>{req.submittedTimeAgo}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail Inspection View */}
        <div className="md:col-span-8 bg-white border border-[#dbc1b8] rounded-[16px] p-6 md:p-8 flex flex-col gap-6 shadow-xs relative overflow-hidden">
          {/* Top Header of Selected Item */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#dbc1b8] pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[11px] font-mono font-bold text-[#55433c] border border-[#dbc1b8] px-2.5 py-0.5 rounded uppercase tracking-wider bg-[#fff8f6]">
                  REQUEST ID: {selectedRequest.certificateId}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    selectedRequest.status === 'verified'
                      ? 'bg-[#7a766c] text-white'
                      : selectedRequest.status === 'needs_info'
                      ? 'bg-[#ffce51] text-[#3e2d24]'
                      : 'bg-[#b85c38] text-white'
                  }`}
                >
                  {selectedRequest.status === 'verified'
                    ? 'Verified & Issued'
                    : selectedRequest.status === 'needs_info'
                    ? 'Pending Information'
                    : 'Pending Review'}
                </span>
              </div>
              <h2 className="font-serif-display text-[26px] sm:text-[32px] font-semibold text-[#271811]">
                {selectedRequest.productName}
              </h2>
              <p className="text-[14px] text-[#55433c]">
                {selectedRequest.craftName} • {selectedRequest.region}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 w-full md:w-auto">
              <button
                onClick={handleRequestInfo}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-full border border-[#3e2d24] text-[#3e2d24] text-[13px] font-semibold hover:bg-[#fff1eb] transition-colors cursor-pointer"
              >
                Request More Info
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-[#b85c38] hover:bg-[#994422] text-white text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Approve & Issue</span>
              </button>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="md:col-span-2 h-56 sm:h-64 rounded-[10px] overflow-hidden bg-[#ffeae1] border border-[#dbc1b8] relative group">
              <img
                src={selectedRequest.mainImage}
                alt="Main Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#271811]/70 text-white px-2 py-0.5 rounded text-[11px]">
                Product Master Photo
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-3.5">
              {selectedRequest.processImages.map((img, idx) => (
                <div
                  key={idx}
                  className="h-28 rounded-[10px] overflow-hidden bg-[#ffeae1] border border-[#dbc1b8] relative"
                >
                  <img
                    src={img}
                    alt={`Process detail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-[#271811]/70 text-white px-1.5 py-0.5 rounded text-[10px]">
                    Process Stage #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heritage Divider */}
          <HeritageDivider className="py-2" />

          {/* Verification Checklist Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811]">
                Verification Checklist
              </h3>
              <button
                type="button"
                onClick={handleRunAiAudit}
                disabled={aiAnalyzing}
                className="text-[12px] font-bold bg-[#fff1eb] border border-[#994422] text-[#994422] hover:bg-[#994422] hover:text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {aiAnalyzing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{aiAnalyzing ? 'Analyzing with Gemini...' : 'Run AI Authenticity Audit'}</span>
              </button>
            </div>

            {aiAuditResult && (
              <div className="mb-4 p-4 bg-[#fff1eb] border border-[#dbc1b8] rounded-[10px] space-y-1 animate-fadeIn">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#994422] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gemini Authenticity & GI Compliance Assessment
                </p>
                <p className="text-[13px] text-[#3e2d24] leading-relaxed">
                  {aiAuditResult}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check 1: Artisan Identity */}
              <div
                onClick={() => toggleCheck('artisanIdentity')}
                className={`p-4 rounded-[10px] border transition-all cursor-pointer flex flex-col gap-3 ${
                  currentChecks.artisanIdentity
                    ? 'bg-[#DCC9A3]/30 border-[#c8b590]'
                    : 'bg-[#fff8f6] border-[#dbc1b8]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#55433c] flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#994422]" />
                    Artisan Identity
                  </h4>
                  {currentChecks.artisanIdentity ? (
                    <CheckCircle2 className="w-5 h-5 text-[#994422]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#88726b]" />
                  )}
                </div>

                <div className="flex items-center gap-3 border-t border-[#dbc1b8]/50 pt-3">
                  <img
                    src={selectedRequest.artisanAvatar}
                    alt={selectedRequest.artisanName}
                    className="w-10 h-10 rounded-full object-cover border border-[#dbc1b8]"
                  />
                  <div>
                    <p className="text-[14px] font-bold text-[#271811]">
                      {selectedRequest.artisanName}
                    </p>
                    <p className="text-[12px] text-[#55433c]">
                      {selectedRequest.artisanRegNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 2: Origin & GI */}
              <div
                onClick={() => toggleCheck('originAndGi')}
                className={`p-4 rounded-[10px] border transition-all cursor-pointer flex flex-col gap-3 ${
                  currentChecks.originAndGi
                    ? 'bg-[#DCC9A3]/30 border-[#c8b590]'
                    : 'bg-[#fff8f6] border-[#dbc1b8]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#55433c] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#994422]" />
                    Origin & GI Tag
                  </h4>
                  {currentChecks.originAndGi ? (
                    <CheckCircle2 className="w-5 h-5 text-[#994422]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#88726b]" />
                  )}
                </div>

                <div className="border-t border-[#dbc1b8]/50 pt-3 space-y-1">
                  <p className="text-[13px] text-[#271811]">
                    <span className="font-semibold">Region:</span> {selectedRequest.region}
                  </p>
                  <p className="text-[13px] text-[#271811]">
                    <span className="font-semibold">GI Status:</span>{' '}
                    {selectedRequest.giTagRegistered ? selectedRequest.giTagName : 'Standard Handcrafted'}
                  </p>
                </div>
              </div>

              {/* Check 3: Process & Materials */}
              <div
                onClick={() => toggleCheck('processAndMaterials')}
                className={`p-4 rounded-[10px] border transition-all cursor-pointer flex flex-col gap-3 md:col-span-2 ${
                  currentChecks.processAndMaterials
                    ? 'bg-[#DCC9A3]/30 border-[#c8b590]'
                    : 'bg-[#fff8f6] border-[#dbc1b8]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#55433c] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#994422]" />
                    Process & Material Audit
                  </h4>
                  {currentChecks.processAndMaterials ? (
                    <CheckCircle2 className="w-5 h-5 text-[#994422]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#88726b]" />
                  )}
                </div>

                <div className="border-t border-[#dbc1b8]/50 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <p className="font-bold text-[#271811] mb-1">Declared Materials</p>
                    <ul className="list-disc list-inside text-[#55433c] space-y-0.5">
                      {selectedRequest.declaredMaterials.map((mat, i) => (
                        <li key={i}>{mat}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-[#271811] mb-1">Declared Process</p>
                    <p className="text-[#55433c] leading-relaxed">
                      {selectedRequest.declaredProcess}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Verifier Notes Area */}
          <div className="border-t border-[#dbc1b8] pt-5">
            <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-2">
              Internal Verifier Notes (Cryptographically Logged)
            </label>
            <textarea
              rows={3}
              value={verifierNotes}
              onChange={(e) => setVerifierNotes(e.target.value)}
              placeholder="Add observations, batch numbers, or required documentation for this artisan..."
              className="w-full bg-[#fff8f6] border border-[#dbc1b8] focus:border-[#994422] rounded-[8px] p-3 text-[14px] outline-none text-[#271811]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
