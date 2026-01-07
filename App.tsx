
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import LessonPlanViewer from './components/LessonPlanViewer';
import { FormInputs, GenerationResult } from './types';
import { generateLessonPlan } from './geminiService';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'A' | 'B'>('A');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartGeneration = async (inputs: FormInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateLessonPlan(inputs);
      setResult(data);
      setPhase('B');
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra trong quá trình soạn thảo. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 no-print border-b border-blue-400/20">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-inner">
              <svg className="w-9 h-9 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none">MathPlan AI</h1>
              <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest mt-1 opacity-80">Chuyên gia giáo án 5512 & 3456</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {phase === 'B' && (
              <button 
                onClick={() => setPhase('A')}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl border border-white/20 transition-all active:scale-95"
              >
                Tạo giáo án khác
              </button>
            )}
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-bold text-blue-300 uppercase">Trạng thái hệ thống</p>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium">Sẵn sàng (Gemini 3 Pro)</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-10">
        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-4 animate-shake" role="alert">
            <div className="bg-red-200 p-2 rounded-full">
               <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <strong className="font-black text-lg">Thông báo lỗi: </strong>
              <span className="block text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {phase === 'A' ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Cổng soạn thảo giáo án số</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                Chào mừng thầy/cô! Hãy cung cấp thông tin bài dạy để tôi soạn thảo kế hoạch bài dạy chi tiết, tích hợp năng lực số chuẩn 2025.
              </p>
            </div>
            <InputForm onSubmit={handleStartGeneration} isLoading={isLoading} />
          </div>
        ) : (
          result && <LessonPlanViewer data={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200 mt-auto no-print">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <p className="font-black text-slate-800 text-lg uppercase tracking-tight">MathPlan AI 2025</p>
            <p className="text-slate-500 text-sm mt-1">Giải pháp số hóa kế hoạch bài dạy cho giáo viên Toán THCS.</p>
          </div>
          <div className="text-right text-slate-400 text-xs italic">
            <p>Tuân thủ Công văn 5512/BGDĐT về xây dựng kế hoạch bài dạy</p>
            <p>Áp dụng Công văn 3456/BGDĐT-GDPT về khung năng lực số bậc THCS</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .lesson-document { width: 100% !important; margin: 0 !important; box-shadow: none !important; }
          @page { size: A4; margin: 0; }
        }
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-shake { animation: shake 0.5s linear; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .lesson-document {
          font-family: 'Times New Roman Custom', 'Times New Roman', Times, serif !important;
        }
      `}</style>
    </div>
  );
};

export default App;
