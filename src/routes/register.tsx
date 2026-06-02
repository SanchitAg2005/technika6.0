import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles, User, GraduationCap, Calendar, CheckSquare, RefreshCw, CreditCard, Image as ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Student Registration | Technica 6.0" },
      { name: "description", content: "Register for competitions and workshops at Technica 6.0 (Avinya)." },
    ],
  }),
});

interface RegistrationForm {
  name: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
  institution: string;
  program: string;
  academicLevel: string;
  selectedEvents: string[];
}

const DEFAULT_FORM: RegistrationForm = {
  name: "",
  gender: "",
  age: "",
  email: "",
  phone: "",
  institution: "",
  program: "",
  academicLevel: "",
  selectedEvents: [],
};

// Custom Vector QR Code component for visual excellence
function MockQRCode() {
  const navy = "#013C58";
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40 text-[#013C58] transition-transform duration-500 hover:scale-102" fill="currentColor">
      {/* Outer framing */}
      <rect x="0" y="0" width="100" height="100" fill="none" stroke={navy} strokeWidth="1.5" />
      {/* Corners (Standard QR identifiers) */}
      <rect x="4" y="4" width="22" height="22" fill="none" stroke={navy} strokeWidth="3" />
      <rect x="9" y="9" width="12" height="12" fill={navy} />
      
      <rect x="74" y="4" width="22" height="22" fill="none" stroke={navy} strokeWidth="3" />
      <rect x="79" y="9" width="12" height="12" fill={navy} />
      
      <rect x="4" y="74" width="22" height="22" fill="none" stroke={navy} strokeWidth="3" />
      <rect x="9" y="79" width="12" height="12" fill={navy} />
      
      {/* Center Alignment square */}
      <rect x="74" y="74" width="10" height="10" fill="none" stroke={navy} strokeWidth="2" />
      <rect x="78" y="78" width="2" height="2" fill={navy} />
      
      {/* Random simulated code dots */}
      <rect x="36" y="4" width="6" height="4" />
      <rect x="48" y="8" width="10" height="3" />
      <rect x="36" y="16" width="18" height="4" />
      <rect x="62" y="12" width="6" height="14" />
      <rect x="36" y="28" width="12" height="8" />
      <rect x="4" y="36" width="14" height="4" />
      <rect x="24" y="40" width="4" height="20" />
      <rect x="36" y="48" width="20" height="4" />
      <rect x="68" y="40" width="8" height="8" />
      <rect x="82" y="36" width="4" height="14" />
      <rect x="90" y="48" width="6" height="4" />
      <rect x="48" y="60" width="10" height="10" />
      <rect x="68" y="60" width="4" height="14" />
      <rect x="36" y="80" width="22" height="4" />
      <rect x="18" y="64" width="4" height="4" />
      <rect x="80" y="88" width="16" height="4" />
      <rect x="90" y="72" width="4" height="10" />
    </svg>
  );
}

function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationForm>(DEFAULT_FORM);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Load draft text from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ta_registration_draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading registration draft", e);
      }
    }
  }, []);

  // Save draft text to localStorage on change
  useEffect(() => {
    localStorage.setItem("ta_registration_draft", JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof RegistrationForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEventSelection = (eventId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedEvents.includes(eventId);
      const selectedEvents = isSelected
        ? prev.selectedEvents.filter((id) => id !== eventId)
        : [...prev.selectedEvents, eventId];
      return { ...prev, selectedEvents };
    });
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotName("");
  };

  // Pricing structure: ₹150 base entry fee + ₹50 per selected event
  const baseFee = 150;
  const eventFeeRate = 50;
  const totalFee = baseFee + (formData.selectedEvents.length * eventFeeRate);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear your current registration details?")) {
      setFormData(DEFAULT_FORM);
      setScreenshot(null);
      setScreenshotName("");
      localStorage.removeItem("ta_registration_draft");
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockRef = `TA-${Math.floor(10000 + Math.random() * 90000)}`;
    setReferenceId(mockRef);
    setIsSubmitted(true);
    localStorage.removeItem("ta_registration_draft");
  };

  // Step config
  const steps = [
    { num: 1, label: "Personal", icon: User },
    { num: 2, label: "Academic", icon: GraduationCap },
    { num: 3, label: "Events", icon: Calendar },
    { num: 4, label: "Payment", icon: CreditCard },
    { num: 5, label: "Review", icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFBA42] via-[#00537A] to-[#013C58] text-[#013C58] flex flex-col justify-between p-6 md:p-12 transition-all duration-500">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between border-b border-white/20 pb-6 mb-8">
        <Link to="/" className="flex flex-col text-left transition-opacity hover:opacity-90">
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] font-bold text-white leading-tight uppercase">
            TECHNICA 6.0
          </span>
          <span className="font-sanskrit text-[0.65rem] sm:text-[0.7rem] tracking-[0.05em] text-[#FFD35B] font-semibold mt-0.5">
            EVENT REGISTRATION (AVINYĀ)
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-wider text-[#A8E8F9] hover:text-[#FFD35B] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Back Home
        </Link>
      </header>

      {/* Main Form Box */}
      <main className="flex-grow w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-4">
        <div className="w-full backdrop-blur-lg bg-white/75 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl">
          {!isSubmitted ? (
            <>
              {/* Progress Steps Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[#00537A]/15 pb-6 mb-8 overflow-x-auto">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.num}
                      className={`flex items-center gap-2 shrink-0 pb-1 border-b-2 transition-all duration-300 ${
                        step === s.num
                          ? "border-[#F5A201] text-[#F5A201] font-bold"
                          : step > s.num
                          ? "border-[#00537A] text-[#00537A] font-semibold"
                          : "border-transparent text-[#013C58]/40 font-medium"
                      }`}
                    >
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${
                        step === s.num
                          ? "bg-[#F5A201] text-white"
                          : step > s.num
                          ? "bg-[#00537A] text-white"
                          : "bg-white/50 border border-current"
                      }`}>
                        {s.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider hidden sm:inline">{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Form Step Body */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00537A] mb-2">
                        Step 1: Personal Information
                      </h2>

                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="e.g. Ramesh Chandra"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                      </div>

                      {/* Gender Select */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Gender</label>
                          <select
                            required
                            value={formData.gender}
                            onChange={(e) => updateField("gender", e.target.value)}
                            className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Required Age field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Age</label>
                          <input
                            type="number"
                            required
                            min="5"
                            max="100"
                            value={formData.age}
                            onChange={(e) => updateField("age", e.target.value)}
                            placeholder="e.g. 18"
                            className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="e.g. ramesh@gmail.com"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00537A] mb-2">
                        Step 2: Academic Details (Institution Agnostic)
                      </h2>

                      {/* Academic Institution */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Academic Institution</label>
                        <input
                          type="text"
                          required
                          value={formData.institution}
                          onChange={(e) => updateField("institution", e.target.value)}
                          placeholder="Enter your school, college, university, or institute name"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                        <span className="text-[9px] text-[#013C58]/55 font-bold block mt-0.5 leading-relaxed">
                          Examples: DAV Public School, Kerala Samajam Model School, Arka Jain University
                        </span>
                      </div>

                      {/* Academic Program / Stream */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Academic Program / Stream</label>
                        <input
                          type="text"
                          required
                          value={formData.program}
                          onChange={(e) => updateField("program", e.target.value)}
                          placeholder="e.g. Science, Commerce, BTech CSE, BCA, MTech"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                        <span className="text-[9px] text-[#013C58]/55 font-bold block mt-0.5 leading-relaxed">
                          Examples: <span className="text-[#00537A]">School:</span> Science, Commerce, Arts, PCB, PCM | <span className="text-[#00537A]">College:</span> BCA, BTech CSE, BTech AIML, BA, BCom, LLB, MTech
                        </span>
                      </div>

                      {/* Current Academic Level */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#013C58]/70">Current Academic Level</label>
                        <input
                          type="text"
                          required
                          value={formData.academicLevel}
                          onChange={(e) => updateField("academicLevel", e.target.value)}
                          placeholder="e.g. Class 10, Class 12, Semester 3, Third Year"
                          className="bg-white/80 border border-[#00537A]/25 rounded-lg px-4 py-3 text-xs font-semibold placeholder-[#013C58]/35 text-[#013C58] focus:outline-none focus:border-[#F5A201] focus:ring-1 focus:ring-[#F5A201] transition-all"
                        />
                        <span className="text-[9px] text-[#013C58]/55 font-bold block mt-0.5 leading-relaxed">
                          Examples: <span className="text-[#00537A]">School:</span> Class 8, Class 9, Class 10, Class 11, Class 12 | <span className="text-[#00537A]">College:</span> Semester 1, Semester 2, Semester 3, Semester 6 | <span className="text-[#00537A]">University:</span> First/Second/Third/Fourth Year
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#00537A]">
                          Step 3: Select Events
                        </h2>
                        <span className="text-[10px] font-bold uppercase text-[#F5A201] bg-white/60 border border-[#00537A]/15 px-3 py-1 rounded-full">
                          {formData.selectedEvents.length} Selected
                        </span>
                      </div>

                      {/* Event Grid Select List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
                        {events.map((event) => {
                          const isSelected = formData.selectedEvents.includes(event.id);
                          return (
                            <div
                              key={event.id}
                              onClick={() => toggleEventSelection(event.id)}
                              className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all duration-300 ${
                                isSelected
                                  ? "bg-white/95 border-[#F5A201] shadow-[0_5px_15px_rgba(245,162,1,0.08)]"
                                  : "bg-white/40 border-[#00537A]/15 hover:border-[#00537A]/30 hover:bg-white/55"
                              }`}
                            >
                              <div className={`mt-0.5 h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-[#F5A201] border-[#F5A201] text-white" : "border-[#013C58]/30"
                              }`}>
                                {isSelected && <Check size={12} />}
                              </div>
                              <div className="text-left leading-tight">
                                <p className="text-xs font-bold text-[#013C58]">{event.name}</p>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#00537A] mt-1 block">
                                  {event.category}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00537A] mb-2">
                        Step 4: Fee Breakdown & UPI Payment
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* QR Placeholder card */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center bg-white/50 border border-[#00537A]/15 rounded-2xl p-6 shadow-sm">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00537A] mb-4">
                            Scan to pay
                          </span>
                          <div className="bg-white p-3.5 rounded-xl border border-[#00537A]/15 shadow-inner">
                            <MockQRCode />
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-[#013C58]/40 mt-4">
                            ITS Technical Association UPI
                          </span>
                        </div>

                        {/* Payment guidelines */}
                        <div className="md:col-span-7 flex flex-col justify-between">
                          <div className="flex flex-col gap-4">
                            {/* Fee Breakdown Table */}
                            <div className="bg-white/60 border border-[#00537A]/15 rounded-xl p-4 text-xs">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-[#00537A] border-b border-[#00537A]/15 pb-1 mb-2">
                                Registration Fee Breakdown
                              </p>
                              <div className="flex justify-between py-1 font-semibold text-[#013C58]/80">
                                <span>Base Entry Fee:</span>
                                <span>₹{baseFee}</span>
                              </div>
                              <div className="flex justify-between py-1 font-semibold text-[#013C58]/80">
                                <span>Selected Events ({formData.selectedEvents.length} × ₹{eventFeeRate}):</span>
                                <span>₹{formData.selectedEvents.length * eventFeeRate}</span>
                              </div>
                              <div className="flex justify-between border-t border-[#00537A]/15 pt-2.5 mt-1 text-sm font-bold text-[#013C58]">
                                <span>Total Fee to Pay:</span>
                                <span className="text-[#F5A201]">₹{totalFee}</span>
                              </div>
                            </div>

                            {/* Instructions list */}
                            <div className="text-left text-xs font-semibold leading-relaxed text-[#013C58]/95">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-[#00537A] mb-1">
                                Payment Steps:
                              </p>
                              <ol className="list-decimal pl-4 flex flex-col gap-1 text-[#013C58]/70 font-medium">
                                <li>Scan the UPI QR code using GPay, PhonePe, Paytm, or BHIM.</li>
                                <li>Complete the payment of **₹{totalFee}**.</li>
                                <li>Capture a clear screenshot of the successful transaction page.</li>
                                <li>Upload the receipt screenshot below to register.</li>
                              </ol>
                            </div>
                          </div>

                          {/* Screenshot upload UI */}
                          <div className="mt-4 pt-4 border-t border-[#00537A]/15">
                            {!screenshot ? (
                              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#00537A]/30 hover:border-[#F5A201] rounded-xl p-6 bg-white/30 cursor-pointer transition-all duration-300 group">
                                <ImageIcon className="h-8 w-8 text-[#00537A] group-hover:text-[#F5A201] mb-2 transition-colors" />
                                <span className="text-xs font-bold text-[#013C58]">Upload Payment Screenshot</span>
                                <span className="text-[9px] font-semibold text-[#013C58]/40 uppercase tracking-widest mt-1">
                                  JPEG / PNG file format
                                </span>
                                <input
                                  type="file"
                                  required
                                  accept="image/*"
                                  onChange={handleScreenshotUpload}
                                  className="hidden"
                                />
                              </label>
                            ) : (
                              <div className="flex items-center justify-between bg-white/60 border border-[#00537A]/20 rounded-xl p-3.5 shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg overflow-hidden border border-[#00537A]/15 shrink-0 bg-white">
                                    <img src={screenshot} alt="Receipt preview" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="text-left leading-tight">
                                    <p className="text-xs font-bold text-[#013C58] truncate max-w-[150px] sm:max-w-[240px]">
                                      {screenshotName}
                                    </p>
                                    <span className="text-[9px] font-bold text-[#00537A] uppercase tracking-wider block mt-0.5">
                                      Screenshot Loaded
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={removeScreenshot}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00537A] mb-2">
                        Step 5: Review Registration
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left column details */}
                        <div className="md:col-span-8 flex flex-col gap-4 bg-white/60 border border-[#00537A]/15 rounded-xl p-5 text-xs">
                          {/* Personal section */}
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#00537A] border-b border-[#00537A]/15 pb-1 mb-2">
                              Personal Details
                            </p>
                            <div className="grid grid-cols-2 gap-y-2 font-bold text-[#013C58]">
                              <span className="font-semibold text-[#013C58]/60">Full Name:</span>
                              <span>{formData.name || "-"}</span>

                              <span className="font-semibold text-[#013C58]/60">Gender / Age:</span>
                              <span>{formData.gender || "-"} {formData.age ? `(${formData.age} years old)` : ""}</span>

                              <span className="font-semibold text-[#013C58]/60">Email:</span>
                              <span className="break-all">{formData.email || "-"}</span>

                              <span className="font-semibold text-[#013C58]/60">Phone:</span>
                              <span>{formData.phone || "-"}</span>
                            </div>
                          </div>

                          {/* Academic section */}
                          <div className="mt-2">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#00537A] border-b border-[#00537A]/15 pb-1 mb-2">
                              Academic Details
                            </p>
                            <div className="grid grid-cols-2 gap-y-2 font-bold text-[#013C58]">
                              <span className="font-semibold text-[#013C58]/60">Institution:</span>
                              <span>{formData.institution || "-"}</span>

                              <span className="font-semibold text-[#013C58]/60">Program / Stream:</span>
                              <span>{formData.program || "-"}</span>

                              <span className="font-semibold text-[#013C58]/60">Academic Level:</span>
                              <span>{formData.academicLevel || "-"}</span>
                            </div>
                          </div>

                          {/* Events selected */}
                          <div className="mt-2">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#00537A] border-b border-[#00537A]/15 pb-1 mb-2">
                              Selected Competitions
                            </p>
                            {formData.selectedEvents.length > 0 ? (
                              <ul className="list-disc pl-4 flex flex-col gap-1 font-bold text-[#013C58]">
                                {formData.selectedEvents.map((id) => {
                                  const matchedEvent = events.find((e) => e.id === id);
                                  return <li key={id}>{matchedEvent?.name || id}</li>;
                                })}
                              </ul>
                            ) : (
                              <p className="text-[10px] italic text-rose-600 font-bold">
                                No events selected! Please go back and select at least one event.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right column: Screenshot preview thumbnail */}
                        <div className="md:col-span-4 flex flex-col items-center justify-between bg-white/50 border border-[#00537A]/15 rounded-2xl p-5 shadow-sm">
                          <div className="w-full text-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00537A] block mb-3">
                              Payment Receipt
                            </span>
                            {screenshot ? (
                              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl border border-[#00537A]/15 shadow-sm bg-white">
                                <img
                                  src={screenshot}
                                  alt="Transaction screenshot receipt"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-full aspect-[3/4] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-500/20 text-rose-600 p-4 bg-rose-50/10">
                                <ImageIcon size={28} className="opacity-60 mb-2" />
                                <span className="text-[10px] font-bold leading-tight">Screenshot missing!</span>
                                <span className="text-[8px] text-center opacity-70 mt-1 font-semibold">
                                  Go back to Step 4 and upload your payment proof.
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Cost total info */}
                          <div className="w-full border-t border-[#00537A]/15 pt-4 mt-4 text-center">
                            <span className="text-[10px] font-bold text-[#013C58]/50 block">Registration Fee</span>
                            <span className="text-lg font-bold text-[#013C58]">₹{totalFee}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Controls */}
                <div className="mt-8 pt-4 border-t border-[#00537A]/15 flex items-center justify-between flex-wrap gap-4">
                  {/* Left Controls: Clear Draft */}
                  <button
                    type="button"
                    onClick={clearForm}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 hover:text-rose-900 transition-colors focus:outline-none cursor-pointer"
                  >
                    <RefreshCw size={12} /> Clear Form
                  </button>

                  {/* Right Controls: Prev / Next / Submit */}
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="rounded-lg border border-[#00537A]/25 bg-white/40 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#013C58] hover:bg-white/60 transition-colors focus:outline-none cursor-pointer"
                      >
                        Prev
                      </button>
                    )}

                    {step < 5 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (step === 1 && (!formData.name || !formData.gender || !formData.age || !formData.email || !formData.phone)) ||
                          (step === 2 && (!formData.institution || !formData.program || !formData.academicLevel)) ||
                          (step === 3 && formData.selectedEvents.length === 0) ||
                          (step === 4 && !screenshot)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#013C58] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#00537A] transition-colors focus:outline-none cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        Next <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={formData.selectedEvents.length === 0 || !screenshot}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5A201] text-[#013C58] px-8 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-[#FFBA42] transition-colors focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check size={14} /> Submit Application
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          ) : (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center flex flex-col items-center"
            >
              <div className="p-5 rounded-full bg-[#00537A]/10 text-[#00537A] mb-6 border border-[#00537A]/25">
                <Check size={40} />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                REGISTRATION <span className="italic text-[#F5A201]">SUBMITTED</span>!
              </h2>
              <p className="text-xs text-[#013C58]/80 max-w-sm mt-3 leading-relaxed font-semibold">
                Thank you, **{formData.name}**! Your registration has been submitted. Our team is verifying your payment screenshot details.
              </p>

              {/* Reference ID Badge */}
              <div className="mt-8 bg-white/90 border border-[#00537A]/25 rounded-xl px-8 py-4 shadow-sm flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00537A] mb-1">
                  Confirmation Ticket Ref
                </span>
                <span className="font-mono text-xl font-bold text-[#013C58] tracking-wider">
                  {referenceId}
                </span>
              </div>

              {/* Next Steps Info */}
              <div className="mt-8 border-t border-[#00537A]/15 pt-6 max-w-sm text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F5A201] flex items-center gap-1.5 mb-3">
                  <Sparkles size={12} /> Next Steps
                </p>
                <ul className="text-xs leading-relaxed text-[#013C58]/80 flex flex-col gap-2 list-decimal pl-4 font-semibold">
                  <li>Save this reference key for verification.</li>
                  <li>Check progress inside the <Link to="/query-desk" className="text-[#00537A] hover:underline font-bold">Query Desk</Link> using your email or ID.</li>
                  <li>Upon successful verification of your screenshot, we will dispatch your confirmation mail and entry pass.</li>
                </ul>
              </div>

              <div className="mt-10 flex gap-4">
                <Link
                  to="/"
                  className="rounded-full bg-[#013C58] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:bg-[#00537A] transition-colors focus:outline-none cursor-pointer"
                >
                  Back Home
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setScreenshot(null);
                    setScreenshotName("");
                    setFormData(DEFAULT_FORM);
                    setStep(1);
                  }}
                  className="rounded-full border border-[#00537A]/25 bg-white/40 text-[#013C58] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/60 transition-colors focus:outline-none cursor-pointer"
                >
                  New Application
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto pt-8 border-t border-white/10 mt-8 text-center text-[9px] uppercase tracking-[0.25em] text-white/50 font-semibold">
        © 2026 Technica 6.0 · Department of Computer Science & Engineering
      </footer>
    </div>
  );
}
