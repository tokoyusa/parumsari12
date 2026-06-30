import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, Monitor, Smartphone, Check, X, HelpCircle, Share2, PlusSquare } from 'lucide-react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
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
    
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed the banner previously in this session or ever
    const isDismissed = localStorage.getItem('pwa_banner_dismissed') === 'true';
    
    // Show banner on mobile if not installed and not dismissed, OR if beforeinstallprompt is triggered
    if (isMobileDevice && !isDismissed) {
      setShowBanner(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // If prompt is supported, show banner even on desktop (if not dismissed)
      if (!isDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
      setShowGuideModal(false);
      setDeferredPrompt(null);
      console.log('PASAR UMKM Tegalsari PWA berhasil diinstal!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the native PWA install prompt
      deferredPrompt.prompt();
      
      // Wait for user preference response
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to installation prompt: ${outcome}`);
      
      // Reset deferred prompt
      setDeferredPrompt(null);
      setShowBanner(false);
    } else {
      // No native prompt available (either iOS or heuristics deferred it)
      // Show custom step-by-step interactive install guide modal!
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-lg border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ArrowDownToLine className="w-5 h-5 text-amber-300 animate-bounce" />
            </div>
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-sm font-display tracking-tight">Pasang Aplikasi Pasar Tegalsari</h4>
              <p className="text-[10px] text-emerald-100">Dapatkan akses instan langsung dari layar handphone Anda tanpa lewat Play Store / App Store!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={handleInstallClick}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
            >
              {deviceType.isIOS ? <Smartphone className="w-3.5 h-3.5" /> : <ArrowDownToLine className="w-3.5 h-3.5" />}
              Pasang Aplikasi
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
      )}

      {/* Interactive Install Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-up">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-5 relative">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight font-display text-white">Panduan Instalasi</h3>
                  <p className="text-xs text-emerald-100">Pasang aplikasi di layar utama HP Anda</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-gray-700">
              {deviceType.isIOS ? (
                // iOS Safari Guide
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Aplikasi Pasar Tegalsari dapat diinstal langsung di iPhone atau iPad Anda menggunakan Safari:</p>
                  
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
                // Android & general Guide
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Pasang aplikasi ini di handphone Android Anda untuk akses lebih cepat dan hemat kuota:</p>
                  
                  <div className="space-y-3.5">
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Ketuk ikon menu tiga titik <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⋮</strong> di pojok kanan atas browser Chrome / browser HP Anda.
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        Pilih menu <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded font-medium text-emerald-950">"Instal aplikasi"</strong> atau <strong className="text-gray-950 bg-gray-100 px-1.5 py-0.5 rounded">"Tambahkan ke Layar Utama"</strong>.
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
