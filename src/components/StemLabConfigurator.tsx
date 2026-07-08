import React, { useState, useEffect } from 'react';
import { STEM_KITS_DATA } from '../data';
import { STEMKit } from '../types';
import { Cpu, DollarSign, PenTool, CheckCircle, Sliders, Layers, Monitor, ChevronRight, FileSpreadsheet, Sparkles, Building, PhoneCall } from 'lucide-react';

export default function StemLabConfigurator() {
  const [instName, setInstName] = useState<string>('');
  const [instEmail, setInstEmail] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Silver' | 'Gold' | 'Platinum'>('Silver');
  const [withInstallation, setWithInstallation] = useState<boolean>(true);
  
  // Kit quantities map
  const [kitQuantities, setKitQuantities] = useState<{ [kitId: string]: number }>({});
  const [quoteGenerated, setQuoteGenerated] = useState<boolean>(false);
  const [quoteId, setQuoteId] = useState<string>('');

  // Setup initial kit counts based on selected Tier
  useEffect(() => {
    const initialQuantities: { [kitId: string]: number } = {};
    STEM_KITS_DATA.forEach(kit => {
      if (kit.requiredForLevel.includes(selectedTier)) {
        // Standard defaults based on level
        if (selectedTier === 'Bronze') initialQuantities[kit.id] = 2;
        else if (selectedTier === 'Silver') initialQuantities[kit.id] = 4;
        else if (selectedTier === 'Gold') initialQuantities[kit.id] = 8;
        else if (selectedTier === 'Platinum') initialQuantities[kit.id] = 12;
      } else {
        initialQuantities[kit.id] = 0;
      }
    });
    setKitQuantities(initialQuantities);
  }, [selectedTier]);

  const updateQuantity = (kitId: string, delta: number) => {
    setKitQuantities(prev => {
      const current = prev[kitId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [kitId]: next };
    });
  };

  // Math Metrics
  const itemsCost = STEM_KITS_DATA.reduce((sum, kit) => {
    const qty = kitQuantities[kit.id] || 0;
    return sum + (kit.unitCost * qty);
  }, 0);

  const installationFee = withInstallation ? Math.round(itemsCost * 0.08) : 0;
  const totalCost = itemsCost + installationFee;

  // Simultaneous student capacity calculation
  let baseStudentCapacity = 15;
  if (selectedTier === 'Silver') baseStudentCapacity = 35;
  else if (selectedTier === 'Gold') baseStudentCapacity = 65;
  else if (selectedTier === 'Platinum') baseStudentCapacity = 120;

  // Add extra 3 students for every additional kit purchased
  const extraKitsCount = (Object.values(kitQuantities) as number[]).reduce((a, b) => a + b, 0);
  const finalCapacity = baseStudentCapacity + (extraKitsCount * 2);

  // Installation speed estimate
  let setupDays = 7;
  if (selectedTier === 'Silver') setupDays = 14;
  else if (selectedTier === 'Gold') setupDays = 21;
  else if (selectedTier === 'Platinum') setupDays = 30;

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName || !instEmail) return;
    
    const randomId = 'AIC-STEM-' + Math.floor(1000 + Math.random() * 9000);
    setQuoteId(randomId);
    setQuoteGenerated(true);
  };

  const currencyFormatter = (value: number) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest block">Robotics &amp; AI Alliance</span>
        <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">Interactive STEM Lab Configurator</h2>
        <p className="text-body-md text-on-surface-variant max-w-3xl">
          Nurture modern innovation at your school or university. Use this tool to customize advanced robotics hardware, GPU processing cores, IoT telemetry networks, and generate formal setup blueprints.
        </p>
      </div>

      {/* Grid: Settings Panel (7 cols) & Live Metrics Board (5 cols) */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Settings Panel (12/7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant">
          
          {/* Section: Select Tier */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-bold text-base text-primary">1. Select Standard Lab Tier</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['Bronze', 'Silver', 'Gold', 'Platinum'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => { setSelectedTier(tier); setQuoteGenerated(false); }}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedTier === tier
                      ? 'border-secondary bg-secondary/5 font-bold ring-1 ring-secondary'
                      : 'border-outline-variant bg-white hover:bg-surface-container'
                  }`}
                >
                  <p className="text-sm font-display text-primary">{tier}</p>
                  <p className="text-[10px] font-mono text-secondary mt-1 font-semibold uppercase">
                    {tier === 'Bronze' ? 'Basic IoT' :
                     tier === 'Silver' ? 'ML Vision' :
                     tier === 'Gold' ? 'Dual Robotics' : 'HPC Cluster'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Customize Hardware Modules */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-bold text-base text-primary">2. Customize Hardware Quantities</h3>
            </div>
            <p className="text-xs text-on-surface-variant">Adjust quantities below to tailor the setup to your institutional layout and student counts.</p>

            <div className="space-y-4 divide-y divide-outline-variant/50">
              {STEM_KITS_DATA.map((kit) => {
                const qty = kitQuantities[kit.id] || 0;
                return (
                  <div key={kit.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 first:pt-0">
                    <div className="space-y-1 max-w-md">
                      <span className="text-[9px] font-mono font-bold bg-surface-container text-primary px-2 py-0.5 rounded uppercase">
                        {kit.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-primary">{kit.name}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{kit.description}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start shrink-0">
                      <div>
                        <p className="text-xs font-mono font-semibold text-primary">{currencyFormatter(kit.unitCost)}</p>
                        <p className="text-[10px] text-on-surface-variant text-right">Unit Rate</p>
                      </div>

                      <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low overflow-hidden">
                        <button
                          onClick={() => { updateQuantity(kit.id, -1); setQuoteGenerated(false); }}
                          className="px-3 py-1.5 font-bold text-primary hover:bg-outline-variant/30 transition-all text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono font-bold text-xs text-primary">{qty}</span>
                        <button
                          onClick={() => { updateQuantity(kit.id, 1); setQuoteGenerated(false); }}
                          className="px-3 py-1.5 font-bold text-primary hover:bg-outline-variant/30 transition-all text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Extra Services */}
          <div className="space-y-4 border-t border-outline-variant/50 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-primary">Include Official Field Installation?</h4>
                <p className="text-xs text-on-surface-variant">Includes custom sensor mounts, lab desks configuration, networking, and 2 full days of faculty mentor training (estimated at 8% of hardware cost).</p>
              </div>
              <input
                type="checkbox"
                checked={withInstallation}
                onChange={(e) => { setWithInstallation(e.target.checked); setQuoteGenerated(false); }}
                className="w-4.5 h-4.5 text-secondary focus:ring-secondary border-outline rounded cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Right Dynamic Live Metrics Board (12/5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic Metrics Board */}
          <div className="bg-primary-container text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl"></div>
            
            <h3 className="font-display font-bold text-lg text-white border-b border-white/10 pb-4">Live Configuration Metrics</h3>
            
            <div className="space-y-4">
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-on-primary-container font-medium">Selected Level:</span>
                <span className="text-sm font-mono font-bold text-secondary-container tracking-wider uppercase">{selectedTier} Tier</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-on-primary-container font-medium">Setup Speed:</span>
                <span className="text-sm font-mono font-bold text-white">{setupDays} Working Days</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-on-primary-container font-medium">Simultaneous Seat Capacity:</span>
                <span className="text-sm font-mono font-bold text-white">{finalCapacity} Students</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-on-primary-container font-medium">AI Compute Capacity:</span>
                <span className="text-sm font-sans font-bold text-secondary-container">
                  {selectedTier === 'Bronze' ? 'IoT Sensor Streaming Only' :
                   selectedTier === 'Silver' ? 'Convolutional Edge Inference' :
                   selectedTier === 'Gold' ? 'Autonomous Robotics & Nav' : 'Cluster Compute / Local Fine-Tuning'}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-on-primary-container font-medium">ESTIMATED INVESTMENT</p>
                    <p className="text-2xl font-display font-black text-white">{currencyFormatter(totalCost)}</p>
                  </div>
                  <span className="text-[10px] font-mono text-on-primary-container">Excludes GST</span>
                </div>
              </div>

            </div>
          </div>

          {/* Institutional Booking Form */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl space-y-4">
            <h4 className="font-display font-bold text-sm text-primary">Get Formal Quote Blueprint</h4>
            
            <form onSubmit={handleGenerateQuote} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">School / University Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. DAV Public School, Bangalore"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full bg-white text-xs border border-outline-variant rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Principal Contact Email</label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    placeholder="principal@davbangalore.edu.in"
                    value={instEmail}
                    onChange={(e) => setInstEmail(e.target.value)}
                    className="w-full bg-white text-xs border border-outline-variant rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-secondary transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-cta hover:bg-on-tertiary-container text-white py-3 rounded-lg font-display font-semibold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Generate Sandbox Quote
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Quote Summary Output Overlay Section */}
      {quoteGenerated && (
        <section className="bg-white border-2 border-secondary rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto animate-slideUp space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-mono font-bold px-4 py-1 rounded-bl uppercase">
            Official Quote Blueprint (Simulated)
          </div>

          <div className="flex justify-between items-start border-b border-outline-variant pb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-primary">{instName || 'DAV Public School'}</h3>
              <p className="text-xs text-on-surface-variant">Target Contact: {instEmail || 'principal@davbangalore.edu.in'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-on-surface-variant">QUOTE ID</p>
              <p className="text-base font-mono font-bold text-primary">{quoteId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-secondary uppercase tracking-wider">Configured Hardware Modules Line Items</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-on-surface-variant divide-y divide-outline-variant/60">
                <thead>
                  <tr className="font-mono text-[10px] font-bold text-on-surface-variant uppercase">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Cost</th>
                    <th className="py-2 text-right">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-sans">
                  {STEM_KITS_DATA.map((kit) => {
                    const qty = kitQuantities[kit.id] || 0;
                    if (qty === 0) return null;
                    return (
                      <tr key={kit.id}>
                        <td className="py-2.5 font-semibold text-primary">{kit.name}</td>
                        <td className="py-2.5 text-center font-mono">{qty}</td>
                        <td className="py-2.5 text-right font-mono">{currencyFormatter(kit.unitCost)}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-primary">{currencyFormatter(kit.unitCost * qty)}</td>
                      </tr>
                    );
                  })}
                  
                  {withInstallation && (
                    <tr>
                      <td className="py-2.5 font-semibold text-primary">Regional Field Installation &amp; Training</td>
                      <td className="py-2.5 text-center font-mono">1</td>
                      <td className="py-2.5 text-right font-mono">8% Block Rate</td>
                      <td className="py-2.5 text-right font-mono font-bold text-primary">{currencyFormatter(installationFee)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center border-t border-outline-variant/60 pt-4 font-display text-primary bg-surface-container-low/50 p-4 rounded-xl">
              <div>
                <p className="text-xs font-bold text-on-surface-variant font-sans">FINAL TOTAL SETUP VALUATION (EXCL. GST)</p>
                <p className="text-2xl font-black">{currencyFormatter(totalCost)}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                  <CheckCircle className="w-3.5 h-3.5" /> Approved Sandbox Draft
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
