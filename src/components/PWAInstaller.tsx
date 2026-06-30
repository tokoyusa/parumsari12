import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, Check, X } from 'lucide-react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    const isSuccessInstalled = localStorage.getItem('pwa_installed_success') === 'true';

    if (isStandalone || isSuccessInstalled) {
      setIsInstalled(true);
      return;
    }

    // 2. Listen for the native beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Only show the banner if the user hasn't dismissed it in this session
      const isDismissed = sessionStorage.getItem('pwa_banner_dismissed') === 'true';
      if (!isDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 3. Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_installed_success', 'true');
      console.log('PASAR UMKM Tegalsari PWA berhasil diinstal!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the native browser installation prompt directly!
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice outcome: ... ${outcome}`);
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
      localStorage.setItem('pwa_installed_success', 'true');
    }
    
    // Reset deferred prompt and hide banner
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (isInstalled || !showBanner) {
    return null;
  }

  return (
    <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-lg border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Golden P Logo with live fallback */}
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 overflow-hidden relative border border-amber-400">
          <img 
            src="/icon-192.png" 
            alt="Pasar Tegalsari" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/icon.svg';
            }}
          />
        </div>
        <div className="space-y-0.5 text-center sm:text-left font-sans">
          <h4 className="font-bold text-sm font-display tracking-tight text-white flex items-center gap-1.5 justify-center sm:justify-start">
            <span>Pasang Aplikasi Pasar Tegalsari</span>
            <span className="bg-amber-400 text-emerald-950 font-bold text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">PWA</span>
          </h4>
          <p className="text-[10px] text-emerald-100 max-w-md">Dapatkan akses langsung dari layar HP Anda dengan sekali klik! Lebih cepat, ringan, & hemat kuota.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
        <button
          onClick={handleInstallClick}
          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <ArrowDownToLine className="w-4 h-4 text-emerald-950 animate-bounce" /> Pasang Aplikasi
        </button>
        <button
          onClick={handleDismiss}
          className="p-2 hover:bg-white/10 rounded-lg text-emerald-100 cursor-pointer"
          title="Sembunyikan"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
