import React, { useState } from 'react';
import { X, Linkedin, Facebook, Instagram, UploadCloud } from 'lucide-react';
import { scanSocialProfile } from '../ai/flows/scan-social-profile';
import { useSession } from '../context/SessionContext';

interface EnhanceProfileModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function EnhanceProfileModal({ onClose, onComplete }: EnhanceProfileModalProps) {
  const { updateSession } = useSession();
  const [linkedin, setLinkedin] = useState('');
  const [linkedinText, setLinkedinText] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    setError('');
    
    try {
      if (linkedin && !linkedinText) {
        setShowTextInput(true);
        setError('Please paste your LinkedIn About/Experience section text directly, as we cannot scrape URLs.');
        setIsScanning(false);
        return;
      }

      if (linkedinText) {
        const result = await scanSocialProfile(linkedin, linkedinText, facebook, instagram);
        
        // Map suggested answers to session
        const prefilledAnswers: Record<string, string[]> = {};
        result.suggestedAnswers.forEach(ans => {
          prefilledAnswers[ans.questionId] = [ans.suggestedOption];
        });
        
        updateSession({ assessmentAnswers: prefilledAnswers });
      }
      
      onComplete();
    } catch (err: any) {
      console.error("Scan error:", err);
      setError(err.message || 'Failed to scan profile. Please try again or skip.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Enhance Your Profile</h2>
          <p className="text-sm text-gray-600 mb-6">
            Connect your social accounts and upload your materials. Our AI will scan your background to deliver hyper-personalized business recommendations.
          </p>

          <div className="space-y-4 mb-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username" 
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            {showTextInput && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-1">Paste LinkedIn Text (About/Experience)</label>
                <textarea 
                  value={linkedinText}
                  onChange={(e) => setLinkedinText(e.target.value)}
                  placeholder="Paste your professional summary and experience here..." 
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all h-32 resize-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Facebook size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/username" 
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/username" 
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Materials (Resume, Financials)</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud size={20} className="text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">
                    {fileName ? <span className="font-medium text-black">{fileName}</span> : <span><span className="font-semibold">Click to upload</span> or drag and drop</span>}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
              </label>
            </div>
          </div>

          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-black text-white font-medium text-sm px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-3"
          >
            {isScanning ? 'Scanning...' : 'Run AI Profile Scan →'}
          </button>
          
          <button 
            onClick={onComplete}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
