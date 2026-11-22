import React, { useState } from 'react';
import { ApiConfig } from '../types';
import { apiService } from '../services/api';
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  Code, 
  Copy, 
  Check, 
  X,
  Server,
  Zap,
  RotateCcw
} from 'lucide-react';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  const [config, setConfig] = useState<ApiConfig>(apiService.getConfig());
  const [testResult, setTestResult] = useState<{ testing: boolean; message?: string; success?: boolean } | null>(null);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'employees' | 'projects' | 'emi'>('employees');

  if (!isOpen) return null;

  const handleSave = () => {
    apiService.saveConfig(config);
    onConfigUpdated();
    onClose();
  };

  const handleTestConnection = async () => {
    setTestResult({ testing: true });
    const res = await apiService.testBackendConnection(config.backendBaseUrl);
    setTestResult({
      testing: false,
      success: res.success,
      message: res.message
    });
    if (res.success) {
      setConfig(prev => ({ ...prev, status: 'connected', lastTested: new Date().toLocaleTimeString() }));
    } else {
      setConfig(prev => ({ ...prev, status: 'error', lastTested: new Date().toLocaleTimeString() }));
    }
  };

  const handleResetData = () => {
    if (confirm('Reset mock database back to initial BD real estate records?')) {
      apiService.resetToDefaultMockData();
      onConfigUpdated();
      onClose();
    }
  };

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const sampleEmployeeJson = `[
  {
    "id": "emp-01",
    "name": "Tanvir Ahmed",
    "designation": "Senior Sales Director",
    "department": "Luxury Residential",
    "zone": "Dhaka North",
    "monthlyTarget": 120000000,
    "totalAchieved": 114000000,
    "achievementPercentage": 95.0,
    "phases": {
      "first10Days": { "target": 35000000, "achieved": 38000000, "percentage": 108.6, "dealsCount": 1 },
      "second10Days": { "target": 45000000, "achieved": 42000000, "percentage": 93.3, "dealsCount": 2 },
      "fullMonth": { "target": 40000000, "achieved": 34000000, "percentage": 85.0, "dealsCount": 1 }
    },
    "totalEmiCollected": 24500000,
    "totalDue": 4200000,
    "overdueCount": 2
  }
]`;

  const sampleProjectJson = `[
  {
    "id": "proj-01",
    "name": "Sunset Heights Luxury Condos",
    "location": "Road 84, Gulshan-2, Dhaka",
    "city": "Dhaka",
    "type": "Luxury Condominium",
    "totalUnits": 48,
    "soldUnits": 38,
    "availableUnits": 10,
    "startingPrice": 38000000,
    "avgPricePerSqft": 24500
  }
]`;

  const sampleEmiJson = `[
  {
    "id": "emi-01",
    "clientName": "Barrister Sayeed Rahman",
    "projectName": "Sunset Heights Luxury Condos",
    "unitNumber": "Penthouse A-12",
    "totalPrice": 38000000,
    "monthlyEmiAmount": 738888,
    "installmentsPaid": 14,
    "totalInstallments": 36,
    "status": "paid"
  }
]`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E242B]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#E2E8E5] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8E5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center border border-[#1B6B38]/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E242B]">
                API & BD Real Estate Data Backend Settings
              </h3>
              <p className="text-xs text-[#5A6570]">
                Switch seamlessly between internal BD Mock Data and your Custom REST Backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5A6570] hover:text-[#1E242B] rounded-xl hover:bg-[#F4F6F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Toggle: Mock Data vs Custom API */}
          <div className="bg-[#F4F6F5] p-4 rounded-2xl border border-[#E2E8E5] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1E242B] block">Data Provider Engine</span>
                <span className="text-[11px] text-[#5A6570]">
                  {config.useMockData 
                    ? 'Using high-fidelity BD Real Estate Mock Engine (Gulshan, Banani, Purbachal)'
                    : 'Using external REST Backend API endpoint provided by you'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setConfig(prev => ({ ...prev, useMockData: !prev.useMockData }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  !config.useMockData ? 'bg-[#1B6B38]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    !config.useMockData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 pt-1 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${
                config.useMockData 
                  ? 'bg-[#1B6B38]/10 text-[#1B6B38] border-[#1B6B38]/30' 
                  : 'bg-[#25D366]/20 text-[#14522B] border-[#25D366]/40'
              }`}>
                {config.useMockData ? 'BD Mock Engine Active' : 'External REST API Active'}
              </span>
            </div>
          </div>

          {/* Backend Base URL Input (When Custom API enabled) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1E242B] block">
              Backend API Base URL:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. http://localhost:5000/api/v1 or https://api.myrealestate.bd"
                value={config.backendBaseUrl}
                disabled={config.useMockData}
                onChange={(e) => setConfig(prev => ({ ...prev, backendBaseUrl: e.target.value }))}
                className="flex-1 bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-4 py-2.5 text-xs text-[#1E242B] placeholder-[#5A6570] focus:outline-none focus:border-[#1B6B38] disabled:opacity-50"
              />
              <button
                type="button"
                disabled={config.useMockData || testResult?.testing}
                onClick={handleTestConnection}
                className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6F5] text-[#1E242B] text-xs font-bold border border-[#E2E8E5] transition-all disabled:opacity-50 flex items-center space-x-1.5 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-[#1B6B38]" />
                <span>{testResult?.testing ? 'Testing...' : 'Ping Test'}</span>
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-xl text-xs border ${
                testResult.success 
                  ? 'bg-[#1B6B38]/10 text-[#1B6B38] border-[#1B6B38]/30'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {testResult.message}
              </div>
            )}
          </div>

          {/* API Schema Reference Accordion */}
          <div className="bg-[#F4F6F5] rounded-2xl border border-[#E2E8E5] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E242B] flex items-center">
                <Code className="w-3.5 h-3.5 mr-1.5 text-[#1B6B38]" />
                Expected REST API Schema (For Your Backend Dev)
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveSchemaTab('employees')}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                    activeSchemaTab === 'employees' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
                  }`}
                >
                  /employees
                </button>
                <button
                  onClick={() => setActiveSchemaTab('projects')}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                    activeSchemaTab === 'projects' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
                  }`}
                >
                  /projects
                </button>
                <button
                  onClick={() => setActiveSchemaTab('emi')}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                    activeSchemaTab === 'emi' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
                  }`}
                >
                  /emi-records
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-[#FFFFFF] p-3 rounded-xl text-[11px] font-mono text-[#1E242B] overflow-x-auto max-h-40 border border-[#E2E8E5]">
                {activeSchemaTab === 'employees' && sampleEmployeeJson}
                {activeSchemaTab === 'projects' && sampleProjectJson}
                {activeSchemaTab === 'emi' && sampleEmiJson}
              </pre>
              <button
                onClick={() => {
                  const content = activeSchemaTab === 'employees' ? sampleEmployeeJson : activeSchemaTab === 'projects' ? sampleProjectJson : sampleEmiJson;
                  copyToClipboard(content, activeSchemaTab);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#FFFFFF] text-[#5A6570] hover:text-[#1E242B] text-xs border border-[#E2E8E5] flex items-center space-x-1 shadow-sm"
              >
                {copiedTab === activeSchemaTab ? <Check className="w-3 h-3 text-[#1B6B38]" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">{copiedTab === activeSchemaTab ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Reset Mock Database */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleResetData}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Reset Default Mock DB</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E2E8E5] flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A6570] hover:text-[#1E242B]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#1B6B38] hover:bg-[#14522B] text-white font-bold text-xs transition-all shadow-sm"
          >
            Apply & Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};
