import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, Monitor, Smartphone, Check, X, HelpCircle, Share2, PlusSquare } from 'lucide-react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [deviceType, setDeviceType] = useState<{ isIOS: boolean; isAndroid: boolean; isMobile: boolean }>({
    isIOS: false,
    isAndroid: false,
    isMobile: false
  });

  useEffect(() => {
    // Detect device characteristics
    const ua = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroidDevice = /Android/i.test(ua);
    const isMobileDevice = isIOSDevice || isAndroidDevice || /webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    setDeviceType({
      isIOS: isIOSDevice,
      isAndroid: isAndroidDevice,
      isMobile: isMobileDevice
    });

    // Check if app is running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    const isSuccessInstalled = localStorage.getItem('pwa_installed_success') === 'true';

    if (isStandalone || isSuccessInstalled) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed the popup previously in this session
    const isDismissed = sessionStorage.getItem('pwa_popup_dismissed') === 'true';
    
    // Automatically show popup on mobile if not installed and not dismissed in current session
    if (isMobileDevice && !isDismissed) {
      // Delay slightly for smoother presentation
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // If prompt is supported, automatically display the popup on both desktop/mobile (unless dismissed)
      if (!isDismissed) {
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPopup(false);
      setShowGuideModal(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_installed_success', 'true');
      sessionStorage.setItem('pwa_popup_dismissed', 'true');
      console.log('PASAR UMKM Tegalsari PWA berhasil diinstal!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the native PWA install prompt directly
      deferredPrompt.prompt();
      
      // Wait for user preference response
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to installation prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        localStorage.setItem('pwa_installed_success', 'true');
      }
      
      // Reset deferred prompt
      setDeferredPrompt(null);
      setShowPopup(false);
    } else {
      // No native prompt event available yet or unsupported (e.g. iOS Safari)
      // Show custom step-by-step interactive install guide modal!
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    sessionStorage.setItem('pwa_popup_dismissed', 'true');
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* 1. MAIN DIRECT INSTALLATION POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-emerald-500/10 overflow-hidden transform transition-all animate-scale-up text-center p-6 relative">
            
            {/* Close button */}
            <button 
              onClick={handleDismiss}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Premium 3D Golden Logo Asset */}
            <div className="mt-4 mb-5 flex justify-center">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md scale-110"></div>
                <img 
                  src="/icon-192.png" 
                  alt="Pasar Tegalsari Logo" 
                  className="w-20 h-20 rounded-2xl shadow-xl border-2 border-amber-300 relative z-10 animate-pulse"
                  onError={(e) => {
                    // Fallback to svg if png fails
                    (e.target as HTMLImageElement).src = '/icon.svg';
                  }}
                />
              </div>
            </div>

            {/* Typography Content */}
            <h3 className="text-xl font-extrabold font-display text-gray-900 tracking-tight">
              Instal Aplikasi Pasar Tegalsari
            </h3>
            <p className="text-xs text-gray-500 mt-2.5 px-2 leading-relaxed">
              Pasang aplikasi di layar utama handphone Anda sekarang untuk akses super cepat, lancar, dan hemat kuota tanpa melalui Play Store atau App Store!
            </p>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleInstallClick}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4 text-amber-300" />
                Instal Sekarang
              </button>
              
              <button
                onClick={handleDismiss}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 font-semibold py-3 px-4 rounded-2xl text-xs transition-all cursor-pointer"
              >
                Nanti Saja
              </button>
            </div>

            {/* Informational badge */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" /> Bebas Iklan • Ringan • Responsif
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE STEP-BY-STEP GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-up">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-5 relative">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight font-display text-white">Panduan Mudah Instalasi</h3>
                  <p className="text-xs text-emerald-100">Ikuti langkah sederhana untuk memasang aplikasi</p>
                </div>
              </div>
            </div>

            {/* Content based on detected OS */}
            <div className="p-6 space-y-5 text-gray-700">
              {deviceType.isIOS ? (
                // iOS Safari Guide
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Aplikasi Pasar Tegalsari dapat dipasang langsung di iPhone atau iPad Anda menggunakan Safari:</p>
                  
                  <div className="space-y-3.5">
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Ketuk tombol <strong className="text-gray-950 inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded"><Share2 className="w-3 h-3 text-emerald-600" /> Bagikan (Share)</strong> pada bar menu Safari (di bagian bawah layar untuk iPhone, atau bagian atas untuk iPad).
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Gulir menu ke bawah lalu ketuk pilihan <strong className="text-gray-950 inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded"><PlusSquare className="w-3 h-3 text-emerald-600" /> "Tambahkan ke Layar Utama"</strong> (Add to Home Screen).
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Ketuk tombol <strong className="text-emerald-600 font-bold">"Tambah"</strong> (Add) di pojok kanan atas layar untuk memasangnya.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Android / generic Guide
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Gunakan browser Chrome di HP Android Anda untuk memasang secara otomatis:</p>
                  
                  <div className="space-y-3.5">
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Ketuk ikon menu tiga titik <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⋮</strong> di pojok kanan atas browser Chrome Anda.
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Pilih menu <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded font-medium">"Instal aplikasi"</strong> atau <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded">"Tambahkan ke Layar Utama"</strong>.
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Ketuk <strong className="text-emerald-600 font-bold">"Instal"</strong> pada jendela konfirmasi yang muncul untuk menyelesaikan.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer info */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-[11px] text-amber-800 leading-relaxed flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Setelah berhasil dipasang, ikon aplikasi dengan logo berwarna emas 3D akan muncul langsung di daftar aplikasi layar handphone Anda!</span>
              </div>
            </div>

            {/* Action button */}
            <div className="bg-gray-50 p-4 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
