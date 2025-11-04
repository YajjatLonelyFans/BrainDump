import { Clock } from 'lucide-react';

const RateLimit = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <div className="flex justify-center mb-4">
          <Clock className="w-16 h-16 text-emerald-500" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">
          Rate Limit Reached
        </h2>
        <p className="text-slate-400 mb-6">
          Please wait a moment before trying again.
        </p>
        <button onClick={()=> navigate('/')} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-500 transition-all duration-200">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RateLimit;