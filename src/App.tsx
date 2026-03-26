import React, { useState, useRef } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info,
  Loader2,
  ChevronRight,
  FileText,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { analyzeJobOffer, type FraudAnalysis } from "./services/gemini";
import { cn } from "./lib/utils";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FraudAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText && !image) {
      setError("Please provide a job description or an image of the offer.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeJobOffer(inputText, image || undefined);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the job offer. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setInputText("");
    setImage(null);
    setResult(null);
    setError(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-emerald-500 bg-emerald-50 border-emerald-100";
      case "Medium": return "text-amber-500 bg-amber-50 border-amber-100";
      case "High": return "text-orange-500 bg-orange-50 border-orange-100";
      case "Critical": return "text-red-500 bg-red-50 border-red-100";
      default: return "text-gray-500 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShieldAlert className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">JobGuard AI</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Fraud Detection</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Resources</a>
            <button 
              onClick={reset}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              New Scan
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Input */}
          <div className="lg:col-span-7 space-y-8">
            <section>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Is that job offer <span className="text-indigo-600">legit?</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
                Paste the job description or upload a screenshot of the offer. Our AI will scan for red flags and recruitment scams.
              </p>
            </section>

            <div className="space-y-6">
              <div className="relative group">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste job description, email content, or company details here..."
                  className="w-full h-64 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-gray-700 placeholder:text-gray-300"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
                  {inputText.length} characters
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 rounded-2xl transition-all group"
                >
                  {image ? (
                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                      <FileText className="w-5 h-5" />
                      <span>Image Uploaded</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setImage(null); }}
                        className="ml-2 p-1 hover:bg-indigo-100 rounded-full"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
                      <span className="text-gray-600 font-medium">Upload Screenshot</span>
                    </>
                  )}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!inputText && !image)}
                  className="flex-[1.5] min-w-[240px] flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Patterns...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Scan for Fraud</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden"
                >
                  {/* Score Header */}
                  <div className={cn(
                    "p-8 text-center border-b border-gray-50",
                    getRiskColor(result.riskLevel).split(' ')[1]
                  )}>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-4">
                      <span className={cn("text-3xl font-black", getRiskColor(result.riskLevel).split(' ')[0])}>
                        {result.score}%
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Risk Level: {result.riskLevel}</h3>
                    <p className="text-sm opacity-70 font-medium uppercase tracking-wider">Fraud Probability Score</p>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Summary */}
                    <section>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Summary
                      </h4>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {result.summary}
                      </p>
                    </section>

                    {/* Red Flags */}
                    {result.redFlags.length > 0 && (
                      <section>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-400" /> Red Flags Detected
                        </h4>
                        <div className="space-y-2">
                          {result.redFlags.map((flag, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                              <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>{flag}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Detailed Analysis */}
                    <section>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Detailed Analysis</h4>
                      <div className="prose prose-sm prose-indigo text-gray-600 max-w-none">
                        <ReactMarkdown>{result.detailedAnalysis}</ReactMarkdown>
                      </div>
                    </section>

                    {/* Recommendations */}
                    <section>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        {result.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting Analysis</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">
                    Provide a job offer on the left to see the AI-powered fraud risk assessment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-gray-100 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-bold text-sm">JobGuard AI</span>
          </div>
          <p className="text-xs text-gray-400 text-center md:text-left">
            Disclaimer: This tool uses AI to detect patterns common in job fraud. It is not a guarantee of legitimacy. Always perform your own due diligence.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-indigo-600 hover:underline">Privacy Policy</button>
            <button className="text-xs font-bold text-indigo-600 hover:underline">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
