'use client';
import { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

const MATERIALS = ['PLA', 'PETG', 'TPU', 'ASA', 'ABS', 'Not sure — recommend one'];
const COLORS = ['Black', 'White', 'Grey', 'Red', 'Blue', 'Green', 'Orange', 'Yellow', 'Purple', 'Natural/Beige', 'Custom (specify in notes)'];

export default function QuotePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', material: 'PLA', color: 'Black',
    quantity: 1, notes: '', fileName: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setForm(prev => ({ ...prev, fileName: f.name })); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));
      if (file) formData.append('file', file);
      const res = await fetch('/api/quote', { method: 'POST', body: formData });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Quote Request Received!</h2>
        <p className="text-gray-500">We&apos;ll review your file and get back to you with pricing and lead time within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Custom Print Quote</h1>
        <p className="text-gray-500">Upload your STL file and tell us what you need. We&apos;ll send you a price and lead time within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">STL File *</label>
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-400 transition-colors bg-gray-50">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">{file ? file.name : 'Click to upload STL / OBJ / 3MF'}</span>
            <span className="text-xs text-gray-400 mt-1">Max 50MB</span>
            <input type="file" accept=".stl,.obj,.3mf" className="hidden" onChange={handleFile} />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
            <input required type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="jane@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone (optional)</label>
            <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="+1 555 000 0000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity *</label>
            <input required type="number" min={1} value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: parseInt(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
            <select value={form.material} onChange={e => setForm(p => ({ ...p, material: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
              {MATERIALS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
            <select value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
              {COLORS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Notes / Special Requirements</label>
          <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            placeholder="Any special requirements, infill preferences, surface finish requests, intended use, etc." />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
        )}

        <button type="submit" disabled={status === 'submitting'}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
          {status === 'submitting' ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Request Quote'}
        </button>

        <p className="text-center text-xs text-gray-400">We typically respond within 24 hours. For urgent requests, email hello@printcraft.co</p>
      </form>
    </div>
  );
}
