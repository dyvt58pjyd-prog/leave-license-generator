import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserCheck, 
  Users, 
  MapPin, 
  IndianRupee, 
  Printer, 
  FileText, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  Upload, 
  Copy, 
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Shield,
  Zap,
  Info
} from 'lucide-react';
import AgreementDocument from './components/AgreementDocument';
import AgreementDocumentMr from './components/AgreementDocumentMr';
import AgreementDocumentHi from './components/AgreementDocumentHi';
import { sampleCommercialAgreement, sampleResidentialAgreement } from './data/sampleAgreements';
import { calculateEndDate } from './utils/dateUtils';

export default function App() {
  const [agreement, setAgreement] = useState(sampleCommercialAgreement);
  const [language, setLanguage] = useState('mr'); // Default to Marathi as requested!
  const [activeTab, setActiveTab] = useState('protections'); // Default to protections so user sees them immediately!
  const [copied, setCopied] = useState(false);
  const [autoCalculateDates, setAutoCalculateDates] = useState(true);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfMarginMm, setPdfMarginMm] = useState(15); // Standard 15mm legal margin

  // Auto calculate end date when startDate or durationMonths changes
  useEffect(() => {
    if (autoCalculateDates && agreement.startDate && agreement.durationMonths) {
      const calculatedEnd = calculateEndDate(agreement.startDate, agreement.durationMonths);
      if (calculatedEnd) {
        setAgreement(prev => {
          if (prev.endDate === calculatedEnd && prev.possessionDate === prev.startDate) {
            return prev;
          }
          return {
            ...prev,
            endDate: calculatedEnd,
            possessionDate: prev.possessionDate || prev.startDate
          };
        });
      }
    }
  }, [agreement.startDate, agreement.durationMonths, autoCalculateDates]);

  const updateField = (section, field, value) => {
    if (section) {
      setAgreement(prev => ({
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [field]: value
        }
      }));
    } else {
      setAgreement(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const updateProtection = (key, value) => {
    setAgreement(prev => ({
      ...prev,
      licenseeProtections: {
        ...prev.licenseeProtections,
        [key]: value
      }
    }));
  };

  const updateBoundary = (direction, value) => {
    setAgreement(prev => ({
      ...prev,
      property: {
        ...prev.property,
        boundaries: {
          ...prev.property.boundaries,
          [direction]: value
        }
      }
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDirectPdf = async () => {
    const element = document.querySelector('#screen-agreement-preview .a4-sheet') || document.querySelector('.a4-sheet');
    if (!element) return;
    setIsGeneratingPdf(true);

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      const m = Number(pdfMarginMm) || 15;
      const opt = {
        margin: [m, m, m, m],
        filename: `Leave_and_Licence_${agreement.agreementPlace || 'Khamgaon'}_${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation fallback:", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agreement, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `leave-and-license-${agreement.agreementPlace || 'draft'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setAgreement(parsed);
        } catch (err) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* SCREEN-ONLY INTERACTIVE APPLICATION (Completely hidden in Print / PDF) */}
      <div className="screen-only min-h-screen bg-slate-100 flex flex-col font-sans">
        {/* Top Navigation Bar */}
      <header className="no-print bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-inner">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight">Maharashtra Leave & Licence Generator</h1>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] px-2 py-0.5 rounded-full font-semibold">
                  🛡️ Pro-Licensee Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">Maharashtra Rent Control Act Sec 55 Compliant</p>
            </div>
          </div>

          {/* Quick preset buttons and print */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-md border border-slate-700">
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                  language === 'mr' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
                title="मराठी भाषेतील करारनामा (Maharashtra Standard)"
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                  language === 'hi' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
                title="हिंदी में इकरारनामा"
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition ${
                  language === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
                title="English Legal Draft"
              >
                English
              </button>
            </div>

            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-700 hover:bg-indigo-600 text-white rounded-md border border-indigo-500 transition flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" /> What Was Wrong in Owner's Draft?
            </button>
            <button
              onClick={() => setAgreement(sampleCommercialAgreement)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition"
              title="Loads the Khamgaon gym agreement with corrected dates & licensee protective terms"
            >
              🏢 Load Khamgaon Agreement
            </button>
            <button
              onClick={() => setAgreement(prev => ({ ...prev, stampPaperSpace: !prev.stampPaperSpace }))}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition ${
                agreement.stampPaperSpace 
                  ? 'bg-amber-600 border-amber-500 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📜 Stamp Paper Mode: {agreement.stampPaperSpace ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={handleDownloadDirectPdf}
              disabled={isGeneratingPdf}
              className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-md flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
              title="Downloads crisp A4 PDF directly with exact 15mm margins"
            >
              <Download className="w-4 h-4" /> {isGeneratingPdf ? 'Saving PDF...' : 'Download PDF (Exact A4)'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-4 h-4" /> Print / Save via Browser
            </button>
          </div>
        </div>
      </header>

      {/* Main split screen layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Form Editor (42% width on desktop) */}
        <div className="no-print lg:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden max-h-[calc(100vh-6rem)]">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('protections')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                activeTab === 'protections' 
                  ? 'border-amber-600 text-amber-700 bg-white font-bold' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-600" /> Licensee Rights (Gym)
            </button>
            <button
              onClick={() => setActiveTab('parties')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                activeTab === 'parties' 
                  ? 'border-indigo-600 text-indigo-700 bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" /> Parties
            </button>
            <button
              onClick={() => setActiveTab('property')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                activeTab === 'property' 
                  ? 'border-indigo-600 text-indigo-700 bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" /> Property
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                activeTab === 'dates' 
                  ? 'border-indigo-600 text-indigo-700 bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" /> Dates & Term
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                activeTab === 'financials' 
                  ? 'border-indigo-600 text-indigo-700 bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <IndianRupee className="w-4 h-4" /> Rent & Deposit
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* PROTECTIONS TAB (High Priority for Licensee Deep Sunil Sapkal) */}
            {activeTab === 'protections' && (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-300 p-3.5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-600" /> Licensee Protection Shield
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreement.licenseeProtections?.enabled}
                        onChange={(e) => updateProtection('enabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    These specialized clauses safeguard <strong>Deep Sunil Sapkal & Gauravsingh Darshansingh Thakur (Licensees)</strong> from sudden eviction, unfair ₹3000/day penalties, loss of expensive gym equipment, and withheld deposits.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Protection 1 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.simultaneousDepositRefund}
                      onChange={(e) => updateProtection('simultaneousDepositRefund', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">1. Deposit Refund Guarantee (Within 7-10 Days of Handover)</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Owner must return ₹1,23,000/- within 7-10 days of taking possession back. If delayed, owner pays 18% penal interest, and you can stay rent-free until paid.
                      </p>
                    </div>
                  </label>

                  {/* Protection 2 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.rightOfRenewal}
                      onChange={(e) => updateProtection('rightOfRenewal', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">2. Right of Renewal (First Right to Renew)</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Protects your gym investment and members. You get first right to renew for 1-2 more terms with rent increase capped at 5% max.
                      </p>
                    </div>
                  </label>

                  {/* Protection 3 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.rightToInstallAndRemoveFixtures}
                      onChange={(e) => updateProtection('rightToInstallAndRemoveFixtures', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">3. Right to Install & Remove Gym Machinery</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Express permission to install gym machines, rubber flooring, mirrors, partitions, ACs, and the legal right to take everything back when leaving.
                      </p>
                    </div>
                  </label>

                  {/* Protection 4 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.signboardRight}
                      onChange={(e) => updateProtection('signboardRight', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">4. Exterior Signboard & Branding Permission</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Full right to put up your gym glow-sign / LED banner on the building facade and entrance without landlord demanding extra money.
                      </p>
                    </div>
                  </label>

                  {/* Protection 5 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.electricalLoadGuarantee}
                      onChange={(e) => updateProtection('electricalLoadGuarantee', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">5. 3-Phase Power & Mandatory Owner NOC</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Owner warrants 3-phase commercial power for gym equipment and is legally bound to provide NOCs for GST, Shop Act, and load enhancements within 7 days.
                      </p>
                    </div>
                  </label>

                  {/* Protection 6 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.inspectionNotice}
                      onChange={(e) => updateProtection('inspectionNotice', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">6. 24-Hour Notice for Landlord Entry</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Owner cannot barge into the gym unannounced. Must give 24 hours prior written notice during daytime business hours (protects client privacy).
                      </p>
                    </div>
                  </label>

                  {/* Protection 7 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.structuralRepairsByOwner}
                      onChange={(e) => updateProtection('structuralRepairsByOwner', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">7. Owner Responsible for Roof & Structural Leaks</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Owner is solely responsible for roof seepage, building cracks, external drainage, and municipal property taxes.
                      </p>
                    </div>
                  </label>

                  {/* Protection 8 */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreement.licenseeProtections?.forceMajeureRentWaiver}
                      onChange={(e) => updateProtection('forceMajeureRentWaiver', e.target.checked)}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">8. Force Majeure / Lockdown Rent Relief</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        If government imposes restrictions/lockdowns or structural danger stops gym operations, rent is waived/abated for that period.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* PARTIES TAB */}
            {activeTab === 'parties' && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600" /> Agreement Place & Date
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Place (City/Town)</label>
                      <input
                        type="text"
                        value={agreement.agreementPlace}
                        onChange={(e) => updateField(null, 'agreementPlace', e.target.value)}
                        placeholder="e.g. KHAMGAON"
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Agreement Date</label>
                      <input
                        type="date"
                        value={agreement.executionDate}
                        onChange={(e) => updateField(null, 'executionDate', e.target.value)}
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Licensor (Owner) */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-indigo-600" /> Licensor (Property Owner)
                    </h3>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">FIRST PART</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={agreement.licensor.fullName}
                        onChange={(e) => updateField('licensor', 'fullName', e.target.value)}
                        placeholder="e.g. Saurabh Satish Dude"
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Age</label>
                        <input
                          type="number"
                          value={agreement.licensor.age}
                          onChange={(e) => updateField('licensor', 'age', e.target.value)}
                          placeholder="e.g. 33"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Occupation</label>
                        <input
                          type="text"
                          value={agreement.licensor.occupation}
                          onChange={(e) => updateField('licensor', 'occupation', e.target.value)}
                          placeholder="e.g. Business / Service"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Permanent Residential Address</label>
                      <input
                        type="text"
                        value={agreement.licensor.address}
                        onChange={(e) => updateField('licensor', 'address', e.target.value)}
                        placeholder="e.g. R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana"
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Aadhaar Card No.</label>
                        <input
                          type="text"
                          value={agreement.licensor.aadhaarNumber}
                          onChange={(e) => updateField('licensor', 'aadhaarNumber', e.target.value)}
                          placeholder="xxxx xxxx xxxx"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">PAN No. (Optional)</label>
                        <input
                          type="text"
                          value={agreement.licensor.panNumber}
                          onChange={(e) => updateField('licensor', 'panNumber', e.target.value)}
                          placeholder="ABCDE1234F"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Licensee (Tenant 1) */}
                <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-600" /> Licensee 1 (Deep Sunil Sapkal)
                    </h3>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">PRIMARY LICENSEE</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={agreement.licensee.fullName}
                        onChange={(e) => updateField('licensee', 'fullName', e.target.value)}
                        placeholder="e.g. Deep Sunil Sapkal"
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Age</label>
                        <input
                          type="number"
                          value={agreement.licensee.age}
                          onChange={(e) => updateField('licensee', 'age', e.target.value)}
                          placeholder="e.g. 25"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Occupation</label>
                        <input
                          type="text"
                          value={agreement.licensee.occupation}
                          onChange={(e) => updateField('licensee', 'occupation', e.target.value)}
                          placeholder="e.g. Business / Gym Owner"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">Permanent Residential Address</label>
                      <input
                        type="text"
                        value={agreement.licensee.address}
                        onChange={(e) => updateField('licensee', 'address', e.target.value)}
                        placeholder="e.g. R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana"
                        className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Aadhaar Card No.</label>
                        <input
                          type="text"
                          value={agreement.licensee.aadhaarNumber}
                          onChange={(e) => updateField('licensee', 'aadhaarNumber', e.target.value)}
                          placeholder="xxxx xxxx xxxx"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">PAN No. (Optional)</label>
                        <input
                          type="text"
                          value={agreement.licensee.panNumber}
                          onChange={(e) => updateField('licensee', 'panNumber', e.target.value)}
                          placeholder="FGHIJ5678K"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Licensee (Co-Licensee - Gauravsingh Darshansingh Thakur) */}
                <div className="bg-white p-4 rounded-lg border border-teal-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-teal-600" /> Second Licensee (Gauravsingh Darshansingh Thakur)
                    </h3>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreement.secondLicensee?.enabled}
                        onChange={(e) => updateField('secondLicensee', 'enabled', e.target.checked)}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-xs font-semibold text-teal-800">Include Second Licensee</span>
                    </label>
                  </div>

                  {agreement.secondLicensee?.enabled && (
                    <div className="space-y-3 pt-2 border-t border-teal-100">
                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={agreement.secondLicensee?.fullName || ''}
                          onChange={(e) => updateField('secondLicensee', 'fullName', e.target.value)}
                          placeholder="e.g. Gauravsingh Darshansingh Thakur"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold text-slate-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-slate-600 block mb-1">Age</label>
                          <input
                            type="number"
                            value={agreement.secondLicensee?.age || ''}
                            onChange={(e) => updateField('secondLicensee', 'age', e.target.value)}
                            placeholder="e.g. 26"
                            className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 block mb-1">Occupation</label>
                          <input
                            type="text"
                            value={agreement.secondLicensee?.occupation || ''}
                            onChange={(e) => updateField('secondLicensee', 'occupation', e.target.value)}
                            placeholder="e.g. Business / Gym Partner"
                            className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 block mb-1">Permanent Residential Address</label>
                        <input
                          type="text"
                          value={agreement.secondLicensee?.address || ''}
                          onChange={(e) => updateField('secondLicensee', 'address', e.target.value)}
                          placeholder="e.g. R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana"
                          className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-slate-600 block mb-1">Aadhaar Card No.</label>
                          <input
                            type="text"
                            value={agreement.secondLicensee?.aadhaarNumber || ''}
                            onChange={(e) => updateField('secondLicensee', 'aadhaarNumber', e.target.value)}
                            placeholder="xxxx xxxx xxxx"
                            className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 block mb-1">PAN No. (Optional)</label>
                          <input
                            type="text"
                            value={agreement.secondLicensee?.panNumber || ''}
                            onChange={(e) => updateField('secondLicensee', 'panNumber', e.target.value)}
                            placeholder="FGHIJ5678K"
                            className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROPERTY TAB */}
            {activeTab === 'property' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Property Type</label>
                    <select
                      value={agreement.propertyType}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAgreement(prev => ({
                          ...prev,
                          propertyType: val,
                          propertyLabel: val === 'Commercial' ? 'SAID SHOP/PREMISES' : 'SAID FLAT/PREMISES'
                        }));
                      }}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Commercial">Commercial (Shop / Gym / Office)</option>
                      <option value="Residential">Residential (Flat / House)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Permitted Purpose</label>
                    <input
                      type="text"
                      value={agreement.purpose}
                      onChange={(e) => updateField(null, 'purpose', e.target.value)}
                      placeholder="e.g. Gymnasium & Fitness Club"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">Location / Area Address</label>
                  <input
                    type="text"
                    value={agreement.property.location}
                    onChange={(e) => updateField('property', 'location', e.target.value)}
                    placeholder="e.g. Ghatpuri Naka Khamgaon, Tq. Khamgaon, Dist. Buldana"
                    className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Survey No. / CTS</label>
                    <input
                      type="text"
                      value={agreement.property.surveyNo}
                      onChange={(e) => updateField('property', 'surveyNo', e.target.value)}
                      placeholder="e.g. 68/5"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Layout Plot No.</label>
                    <input
                      type="text"
                      value={agreement.property.layoutPlotNo}
                      onChange={(e) => updateField('property', 'layoutPlotNo', e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">NA / Collector Sanction Details</label>
                  <textarea
                    rows={3}
                    value={agreement.property.naOrderDetails}
                    onChange={(e) => updateField('property', 'naOrderDetails', e.target.value)}
                    className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Building / Complex Name</label>
                    <input
                      type="text"
                      value={agreement.property.buildingName}
                      onChange={(e) => updateField('property', 'buildingName', e.target.value)}
                      placeholder="e.g. R.K. Sankul"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Unit / Shop No.</label>
                    <input
                      type="text"
                      value={agreement.property.unitNumber}
                      onChange={(e) => updateField('property', 'unitNumber', e.target.value)}
                      placeholder="e.g. Commercial Shop No. 29"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Area</label>
                    <input
                      type="text"
                      value={agreement.property.unitArea}
                      onChange={(e) => updateField('property', 'unitArea', e.target.value)}
                      placeholder="e.g. 3200.00 sq.fts"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Floor</label>
                    <input
                      type="text"
                      value={agreement.property.floor}
                      onChange={(e) => updateField('property', 'floor', e.target.value)}
                      placeholder="e.g. First Floor"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Boundaries */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Boundaries (Four Sides)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">East</label>
                      <input
                        type="text"
                        value={agreement.property.boundaries?.east || ''}
                        onChange={(e) => updateBoundary('east', e.target.value)}
                        className="w-full text-sm px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">West</label>
                      <input
                        type="text"
                        value={agreement.property.boundaries?.west || ''}
                        onChange={(e) => updateBoundary('west', e.target.value)}
                        className="w-full text-sm px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">North</label>
                      <input
                        type="text"
                        value={agreement.property.boundaries?.north || ''}
                        onChange={(e) => updateBoundary('north', e.target.value)}
                        className="w-full text-sm px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">South</label>
                      <input
                        type="text"
                        value={agreement.property.boundaries?.south || ''}
                        onChange={(e) => updateBoundary('south', e.target.value)}
                        className="w-full text-sm px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DATES & TERM TAB */}
            {activeTab === 'dates' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Duration (Months)</label>
                    <input
                      type="number"
                      value={agreement.durationMonths}
                      onChange={(e) => updateField(null, 'durationMonths', e.target.value)}
                      placeholder="e.g. 11"
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Commencement Date</label>
                    <input
                      type="date"
                      value={agreement.startDate}
                      onChange={(e) => updateField(null, 'startDate', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">
                      Expiry Date <span className="text-emerald-600 font-semibold">(Auto-calculated)</span>
                    </label>
                    <input
                      type="date"
                      value={agreement.endDate}
                      disabled
                      className="w-full text-sm px-3 py-1.5 border rounded-md bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">
                      Date of Handover of Possession
                    </label>
                    <input
                      type="date"
                      value={agreement.possessionDate}
                      onChange={(e) => updateField(null, 'possessionDate', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Lock-In Period (Months)</label>
                    <input
                      type="number"
                      value={agreement.financials.lockInPeriodMonths || 6}
                      onChange={(e) => updateField('financials', 'lockInPeriodMonths', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">Neither party can terminate during lock-in</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Notice Period (Days)</label>
                    <input
                      type="number"
                      value={agreement.financials.noticePeriodDays || 60}
                      onChange={(e) => updateField('financials', 'noticePeriodDays', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">60 days gives gym time to transition</span>
                  </div>
                </div>
              </div>
            )}

            {/* RENT & DEPOSIT TAB */}
            {activeTab === 'financials' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Monthly License Fee (₹)</label>
                    <input
                      type="number"
                      value={agreement.financials.monthlyRent}
                      onChange={(e) => updateField('financials', 'monthlyRent', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-indigo-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Payment Due Day</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={agreement.financials.rentDueDay}
                      onChange={(e) => updateField('financials', 'rentDueDay', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Grace Period (Days)</label>
                    <input
                      type="number"
                      value={agreement.financials.gracePeriodDays || 7}
                      onChange={(e) => updateField('financials', 'gracePeriodDays', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">No penalty during grace period</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Late Fee After Grace (₹/day)</label>
                    <input
                      type="number"
                      value={agreement.financials.lateRentPenaltyPerDay || 100}
                      onChange={(e) => updateField('financials', 'lateRentPenaltyPerDay', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">Reasonable (Replaced owner's ₹3000/day)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-600">Refundable Security Deposit (₹)</label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">Quick set:</span>
                      <button
                        type="button"
                        onClick={() => updateField('financials', 'securityDeposit', 123000)}
                        className={`text-[11px] px-2 py-0.5 rounded font-bold border transition ${
                          agreement.financials.securityDeposit === 123000
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                        }`}
                      >
                        ₹1,23,000 (Current)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField('financials', 'securityDeposit', 120000)}
                        className={`text-[11px] px-2 py-0.5 rounded font-bold border transition ${
                          agreement.financials.securityDeposit === 120000
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                        }`}
                      >
                        ₹1,20,000
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={agreement.financials.securityDeposit}
                    onChange={(e) => updateField('financials', 'securityDeposit', Number(e.target.value) || 0)}
                    className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-emerald-700"
                  />
                  <div className="mt-1.5 bg-emerald-50 border border-emerald-200 rounded p-2 text-[11px] text-emerald-900 leading-relaxed">
                    <strong>🛡️ Return of Deposit on Possession:</strong> Upon taking back possession of the premises, the entire deposit amount of <strong>₹{Number(agreement.financials.securityDeposit).toLocaleString('en-IN')}/-</strong> must be refunded to the licensees strictly within <strong>7 to 10 days</strong>. If delayed beyond 10 days, the Licensor pays 18% p.a. interest.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Renewal Rent Hike (%)</label>
                    <input
                      type="number"
                      value={agreement.financials.renewalEscalationPct || 5}
                      onChange={(e) => updateField('financials', 'renewalEscalationPct', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">Capped (Owner cannot double rent)</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Overstay Damages (₹/day)</label>
                    <input
                      type="number"
                      value={agreement.financials.overstayDamagesPerDay || 2500}
                      onChange={(e) => updateField('financials', 'overstayDamagesPerDay', e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Footer Action Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="hover:text-indigo-600 flex items-center gap-1 font-medium transition"
              >
                <Download className="w-3.5 h-3.5" /> Backup (JSON)
              </button>
              <span>|</span>
              <label className="hover:text-indigo-600 flex items-center gap-1 font-medium cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" /> Restore
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>

            <button
              onClick={() => {
                const text = document.querySelector('.agreement-sheet')?.innerText || '';
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied to Clipboard!' : 'Copy Agreement Text'}
            </button>
          </div>
        </div>

        {/* Right column: Document Live Preview (58% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Preview:</span>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setLanguage('mr')}
                  className={`px-3 py-1 text-xs font-bold rounded-l-md border transition ${
                    language === 'mr' 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  मराठी
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 text-xs font-bold border-t border-b transition ${
                    language === 'hi' 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-r-md border transition ${
                    language === 'en' 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Margin selector */}
              <div className="flex items-center gap-1 bg-white border border-slate-300 px-2 py-1 rounded text-xs shadow-sm">
                <span className="text-slate-500 font-medium">Margin:</span>
                <select
                  value={pdfMarginMm}
                  onChange={(e) => setPdfMarginMm(Number(e.target.value))}
                  className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value={15}>15mm (Standard Legal)</option>
                  <option value={12}>12mm (Compact)</option>
                  <option value={18}>18mm (Spacious)</option>
                  <option value={10}>10mm (Narrow)</option>
                </select>
              </div>

              <button
                onClick={handleDownloadDirectPdf}
                disabled={isGeneratingPdf}
                className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
                title="Generates and directly saves A4 PDF file with exact millimeter margins"
              >
                <Download className="w-3.5 h-3.5" /> {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF File (Exact A4)'}
              </button>
              
              <button
                onClick={handlePrint}
                className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded shadow-sm flex items-center gap-1 transition"
                title="Print via browser dialog"
              >
                <Printer className="w-3.5 h-3.5" /> Browser Print
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-12 flex flex-col items-center">
            {/* A4 Format Notice */}
            <div className="no-print w-full max-w-4xl bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-2.5 text-xs mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                📄 <strong>A4 Page Accurate:</strong> In your browser print dialog, choose <strong>"Save as PDF"</strong>, Paper size <strong>"A4"</strong>, Margins <strong>"Default"</strong>.
              </span>
              <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-bold">210mm × 297mm</span>
            </div>

            <div id="screen-agreement-preview" className="w-full flex justify-center">
              {language === 'mr' ? (
                <AgreementDocumentMr agreement={agreement} />
              ) : language === 'hi' ? (
                <AgreementDocumentHi agreement={agreement} />
              ) : (
                <AgreementDocument agreement={agreement} />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  Owner's Draft Traps vs. Corrected Licensee Protection
                </h3>
                <p className="text-xs text-slate-300">Why the original draft was extremely dangerous for Deep Sunil Sapkal (Licensee)</p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 1. Absurd ₹3,000/day Late Penalty & Instant Cancellation (Clause 4)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> If rent is 1 day late after the 5th, you pay ₹3,000/day! That's ₹30,000 extra for 10 days delay on ₹41,000 rent. And the owner had the right to cancel immediately without notice.</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> 7-day grace period, delay interest reduced to ₹100/day, and owner must give 15 days written cure notice before any termination.</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 2. Unilateral 15-Day Eviction Clause (Clause 19)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> *"The licensor reserves his right to terminate the agreement as and when found necessary with a fifteen days' prior notice... and licensee undertakes that he will not object."* The owner could literally kick your gym out in 15 days whenever he felt like it!</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Omitted this trap completely. Inserted a 6-month Lock-In period and a balanced 60-day notice period so your gym business is secure.</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 3. Unprotected ₹1,23,000/- Security Deposit (Clause 1)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> Stated the deposit would be refunded "after expiry", with no specific date or penalties. Landlords commonly delay refunds for months.</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Must be refunded <strong>strictly within 7-10 days of taking possession back</strong>. If owner delays, he must pay 18% penal interest and you can retain possession rent-free!</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 4. Zero Renewal Rights for Gym Business (Clause 8)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> Entire discretion was with the owner. After spending lakhs on gym setup and getting annual member subscriptions, the owner could evict or demand exorbitant rent after 11 months.</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Granted you the <strong>First Option to Renew</strong> with rent increase capped at 5%.</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 5. Missing Trade Fixtures & Signage Rights (Clause 15)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> Stated premises taken "as-is-where-is" and prohibited alterations without prior permission, giving no right to take away equipment or put signboards.</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Explicitly authorizes installing gym machines, rubber mats, mirrors, partitions, ACs, exterior LED banners, and the full right to remove all your property when leaving.</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 6. 3-Phase Power Guarantee & Owner NOC (Clause 11)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> No guarantee of adequate commercial load for heavy gym ACs and machines. No obligation to sign NOCs for your GST or Shop Act registration.</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Owner legally warrants 3-phase commercial load and agrees to provide signed NOCs within 7 days.</p>
              </div>

              <div className="border border-red-200 bg-red-50/40 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm mb-1">🚨 7. Unrestricted Landlord Entry (Clause 5)</div>
                <p className="text-slate-700"><strong>Owner's Draft:</strong> Owner could enter "at any time suitable to him" - completely violating member privacy (especially female gym members).</p>
                <p className="text-emerald-700 font-semibold mt-1">✅ <strong>Corrected in Your Favor:</strong> Owner must provide at least 24 hours prior written appointment during daytime business hours.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs"
              >
                Got It, Return to Agreement
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* DEDICATED PRINT-ONLY CONTAINER (Invisible on screen, ONLY element printed to PDF) */}
      <div className="print-only-document">
        {language === 'mr' ? (
          <AgreementDocumentMr agreement={agreement} />
        ) : language === 'hi' ? (
          <AgreementDocumentHi agreement={agreement} />
        ) : (
          <AgreementDocument agreement={agreement} />
        )}
      </div>
    </>
  );
}
