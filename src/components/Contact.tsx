import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Linkedin, Instagram, Facebook, Mail, Sparkles, Loader2 } from 'lucide-react';

interface ContactProps {
  onOpenAiArchitect: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAiArchitect }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website',
    budgetRange: '$1k-$3k',
    projectDetails: '',
    botcheck: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '039834ec-01fa-4d61-88de-4c8d0c028d68';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        project_type: formData.projectType,
        budget_range: formData.budgetRange,
        message: formData.projectDetails,
        subject: 'New Inquiry from WebNova Studio',
        from_name: 'WebNova Studio Website',
        botcheck: formData.botcheck,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: 'Website',
          budgetRange: '$1k-$3k',
          projectDetails: '',
          botcheck: false,
        });
      } else {
        setStatus('error');
        setErrorMessage(
          result.message || 'Something went wrong. Please try again or email mouzinkhan21@gmail.com'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again or email mouzinkhan21@gmail.com'
      );
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      {/* Background Volumetric Light */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#FF2E63]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00FFA3]" />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              COMMISSION AN EXPERIENCE
            </span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 text-balance">
            Let's Build Your Next Digital Experience.
          </h2>
          <p className="font-body text-base sm:text-lg text-zinc-300 font-normal">
            Have an idea, project or website that needs a new direction? Tell us what you're building.
          </p>
        </div>

        {/* Split Grid: Form Left, Contact Info + Social Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Left (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0E1A]/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in-95"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00FFA3]/20 border border-[#00FFA3] flex items-center justify-center text-[#00FFA3] mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl text-white mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="font-body text-zinc-300 max-w-md mb-8">
                    ✓ Thanks! Your inquiry has been received. We'll get back within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Honeypot anti-spam check */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={formData.botcheck}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Your Name <span className="text-[#FF2E63]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FFA3] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Your Email <span className="text-[#FF2E63]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FFA3] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Two-Column: Project Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FFA3] text-white text-sm outline-none transition-colors cursor-pointer"
                      >
                        <option value="Website">Website</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Web App">Web App</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FFA3] text-white text-sm outline-none transition-colors cursor-pointer"
                      >
                        <option value="$500-$1k">$500-$1k</option>
                        <option value="$1k-$3k">$1k-$3k</option>
                        <option value="$3k-$5k">$3k-$5k</option>
                        <option value="$5k+">$5k+</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="projectDetails" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Project Details <span className="text-[#FF2E63]">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      rows={4}
                      required
                      placeholder="Tell us about your brand, goals, timeline, and what kind of experience you envision..."
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FFA3] text-white text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-4 rounded-xl bg-[#FF2E63]/15 border border-[#FF2E63] text-xs font-mono text-[#FF2E63] flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || "✕ Something went wrong. Please try again or email mouzinkhan21@gmail.com"}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl font-bold text-white gradient-magma shadow-[0_0_25px_rgba(255,46,99,0.4)] hover:shadow-[0_0_40px_rgba(255,46,99,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    data-cursor="SEND"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Info, Direct Email & Social Media (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-headline font-bold text-2xl text-white mb-4">
                Direct Contact & Inquiries
              </h3>
              <p className="font-body text-zinc-300 text-sm leading-relaxed mb-8 font-normal">
                Prefer email or looking for custom retainer architecture? Reach out directly. We
                respond promptly to all inquiries.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <a
                  href="mailto:mouzinkhan21@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#0A0E1A]/80 border border-white/10 hover:border-[#00C2FF] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00C2FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-zinc-400 block">Direct Inquiries</span>
                    <span className="font-headline font-semibold text-sm text-white group-hover:text-[#00C2FF] transition-colors">
                      mouzinkhan21@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Nova Intelligence AI Architect Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#FF2E63]/15 via-[#C77DFF]/15 to-[#00FFA3]/10 border border-white/15 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFD93D] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NOVA INTELLIGENCE 3.1</span>
                </div>
                <h4 className="font-headline font-bold text-lg text-white mb-2">
                  Need Immediate Technical Feasibility?
                </h4>
                <p className="font-body text-xs text-zinc-300 leading-relaxed mb-4">
                  Explore our high-thinking AI Technical Architect to generate instant creative WebGL
                  breakdowns, stack recommendations, and timeline projections.
                </p>
                <button
                  type="button"
                  onClick={onOpenAiArchitect}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2 transition-all hover:scale-105"
                  data-cursor="AI ARCHITECT"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFA3]" />
                  <span>Launch Project Architect</span>
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block mb-4">
                Connect With WebNova
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/mouzin-khan-6735b539a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#00C2FF] hover:bg-[#00C2FF]/10 transition-all"
                  aria-label="WebNova Studio LinkedIn Profile"
                  data-cursor="LINKEDIN"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/mouzinkhan0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all"
                  aria-label="WebNova Studio Instagram Profile"
                  data-cursor="INSTAGRAM"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#00FFA3] hover:bg-[#00FFA3]/10 transition-all"
                  aria-label="WebNova Studio Facebook Profile"
                  data-cursor="FACEBOOK"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
