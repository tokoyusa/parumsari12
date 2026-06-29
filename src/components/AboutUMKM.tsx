/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, ShieldCheck, MapPin, Truck, BadgeDollarSign, Sparkles, 
  Cpu, ArrowRight, HelpCircle, Download, Copy, Check, RefreshCw, 
  AlertCircle, CheckCircle2, ChevronRight, Settings, Image as ImageIcon,
  BookOpen, User, Users, ShoppingBag, Coins, Key, ClipboardList, ChevronDown, 
  CheckCircle, Store, Award, FileText, Printer, Presentation
} from 'lucide-react';
import { AppSetting } from '../types';

interface AboutUMKMProps {
  appSettings: AppSetting | null;
  initialSubTab?: 'tentang' | 'portofolio' | 'ai-marketing' | 'panduan' | 'sosialisasi';
}

type SubTab = 'tentang' | 'portofolio' | 'ai-marketing' | 'panduan' | 'sosialisasi';

export default function AboutUMKM({ appSettings, initialSubTab }: AboutUMKMProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(initialSubTab || 'tentang');
  
  // State for guide role and accordion section in the Panduan tab
  const [guideRole, setGuideRole] = useState<'all' | 'buyer' | 'seller' | 'courier' | 'affiliate'>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>('akses');
  
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);
  const appName = appSettings?.app_name || 'PARUMSARI (Pasar UMKM Tegalsari)';
  
  // --- STATE FOR AI MARKETING LAB ---
  const [category, setCategory] = useState('Batik Tulis Tegalsari');
  const [productName, setProductName] = useState('');
  const [sellingPoints, setSellingPoints] = useState('');
  const [price, setPrice] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiResult, setAiResult] = useState<{
    description: string;
    copywriting: string;
    bannerSlogan: string;
    simulatedKeywords: string;
    source?: string;
  } | null>(null);

  // Canvas Settings
  const [canvasBgStyle, setCanvasBgStyle] = useState<'wood' | 'pastel' | 'nature' | 'beach' | 'batik'>('wood');
  const [canvasTextSize, setCanvasTextSize] = useState<number>(24);
  const [canvasBgBlur, setCanvasBgBlur] = useState<number>(0);
  const [canvasTextColor, setCanvasTextColor] = useState<string>('#ffffff');
  const [canvasOverlayOpacity, setCanvasOverlayOpacity] = useState<number>(45);

  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedCopy, setCopiedCopy] = useState(false);
  const [copiedSlogan, setCopiedSlogan] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Image URLs (High-quality Unsplash presets with CORS allowed)
  const bgImagePresets = {
    wood: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    pastel: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    nature: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    batik: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'
  };

  const bgStyleLabels = {
    wood: 'Meja Kayu Rustik (Rustic Wood)',
    pastel: 'Studio Minimalis (Clean Pastel)',
    nature: 'Nuansa Alam Hijau (Eco-Nature)',
    beach: 'Pantai Kandeman (Sunset Beach)',
    batik: 'Latar Batik Tradisional (Classic Batik)'
  };

  // Preset Product Suggestion Handler
  const handleSelectPreset = (presetName: string, presetCat: string, presetPoints: string, presetPrice: string) => {
    setProductName(presetName);
    setCategory(presetCat);
    setSellingPoints(presetPoints);
    setPrice(presetPrice);
  };

  // Generate Copywriting API Caller
  const handleGenerateAI = async () => {
    if (!productName.trim()) {
      alert('Silakan masukkan nama produk terlebih dahulu!');
      return;
    }

    setIsLoadingAI(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai/marketing-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          category,
          sellingPoints,
          price
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResult({
          description: data.description,
          copywriting: data.copywriting,
          bannerSlogan: data.bannerSlogan,
          simulatedKeywords: data.simulatedKeywords,
          source: data.source
        });
      } else {
        throw new Error(data.error || 'Gagal menghasilkan materi dari server');
      }
    } catch (err: any) {
      console.error('Error generating marketing kit:', err);
      // Fallback local mock simulation
      const mockResult = {
        description: `✨ *${productName.toUpperCase()}* - Keaslian Rasa Desa Tegalsari, Kandeman, Batang! ✨\n\nProduk istimewa kategori *${category}* yang dibuat dengan ketelitian dan cinta oleh pengrajin/produsen lokal Desa Tegalsari. Menggunakan bahan pilihan bermutu tinggi.\n\n🔥 *Keunggulan Utama:*\n- ${sellingPoints || 'Rasa otentik lezat, higienis, dan tanpa pengawet'}\n- Mendukung pertumbuhan ekonomi lokal\n\n💰 *Harga:* Rp ${price ? Number(price).toLocaleString('id-ID') : 'Hubungi Penjual'}\n\nDukung gerakan UMKM lokal dengan membeli karya tetangga kita sendiri!`,
        copywriting: `📢 PROMO KHUSUS KARYA TETANGGA! 📢\n\nSudah coba *${productName}*? 😍\n\nYuk nikmati sensasi rasa otentik khas Desa Tegalsari, Kecamatan Kandeman, Kabupaten Batang. Sangat cocok disajikan untuk keluarga besar atau sebagai cemilan berkualitas!\n\n🚗 *Sistem Pengiriman COD:* Belanja di aplikasi PARUMSARI sangat praktis! Barang diantar langsung ke rumah Anda via Kurir Desa dan bayar setelah sampai di tempat!\n\nStok terbatas! Pesan sekarang! 👇\n\n#Parumsari #UMKMTegalsari #KandemanBatang #BeliKaryaTetangga #BatangBisa`,
        bannerSlogan: `Otentik & Alami khas Desa Tegalsari`,
        simulatedKeywords: 'local product, delicious, hand-made'
      };
      setAiResult(mockResult);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Re-draw Canvas whenever options change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // CRITICAL FOR CORS CANVAS SAVE
    img.src = bgImagePresets[canvasBgStyle];

    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply blur effect using canvas filter (with fallback for some browsers)
      if (canvasBgBlur > 0) {
        ctx.save();
        ctx.filter = `blur(${canvasBgBlur}px)`;
        ctx.drawImage(img, -canvasBgBlur * 2, -canvasBgBlur * 2, canvas.width + canvasBgBlur * 4, canvas.height + canvasBgBlur * 4);
        ctx.restore();
      }

      // Draw dark semi-transparent card overlay
      const overlayColor = canvasTextColor === '#ffffff' ? '0, 0, 0' : '255, 255, 255';
      ctx.fillStyle = `rgba(${overlayColor}, ${canvasOverlayOpacity / 100})`;
      ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

      // Draw decorative gold frame borders for premium Batang/Tegalsari look
      ctx.strokeStyle = canvasTextColor === '#ffffff' ? '#e2e8f0' : '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

      ctx.strokeStyle = '#d97706'; // Gold accent
      ctx.lineWidth = 1;
      ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

      // Drawing texts
      ctx.fillStyle = canvasTextColor;
      ctx.textAlign = 'center';
      
      // Category / Brand Tag
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.fillStyle = '#f59e0b'; // Gold accent for tag
      ctx.fillText(`PARUMSARI BRAND MARKETING`, canvas.width / 2, 90);
      ctx.fillStyle = canvasTextColor;

      // Product Name
      ctx.font = 'bold 28px "Space Grotesk", "Inter", sans-serif';
      const prodNameUpper = (productName || 'Nama Produk UMKM').toUpperCase();
      ctx.fillText(prodNameUpper, canvas.width / 2, 140);

      // Slogan line
      ctx.font = `italic ${canvasTextSize}px "Inter", sans-serif`;
      const sloganText = aiResult?.bannerSlogan || "Rasa Otentik Khas Tegalsari!";
      
      // Wrap slogan text if too long
      const words = sloganText.split(' ');
      let line = '';
      let y = 200;
      const maxWidth = canvas.width - 160;
      const lineHeight = canvasTextSize + 6;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // Price Tag (If present)
      if (price) {
        const formattedPrice = `Rp ${Number(price).toLocaleString('id-ID')}`;
        ctx.fillStyle = '#10b981'; // Emerald/Green for price tag
        ctx.fillRect(canvas.width / 2 - 100, y + 40, 200, 36);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "JetBrains Mono", "Fira Code", monospace';
        ctx.fillText(formattedPrice, canvas.width / 2, y + 63);
      }

      // Footer branding
      ctx.fillStyle = canvasTextColor === '#ffffff' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.6)';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(`PRODUKSI ASLI: DESA TEGALSARI, KANDEMAN, BATANG`, canvas.width / 2, canvas.height - 75);
    };
  }, [productName, category, price, aiResult, canvasBgStyle, canvasTextSize, canvasBgBlur, canvasTextColor, canvasOverlayOpacity]);

  // Handle Download Action
  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = `parumsari_promo_${productName ? productName.toLowerCase().replace(/\s+/g, '_') : 'umkm'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to download image from canvas:', err);
      alert('Gagal mendownload gambar. Kemungkinan gambar latar belakang masih loading dari Unsplash.');
    }
  };

  // Copy Clipboard Helper
  const handleCopyToClipboard = (text: string, type: 'desc' | 'copy' | 'slogan') => {
    navigator.clipboard.writeText(text);
    if (type === 'desc') {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    } else if (type === 'copy') {
      setCopiedCopy(true);
      setTimeout(() => setCopiedCopy(false), 2000);
    } else if (type === 'slogan') {
      setCopiedSlogan(true);
      setTimeout(() => setCopiedSlogan(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-emerald-100 shadow-md overflow-hidden">
      {/* Portfolio Title & Banner */}
      <div className="relative bg-emerald-950 text-white p-8 md:p-12 overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200')" }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            Portofolio & Pusat Pemasaran AI
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
            PARUMSARI
          </h1>
          <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            Pasar Online UMKM Desa Tegalsari, Kecamatan Kandeman, Kabupaten Batang. Menghubungkan pembeli, penjual lokal, dan kurir dalam satu ekosistem digital terintegrasi.
          </p>
        </div>
      </div>

      {/* SUB-TAB NAVIGATION */}
      <div className="bg-white border-b border-slate-200/80 px-4 md:px-8 flex flex-wrap gap-1 md:gap-2">
        <button
          onClick={() => setActiveSubTab('tentang')}
          className={`px-4 py-4 font-display text-xs md:text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'tentang'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-emerald-700'
          }`}
        >
          <Leaf className="w-4 h-4 shrink-0" />
          Tentang Aplikasi & Desa
        </button>

        <button
          onClick={() => setActiveSubTab('portofolio')}
          className={`px-4 py-4 font-display text-xs md:text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'portofolio'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-emerald-700'
          }`}
        >
          <Cpu className="w-4 h-4 shrink-0" />
          Portofolio Teknis & Alur COD
        </button>

        <button
          onClick={() => setActiveSubTab('ai-marketing')}
          className={`px-4 py-4 font-display text-xs md:text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'ai-marketing'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-emerald-700'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          AI Marketing Lab (AI Tool)
        </button>

        <button
          onClick={() => setActiveSubTab('panduan')}
          className={`px-4 py-4 font-display text-xs md:text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'panduan'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-emerald-700'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
          Panduan & Tutorial Lengkap
        </button>

        <button
          onClick={() => setActiveSubTab('sosialisasi')}
          className={`px-4 py-4 font-display text-xs md:text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'sosialisasi'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-emerald-700'
          }`}
        >
          <Presentation className="w-4 h-4 text-emerald-600 shrink-0" />
          Materi Sosialisasi (PDF / Presentasi)
        </button>
      </div>

      {/* SUB-TAB CONTENTS */}
      <div className="p-4 md:p-8">
        
        {/* TAB 1: TENTANG APLIKASI & DESA */}
        {activeSubTab === 'tentang' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Introductory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-emerald-950 font-display flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    Profil Singkat Desa Tegalsari
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Desa Tegalsari terletak di wilayah pesisir strategis Kecamatan Kandeman, Kabupaten Batang, Jawa Tengah. Diberkahi dengan kekayaan hasil laut, lahan pertanian kelapa yang subur, serta masyarakat kreatif yang terampil membuat aneka produk olahan seperti emping, keripik pisang madu, dan kerajinan batik tulis Batang. 
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Aplikasi <strong>PARUMSARI</strong> lahir sebagai wadah digital mandiri untuk menjembatani potensi lokal ini agar lebih dikenal, mudah diakses oleh pembeli luar daerah, dan melancarkan sirkulasi ekonomi warga desa tanpa potongan biaya pihak ketiga yang memberatkan.
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-xs text-emerald-900 font-medium">
                  📍 Kecamatan Kandeman - Kabupaten Batang, Jawa Tengah
                </div>
              </div>

              {/* Ecosystem Pillars */}
              <div className="bg-emerald-900 text-emerald-100 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    Komitmen Ekosistem PARUMSARI
                  </h3>
                  <p className="text-xs md:text-sm text-emerald-200/90 leading-relaxed">
                    Kami memprioritaskan rasa saling percaya, kejujuran kualitas, dan keberlanjutan sosial. Setiap produk yang dipajang di pasar online ini diproduksi langsung oleh tetangga-tetangga kita di Desa Tegalsari, menjamin kesegaran, keaslian, dan harga yang adil bagi produsen dan konsumen.
                  </p>
                  <ul className="text-xs space-y-2 text-emerald-200">
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                      100% Milik dan Dioperasikan Warga Desa
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                      Sistem Pembayaran COD Aman Nyaman
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                      Pengiriman Cepat via Kurir Lokal Penduduk Desa
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-amber-300 border-t border-emerald-800/60 pt-3">
                  🌱 Mendorong Gerakan "Bangga Beli Karya Tetangga"
                </div>
              </div>
            </div>

            {/* Main Feature Pillars */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-emerald-950 font-display text-center">Fasilitas & Fitur Ekosistem</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-emerald-500/30 transition shadow-3xs">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-sm">Kurir Mandiri & COD</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Sistem pengantaran langsung oleh kurir lokal dengan tarif berbasis kilometer akurat. Bayar di Tempat (COD) menjamin transaksi aman bebas penipuan.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-emerald-500/30 transition shadow-3xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <BadgeDollarSign className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-amber-900 text-sm">Afiliasi Pedesaan</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Warga dapat merekomendasikan produk milik tetangga melalui link khusus. Ketika ada transaksi, sistem otomatis membagi komisi yang disepakati.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-emerald-500/30 transition shadow-3xs">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-blue-950 text-sm">Peta Lokasi Presisi</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Integrasi Google Maps untuk penentuan pin point titik pengiriman, menghitung jarak rute real-time untuk transparansi ongkos kirim.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-emerald-500/30 transition shadow-3xs">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-purple-950 text-sm">AI Marketing Tool</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Asisten AI digital yang membantu UMKM merancang deskripsi produk yang memikat, copywriting iklan sosial media, serta mendesain banner visual promosi.
                  </p>
                </div>

              </div>
            </div>

            {/* Regional Village Map */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="font-bold text-center text-emerald-950 font-display text-sm mb-4 uppercase tracking-wider">Cakupan Wilayah Pedukuhan Desa Tegalsari, Batang</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                {['Dukuh Tegalsari Centro', 'Dukuh Krajan', 'Dukuh Karanganyar', 'Dukuh Pesisir Kandeman', 'Dukuh Sawah Tengah', 'Dukuh Kebon Kelapa'].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center justify-center gap-1.5 font-medium text-emerald-950 hover:bg-emerald-50 transition">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTOFOLIO TEKNIS & ALUR COD */}
        {activeSubTab === 'portofolio' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Tech Stack Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-emerald-950 font-display text-center">Teknologi Arsitektur Aplikasi (Tech Stack)</h3>
              <p className="text-xs md:text-sm text-slate-500 text-center max-w-2xl mx-auto leading-relaxed">
                PARUMSARI dibangun dengan arsitektur modern berkinerja tinggi, menjamin keamanan transaksi keuangan, keandalan kalkulasi pengiriman, serta kecepatan akses pengguna.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* Tech Front */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-3xs">
                  <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    Frontend & UI Interaktif
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Framework Inti</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">React 19 (TypeScript)</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Metode Styling</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Tailwind CSS (Vite)</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Set Icon Desain</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Lucide-React</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Animasi Layout</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Framer Motion</span>
                    </li>
                  </ul>
                </div>

                {/* Tech Back */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-3xs">
                  <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    Backend & API Server
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Web Server</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Node.js / Express</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Penyusun & Bundle</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Esbuild / tsx</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Sistem Database</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">PostgreSQL / Supabase</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Real-time DB</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Supabase JS Realtime</span>
                    </li>
                  </ul>
                </div>

                {/* Tech Fintech */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-3xs">
                  <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    API Integrasi Eksternal
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Payment Gateway</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Pakasir QRIS & WD API</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Artificial Intelligence</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">@google/genai (Gemini)</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span>Lacak Resi Eksternal</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">BinderByte API Link</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Mesin Ongkir Lokal</span>
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[10px] font-bold">Smart Distance Engine</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Interactive Stepper / Alur Transaksi */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-emerald-950 font-display text-center uppercase tracking-wide">
                Alur Kerja Teknis Ekosistem PARUMSARI
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Stepper 1: Seller */}
                <div className="border border-emerald-100 bg-emerald-50/20 p-5 rounded-xl space-y-3.5">
                  <div className="inline-flex px-2.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-lg uppercase">
                    Alur 1: Pendaftaran Seller / UMKM
                  </div>
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Registrasi Akun</p>
                        <p className="text-slate-500 text-[11px]">Membuat akun dan memverifikasi data di tab profil.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Aktivasi Toko (Vendor)</p>
                        <p className="text-slate-500 text-[11px]">Melengkapi detail badan usaha, nama toko, logo, dan nomor HP WhatsApp.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Penentuan Koordinat GPS Toko</p>
                        <p className="text-slate-500 text-[11px]">Melakukan pinning lokasi toko pada Google Maps terintegrasi untuk patokan asal hitungan ongkir.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Input Produk & Siap Jualan</p>
                        <p className="text-slate-500 text-[11px]">Unggah foto produk, harga, kategori, berat, sisa stok, dan siap menerima order.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stepper 2: Buyer */}
                <div className="border border-amber-100 bg-amber-50/10 p-5 rounded-xl space-y-3.5">
                  <div className="inline-flex px-2.5 py-1 bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold rounded-lg uppercase">
                    Alur 2: Pembelian & Checkout Buyer
                  </div>
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Pilih Produk & Masuk Keranjang</p>
                        <p className="text-slate-500 text-[11px]">Mengeksplorasi katalog, memasukkan ke keranjang, mendukung program affiliate jika ada.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Setting Pin Point Lokasi Kirim</p>
                        <p className="text-slate-500 text-[11px]">Menentukan titik koordinat tujuan pengiriman pada peta secara presisi.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Kalkulasi Ongkir Otomatis</p>
                        <p className="text-slate-500 text-[11px]">Sistem menghitung jarak Haversine (titik asal ke titik tujuan) dan mengalikan tarif per-KM kurir lokal.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Pilihan Metode Pembayaran</p>
                        <p className="text-slate-500 text-[11px]">Bisa memilih QRIS/VA Pakasir otomatis untuk cashless, atau memilih COD (Tunai saat serah terima).</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stepper 3: Courier / COD */}
                <div className="border border-blue-100 bg-blue-50/20 p-5 rounded-xl space-y-3.5">
                  <div className="inline-flex px-2.5 py-1 bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold rounded-lg uppercase">
                    Alur 3: Pengiriman COD & Kurir Desa
                  </div>
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Konfirmasi Pesanan</p>
                        <p className="text-slate-500 text-[11px]">Seller menerima notifikasi order, mengemas barang, dan menunjuk Kurir Mandiri Desa.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Penjemputan & Pengantaran</p>
                        <p className="text-slate-500 text-[11px]">Kurir mengambil barang di kediaman seller dan mengantarkannya berdasarkan GPS pin point pembeli.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Pembayaran COD di Tempat</p>
                        <p className="text-slate-500 text-[11px]">Kurir menyerahkan barang, pembeli memeriksa keaslian produk dan membayar tunai di tempat.</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Pencairan Otomatis (Settlement)</p>
                        <p className="text-slate-500 text-[11px]">Kurir mengonfirmasi penyelesaian, saldo otomatis terbagi proporsional ke dompet seller dan affiliate (jika ada).</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI MARKETING LAB (AI TOOL) */}
        {activeSubTab === 'ai-marketing' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Lab Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-extrabold text-amber-950 text-base flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  Laboratorium Pemasaran AI PARUMSARI
                </h3>
                <p className="text-amber-900 text-xs max-w-2xl leading-relaxed">
                  Gunakan asisten AI Gemini tercanggih untuk membuat konten pemasaran profesional. Tulis deskripsi produk e-commerce, salin teks promosi sosial media (WA/FB/IG), dan buat banner grafis untuk diunduh secara instan!
                </p>
              </div>
              <div className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-[10px] font-bold font-mono tracking-wider flex items-center gap-1.5 shrink-0 uppercase shadow-xs">
                Gemini 3.5-Flash
              </div>
            </div>

            {/* AI Input Form & Preset Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input (5 Columns) */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-3xs">
                <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Rincian Informasi Produk</h4>
                
                {/* Preset suggestions */}
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase">Klik untuk Mencoba Contoh Preset:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => handleSelectPreset('Batik Tulis Motif Tegalsari', 'Batik Tulis Tegalsari', 'Asli buatan tangan canting, warna alam pesisir, kain primissima premium', '250000')}
                      className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-100 transition cursor-pointer"
                    >
                      Batik Tulis
                    </button>
                    <button 
                      onClick={() => handleSelectPreset('Keripik Pisang Madu Tegalsari', 'Makanan Olahan', 'Manis legit alami tanpa gula tambahan, renyah tipis, bebas pengawet', '15000')}
                      className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold px-2.5 py-1.5 rounded-lg border border-amber-100 transition cursor-pointer"
                    >
                      Keripik Pisang
                    </button>
                    <button 
                      onClick={() => handleSelectPreset('Madu Hutan Liar Kandeman', 'Kesehatan / Herbal', 'Murni 100% diambil dari sarang liar pohon kelapa, meningkatkan imun tubuh', '85000')}
                      className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg border border-blue-100 transition cursor-pointer"
                    >
                      Madu Hutan
                    </button>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Produk UMKM:</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Keripik Singkong Renyah Tegalsari" 
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 bg-slate-50/50 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Kategori Produk:</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 bg-slate-50/50 font-sans cursor-pointer"
                    >
                      <option value="Batik Tulis Tegalsari">Batik Tulis Tegalsari</option>
                      <option value="Makanan Olahan">Makanan Olahan / Cemilan</option>
                      <option value="Hasil Bumi & Laut">Hasil Bumi & Laut Tradisional</option>
                      <option value="Kerajinan Tangan">Kerajinan Tangan / Kriya</option>
                      <option value="Kesehatan / Herbal">Kesehatan / Minuman Herbal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Keunggulan Utama (Pisahkan koma):</label>
                    <textarea 
                      rows={2}
                      placeholder="Contoh: rasa asin gurih, digoreng kelapa murni, kemasan kedap udara awet 6 bulan" 
                      value={sellingPoints}
                      onChange={(e) => setSellingPoints(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 bg-slate-50/50 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Harga Produk (Rupiah):</label>
                    <input 
                      type="number" 
                      placeholder="Contoh: 15000" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 bg-slate-50/50 font-mono"
                    />
                  </div>

                  <button
                    onClick={handleGenerateAI}
                    disabled={isLoadingAI}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer transition flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoadingAI ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        Sedang Menyusun Materi AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        BUAT KONTEN PEMASARAN AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output Content & Live Canvas Preview (7 Columns) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual loading placeholder when nothing has been generated yet */}
                {!aiResult && !isLoadingAI && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-64 shadow-3xs">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center animate-bounce">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h5 className="font-extrabold text-slate-800 text-sm font-display">Asisten AI Anda Siap Membantu</h5>
                    <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                      Lengkapi rincian informasi produk Anda di sebelah kiri, atau pilih preset untuk menguji kecerdasan AI. Tekan tombol buat untuk melihat keajaiban!
                    </p>
                  </div>
                )}

                {/* Loading State Spinner */}
                {isLoadingAI && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-64 shadow-3xs">
                    <RefreshCw className="w-10 h-10 animate-spin text-amber-500" />
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-slate-800 text-sm">Menghubungi Otak AI Gemini...</h5>
                      <p className="text-slate-400 text-xs animate-pulse">
                        Menganalisis kata kunci, merangkai deskripsi persuasif, dan menyusun slogan gambar promosi...
                      </p>
                    </div>
                  </div>
                )}

                {/* Render Result Content */}
                {aiResult && !isLoadingAI && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Copywriting Output Tabs (Tabs inside tabs for copywrites) */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden">
                      <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200/60 flex justify-between items-center">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                          Materi Teks Hasil AI ({aiResult.source === 'gemini_api' ? 'Gemini Live API' : 'Fallback Engine'})
                        </span>
                        {aiResult.source === 'gemini_api' && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded uppercase">Connected</span>
                        )}
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Box 1: Description */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase">Deskripsi Produk (SEO & E-Commerce):</label>
                            <button 
                              onClick={() => handleCopyToClipboard(aiResult.description, 'desc')}
                              className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              {copiedDesc ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedDesc ? 'Copied!' : 'Salin Deskripsi'}
                            </button>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed max-h-40 overflow-y-auto font-medium">
                            {aiResult.description}
                          </div>
                        </div>

                        {/* Box 2: Social Media Caption */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase">Promosi Media Sosial (WhatsApp / Instagram / FB):</label>
                            <button 
                              onClick={() => handleCopyToClipboard(aiResult.copywriting, 'copy')}
                              className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCopy ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedCopy ? 'Copied!' : 'Salin Promosi'}
                            </button>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed max-h-40 overflow-y-auto font-medium">
                            {aiResult.copywriting}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graphic/Banner Creator Tool (HTML5 Canvas) */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden">
                      <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200/60 flex justify-between items-center">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                          Studio Banner & Desainer Visual Produk
                        </span>
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                      </div>

                      <div className="p-4 md:p-6 space-y-6">
                        
                        {/* Live Canvas Canvas */}
                        <div className="flex justify-center bg-slate-50 border border-slate-200/50 p-4 rounded-xl relative overflow-hidden">
                          <canvas 
                            ref={canvasRef} 
                            width={500} 
                            height={400} 
                            className="max-w-full rounded-lg border border-slate-200 bg-white shadow-md aspect-4/3"
                          />
                        </div>

                        {/* Controls Panel */}
                        <div className="space-y-4 border-t border-slate-100 pt-4">
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Kostumisasi Desain Visual:</h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Bg Preset Picker */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Tema Background Foto:</label>
                              <select 
                                value={canvasBgStyle}
                                onChange={(e) => setCanvasBgStyle(e.target.value as any)}
                                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 bg-slate-50/50 font-sans cursor-pointer"
                              >
                                {Object.keys(bgImagePresets).map((preset) => (
                                  <option key={preset} value={preset}>
                                    {bgStyleLabels[preset as keyof typeof bgStyleLabels]}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Text Color Picker */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Warna Teks Utama:</label>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setCanvasTextColor('#ffffff')}
                                  className={`w-6 h-6 rounded-full border border-slate-300 bg-white transition cursor-pointer ${canvasTextColor === '#ffffff' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
                                  title="White Text on Dark Card"
                                />
                                <button
                                  onClick={() => setCanvasTextColor('#0f172a')}
                                  className={`w-6 h-6 rounded-full border border-slate-300 bg-slate-900 transition cursor-pointer ${canvasTextColor === '#0f172a' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
                                  title="Dark Text on Soft Card"
                                />
                                <button
                                  onClick={() => setCanvasTextColor('#fef08a')}
                                  className={`w-6 h-6 rounded-full border border-slate-300 bg-yellow-200 transition cursor-pointer ${canvasTextColor === '#fef08a' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
                                  title="Yellow Text"
                                />
                                <button
                                  onClick={() => setCanvasTextColor('#f9a8d4')}
                                  className={`w-6 h-6 rounded-full border border-slate-300 bg-pink-300 transition cursor-pointer ${canvasTextColor === '#f9a8d4' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
                                  title="Pink Text"
                                />
                              </div>
                            </div>

                            {/* Blur BG Slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                                <span>Efek Blur Latar Belakang:</span>
                                <span className="font-mono">{canvasBgBlur}px</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="10" 
                                value={canvasBgBlur}
                                onChange={(e) => setCanvasBgBlur(Number(e.target.value))}
                                className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                            </div>

                            {/* Font Size Slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                                <span>Ukuran Font Slogan:</span>
                                <span className="font-mono">{canvasTextSize}px</span>
                              </div>
                              <input 
                                type="range" 
                                min="18" 
                                max="32" 
                                value={canvasTextSize}
                                onChange={(e) => setCanvasTextSize(Number(e.target.value))}
                                className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                            </div>

                            {/* Card Opacity */}
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                                <span>Kontras Latar Teks (Overlay):</span>
                                <span className="font-mono">{canvasOverlayOpacity}%</span>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="90" 
                                value={canvasOverlayOpacity}
                                onChange={(e) => setCanvasOverlayOpacity(Number(e.target.value))}
                                className="w-full accent-emerald-600 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              />
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={handleDownloadCanvas}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition flex items-center gap-2"
                            >
                              <Download className="w-4 h-4 text-white" />
                              UNDUH FOTO / BANNER PROMOSI (PNG)
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* TAB 4: PANDUAN & TUTORIAL LENGKAP */}
        {activeSubTab === 'panduan' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Banner */}
            <div className="relative bg-emerald-950 text-white p-6 md:p-10 rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200')" }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-800/30 rounded-full blur-2xl -mr-12 -mt-12" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-semibold tracking-wide uppercase">
                  <BookOpen className="w-3.5 h-3.5 animate-bounce" />
                  Pusat Panduan & Akademi PARUMSARI
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
                  Panduan Penggunaan Sistem Terlengkap
                </h3>
                <p className="text-emerald-100/90 text-xs md:text-sm max-w-2xl leading-relaxed font-light">
                  Temukan rincian alur kerja dari instalasi, registrasi akun, pinning peta GPS, pemrosesan order COD, hingga program afiliasi desa untuk menambah penghasilan.
                </p>
              </div>
            </div>

            {/* Role Filter Selector */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-3xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-800 text-sm">Pilih Fokus Panduan Berdasarkan Peran Anda:</h4>
                  <p className="text-slate-400 text-xs">Membantu menyaring langkah-langkah spesifik agar sesuai dengan kebutuhan transaksi Anda.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-bold bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Panduan Interaktif
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: 'all', label: 'Semua Peran', icon: Users, color: 'emerald' },
                  { id: 'buyer', label: 'Sebagai Pembeli (Buyer)', icon: ShoppingBag, color: 'blue' },
                  { id: 'seller', label: 'Sebagai Penjual (Vendor)', icon: Store, color: 'amber' },
                  { id: 'courier', label: 'Sebagai Kurir Lokal', icon: Truck, color: 'purple' },
                  { id: 'affiliate', label: 'Sebagai Afiliator Desa', icon: Award, color: 'rose' }
                ].map((roleItem) => {
                  const IconComponent = roleItem.icon;
                  const isSelected = guideRole === roleItem.id;
                  let bgActiveClass = 'bg-emerald-600 border-emerald-600 text-white shadow-md';
                  let bgInactiveClass = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80';
                  
                  if (roleItem.id === 'buyer') bgActiveClass = 'bg-blue-600 border-blue-600 text-white shadow-md';
                  else if (roleItem.id === 'seller') bgActiveClass = 'bg-amber-500 border-amber-500 text-slate-950 shadow-md';
                  else if (roleItem.id === 'courier') bgActiveClass = 'bg-purple-600 border-purple-600 text-white shadow-md';
                  else if (roleItem.id === 'affiliate') bgActiveClass = 'bg-rose-600 border-rose-600 text-white shadow-md';

                  return (
                    <button
                      key={roleItem.id}
                      onClick={() => {
                        setGuideRole(roleItem.id as any);
                        // Auto-expand first relevant section
                        if (roleItem.id === 'buyer') setExpandedSection('buyer-order');
                        else if (roleItem.id === 'seller') setExpandedSection('seller-store');
                        else if (roleItem.id === 'courier') setExpandedSection('courier-shipping');
                        else if (roleItem.id === 'affiliate') setExpandedSection('affiliate-promo');
                        else setExpandedSection('akses');
                      }}
                      className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition duration-200 flex items-center gap-2 cursor-pointer ${
                        isSelected ? bgActiveClass : bgInactiveClass
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-current' : 'text-slate-400'}`} />
                      {roleItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion Steps List */}
            <div className="space-y-4">
              
              {/* SECTION 1: AKSES & INSTALASI */}
              {(guideRole === 'all' || guideRole === 'buyer' || guideRole === 'seller' || guideRole === 'courier' || guideRole === 'affiliate') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'akses' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'akses' ? null : 'akses')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'akses' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        1
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <Download className="w-4 h-4 text-emerald-600" />
                          Akses & Instalasi Aplikasi (PWA / Web Mobile)
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Langkah praktis menggunakan aplikasi tanpa Play Store / App Store</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'akses' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'akses' && (
                    <div className="p-6 border-t border-slate-100 space-y-6 animate-slideDown">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">A</div>
                          <h5 className="font-bold text-slate-800 text-xs">1. Buka Browser HP</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            Buka URL resmi aplikasi <strong>PARUMSARI</strong> menggunakan Google Chrome (sangat disarankan untuk Android) atau Safari (untuk Apple iPhone/iOS).
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">B</div>
                          <h5 className="font-bold text-slate-800 text-xs">2. Tambah Ke Layar Utama</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            Ketuk tombol menu browser (titik tiga `⋮` di Chrome atau ikon Share `⎋` di Safari iOS), scroll ke bawah dan pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">C</div>
                          <h5 className="font-bold text-slate-800 text-xs">3. Gunakan Layaknya App Native</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            Ikon aplikasi PARUMSARI kini ada di HP Anda. Aplikasi berjalan super ringan, hemat baterai, memuat cepat, dan mendukung akses offline parsial.
                          </p>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Keuntungan Teknologi PWA:</strong> Tidak perlu membuang kuota internet puluhan megabyte untuk mendownload file APK, tidak memperlambat kinerja RAM handphone lama, dan versi aplikasi akan terupdate secara otomatis setiap kali Anda membukanya!</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 2: REGISTRASI & PROFIL */}
              {(guideRole === 'all' || guideRole === 'buyer' || guideRole === 'seller' || guideRole === 'courier' || guideRole === 'affiliate') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'pendaftaran' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'pendaftaran' ? null : 'pendaftaran')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'pendaftaran' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        2
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-600" />
                          Registrasi Akun & Pengisian Koordinat GPS Alamat
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Cara mendaftar akun dan mengatur lokasi presisi pada Google Maps</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'pendaftaran' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'pendaftaran' && (
                    <div className="p-6 border-t border-slate-100 space-y-4 animate-slideDown text-slate-600 text-xs md:text-sm">
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Buka Halaman Formulir Pendaftaran</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Ketuk tombol <strong>Profil</strong> di navigasi utama, lalu pilih menu pendaftaran. Masukkan Nama Lengkap, nomor telepon WhatsApp (wajib valid), dan password Anda.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Simpan Pin Point Alamat pada Google Maps</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Cari tombol <strong>"Pilih Koordinat GPS"</strong>. Peta satelit Google Maps terintegrasi akan tampil. Seret/geser pin merah tepat di atas atap rumah Anda untuk memastikan posisi antar yang akurat. Klik <strong>"Simpan Lokasi"</strong>.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Satu Akun, Banyak Peran</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Secara default Anda terdaftar sebagai <strong>Pembeli (Buyer)</strong>. Dari akun yang sama, Anda dapat mengajukan pendaftaran sebagai <strong>Penjual (Vendor)</strong> atau <strong>Kurir</strong> tanpa perlu membuat akun baru!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 3: BUYER-ORDER */}
              {(guideRole === 'all' || guideRole === 'buyer') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'buyer-order' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'buyer-order' ? null : 'buyer-order')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'buyer-order' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        3
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-blue-600" />
                          Panduan Berbelanja & Transaksi COD (Untuk Buyer)
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Cara memesan produk, melacak ongkir otomatis, dan checkout COD / QRIS</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'buyer-order' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'buyer-order' && (
                    <div className="p-6 border-t border-slate-100 space-y-6 animate-slideDown text-slate-600 text-xs md:text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h5 className="font-extrabold text-blue-950 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Langkah demi Langkah Belanja:
                          </h5>
                          <ul className="space-y-3.5 text-xs">
                            <li className="flex gap-2">
                              <span className="text-blue-600 font-bold">1.</span>
                              <div>
                                <strong className="text-slate-800">Eksplorasi Katalog:</strong> Buka halaman depan aplikasi, cari produk olahan kelapa, kriya, emping, atau batik tulis hasil karya warga Tegalsari.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-blue-600 font-bold">2.</span>
                              <div>
                                <strong className="text-slate-800">Tambah ke Keranjang:</strong> Tentukan jumlah barang, klik tombol tambah ke keranjang belanjaan Anda.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-blue-600 font-bold">3.</span>
                              <div>
                                <strong className="text-slate-800">Perhitungan Jarak & Ongkir:</strong> Di halaman keranjang, sistem GPS akan mengukur jarak rute Haversine real-time dari toko penjual ke titik rumah Anda. Biaya ongkir transparan berbasis per-KM langsung dihitung otomatis.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-blue-600 font-bold">4.</span>
                              <div>
                                <strong className="text-slate-800">Pilih Sistem Pembayaran:</strong> Pilih <strong>COD (Bayar Tunai di Tempat)</strong> untuk transaksi tunai yang aman, atau pilih <strong>QRIS Pakasir</strong> untuk pembayaran instan non-tunai.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-blue-600 font-bold">5.</span>
                              <div>
                                <strong className="text-slate-800">Checkout & Kirim WhatsApp:</strong> Selesaikan pesanan. Aplikasi akan menyusun draf rincian pesanan dan mengarahkan Anda mengirim pesan WhatsApp otomatis ke nomor penjual agar proses pemesanan bisa dikonfirmasi sekejap mata.
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 flex flex-col justify-between">
                          <div className="space-y-3">
                            <h5 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-blue-600" />
                              Kenapa Harus Memilih COD PARUMSARI?
                            </h5>
                            <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                              Sistem Bayar di Tempat (Cash on Delivery) kami dikembangkan khusus untuk melindungi warga dari resiko penipuan online. Anda hanya perlu membayar ketika kurir lokal (yang merupakan tetangga kita sendiri di desa) telah tiba mengetuk pintu rumah Anda dan menyerahkan barang fisik pesanan Anda dengan baik.
                            </p>
                            <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                              Tidak ada biaya tersembunyi, semua tarif ongkos kirim dihitung transparan dari kilometer jarak tempuh koordinat GPS Anda secara akurat!
                            </p>
                          </div>
                          <div className="bg-white border border-blue-100 p-2.5 rounded-xl text-[10px] font-mono text-blue-950 font-bold text-center mt-4">
                            🤝 Mendukung Sirkulasi Ekonomi Desa Tegalsari
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 4: SELLER-STORE */}
              {(guideRole === 'all' || guideRole === 'seller') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'seller-store' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'seller-store' ? null : 'seller-store')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'seller-store' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                      }`}>
                        4
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <Store className="w-4 h-4 text-amber-600" />
                          Panduan Membuka Toko & Input Produk UMKM (Untuk Seller)
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Langkah pendaftaran toko, unggah produk jualan, dan manajemen order</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'seller-store' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'seller-store' && (
                    <div className="p-6 border-t border-slate-100 space-y-6 animate-slideDown text-slate-600 text-xs md:text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h5 className="font-extrabold text-amber-950 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Alur Pengelolaan Toko UMKM:
                          </h5>
                          <ul className="space-y-3.5 text-xs">
                            <li className="flex gap-2">
                              <span className="text-amber-600 font-bold">1.</span>
                              <div>
                                <strong className="text-slate-800">Daftarkan Toko Anda:</strong> Masuk ke tab <strong>Vendor</strong>, masukkan nama UMKM Anda, nomor WhatsApp aktif, deskripsi toko, dan pinpoint koordinat GPS lokasi toko Anda pada peta. Klik daftarkan.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-amber-600 font-bold">2.</span>
                              <div>
                                <strong className="text-slate-800">Tambahkan Produk:</strong> Masuk ke dashboard toko setelah disetujui admin. Upload foto produk, tentukan harga jual, stok barang, deskripsi produk, dan berat barang.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-amber-600 font-bold">3.</span>
                              <div>
                                <strong className="text-slate-800">Gunakan AI Marketing Lab:</strong> Manfaatkan sub-tab <strong>AI Marketing Lab</strong> di atas untuk menyusun deskripsi produk yang memikat, draf iklan WhatsApp, dan banner promosi bergambar otomatis gratis dalam hitungan detik!
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-amber-600 font-bold">4.</span>
                              <div>
                                <strong className="text-slate-800">Proses Orderan & Tunjuk Kurir:</strong> Ketika ada notifikasi pesanan masuk, siapkan barang Anda, klik tombol <strong>"Tunjuk Kurir Lokal"</strong> di panel kelola order, dan biarkan kurir desa menjemput paket ke tempat Anda.
                              </div>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-amber-600 font-bold">5.</span>
                              <div>
                                <strong className="text-slate-800">Pencairan Dana:</strong> Setelah kurir mengonfirmasi barang diterima pembeli, hasil penjualan bersih akan masuk ke dompet saldo toko Anda. Anda bisa melakukan penarikan saldo (Withdraw) kapan saja.
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-100 flex flex-col justify-between">
                          <div className="space-y-3">
                            <h5 className="font-extrabold text-amber-900 text-xs flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                              Pemasaran Otomatis Dengan Kecerdasan Buatan (AI)
                            </h5>
                            <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                              Sebagai pelopor ekosistem digital desa, PARUMSARI dilengkapi dengan asisten AI Gemini terintegrasi. Anda tidak perlu bingung menulis deskripsi produk e-commerce atau merangkai kata promosi di WhatsApp. Cukup ketik nama produk Anda, dan biarkan kecerdasan AI kami merancang konten promosi terbaik untuk mendongkrak penjualan produk Anda!
                            </p>
                          </div>
                          <div className="bg-white border border-amber-100 p-2.5 rounded-xl text-[10px] font-mono text-amber-950 font-bold text-center mt-4">
                            🚀 Tingkatkan Daya Saing UMKM Batang dengan Teknologi AI
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 5: COURIER-SHIPPING */}
              {(guideRole === 'all' || guideRole === 'courier') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'courier-shipping' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'courier-shipping' ? null : 'courier-shipping')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'courier-shipping' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        5
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <Truck className="w-4 h-4 text-purple-600" />
                          Alur Pengantaran Barang & Sistem COD (Untuk Kurir Lokal)
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Panduan kurir lokal menerima pesanan, navigasi GPS, dan transaksi penyerahan</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'courier-shipping' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'courier-shipping' && (
                    <div className="p-6 border-t border-slate-100 space-y-4 animate-slideDown text-slate-600 text-xs md:text-sm">
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">1</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Aktivasi Status Kurir Resmi</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Hubungi admin desa atau perwakilan koperasi desa untuk mengaktifkan peran akun Anda menjadi <strong>Kurir Resmi PARUMSARI</strong>.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">2</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Terima Notifikasi Tugas Pickup</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Saat toko menunjuk Anda, Anda akan mendapatkan notifikasi tugas pickup di panel kurir. Datang ke alamat fisik toko penjual (gunakan navigasi maps yang disediakan di aplikasi) untuk mengambil paket jualan.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">3</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Pengantaran Sesuai Peta GPS</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Bawa paket menuju lokasi rumah pembeli. Ketuk koordinat peta GPS pembeli untuk membuka petunjuk arah Google Maps yang presisi.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">4</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Penyerahan Barang & Konfirmasi Transaksi</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Serahkan paket kepada pembeli. Jika pesanan berupa <strong>COD</strong>, terima uang tunai dari pembeli sebesar nominal total di aplikasi. Klik tombol <strong>"Konfirmasi Selesai Antar"</strong>. Ongkos kirim Anda akan langsung ditransfer instan masuk ke saldo Wallet Kurir Anda!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 6: AFFILIATE-PROMO */}
              {(guideRole === 'all' || guideRole === 'affiliate') && (
                <div className={`bg-white rounded-2xl border transition duration-300 overflow-hidden ${
                  expandedSection === 'affiliate-promo' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'affiliate-promo' ? null : 'affiliate-promo')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        expandedSection === 'affiliate-promo' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        6
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-2">
                          <Award className="w-4 h-4 text-rose-600" />
                          Program Afiliasi Warga Desa (Penghasilan Tambahan Tanpa Modal)
                        </h4>
                        <p className="text-slate-400 text-[11px] font-medium">Cara membagikan link afiliasi produk tetangga dan menerima komisi otomatis</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSection === 'affiliate-promo' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedSection === 'affiliate-promo' && (
                    <div className="p-6 border-t border-slate-100 space-y-4 animate-slideDown text-slate-600 text-xs md:text-sm">
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">1</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Temukan Produk Menarik Milik Warga</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Buka <strong>Katalog</strong>, klik salah satu produk milik tetangga atau UMKM lain yang ingin Anda rekomendasikan ke teman atau keluarga.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">2</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Salin Link Afiliasi Unik</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Klik tombol <strong>"Bagikan Link Afiliasi"</strong> di halaman detail produk. Sistem secara otomatis membuat URL unik yang mereferensikan ID akun Anda secara aman.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">3</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Sebarkan di Media Sosial & Gunakan Banner AI</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Sebarkan link unik tersebut ke WhatsApp, Facebook, Instagram, atau TikTok. Anda bisa menggunakan <strong>AI Marketing Lab</strong> di atas untuk membuat kata-kata promosi menarik dan banner estetik secara instan!</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">4</div>
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-900 text-xs md:text-sm">Terima Komisi Otomatis Secara Instan</p>
                            <p className="text-slate-500 text-xs leading-relaxed">Setiap ada orang yang melakukan pembelian produk menggunakan link afiliasi Anda hingga sukses selesai, sistem secara otomatis akan membagi komisi penjualan (biasanya berkisar 5% - 10%) langsung masuk ke dompet Wallet Anda. Tarik saldo Anda kapan saja ke rekening bank.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Quick Navigation Footer */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4">
              <h4 className="font-extrabold text-emerald-950 text-sm">Sudah Memahami Seluruh Alur & Siap Mencoba?</h4>
              <p className="text-emerald-800 text-xs max-w-xl mx-auto leading-relaxed">
                Kembali ke halaman utama katalog untuk berbelanja, atau masuk ke halaman profil untuk melengkapi data pinpoint alamat GPS rumah Anda sekarang juga demi kelancaran pengantaran COD!
              </p>
              <div className="flex justify-center flex-wrap gap-3">
                <button 
                  onClick={() => {
                    const buttons = Array.from(document.querySelectorAll('button, a'));
                    const catalogBtn = buttons.find(b => b.textContent?.includes('Katalog') || b.textContent?.toLowerCase() === 'katalog');
                    if (catalogBtn) (catalogBtn as HTMLButtonElement).click();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Mulai Belanja di Katalog
                </button>
                <button 
                  onClick={() => {
                    const buttons = Array.from(document.querySelectorAll('button, a'));
                    const profileBtn = buttons.find(b => b.textContent?.includes('Profile') || b.textContent?.includes('Profil') || b.textContent?.toLowerCase() === 'profil');
                    if (profileBtn) (profileBtn as HTMLButtonElement).click();
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-emerald-900 border border-emerald-200 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-emerald-700" />
                  Lengkapi Profil & GPS Anda
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: MATERI SOSIALISASI & DOKUMEN PRESENTASI */}
        {activeSubTab === 'sosialisasi' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Print Action / Instructions Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 rounded-2xl border border-emerald-700 text-white shadow-md no-print space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-bold tracking-wide uppercase">
                    <Sparkles className="w-3 h-3 animate-pulse" /> Live Presentation & PDF Engine
                  </div>
                  <h4 className="font-extrabold text-white text-base md:text-lg">Dokumen Resmi Sosialisasi & Presentasi</h4>
                  <p className="text-emerald-100/80 text-xs max-w-xl">
                    Halaman ini dirancang khusus dengan format cetak profesional (A4-Optimized). Klik tombol di bawah untuk mencetak materi presentasi ini secara fisik atau menyimpannya sebagai file **PDF resmi berkualitas tinggi** untuk dibagikan kepada warga Desa Tegalsari.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 border-b-2 border-amber-600"
                >
                  <Printer className="w-4 h-4 text-slate-950" />
                  CETAK / SIMPAN SEBAGAI PDF
                </button>
              </div>
              <div className="border-t border-emerald-800/60 pt-3 flex flex-col md:flex-row gap-4 text-[10px] text-emerald-200/90 font-medium">
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-amber-400" /> **Cara Simpan PDF:** Saat jendela cetak terbuka, pastikan memilih tujuan cetak **"Simpan sebagai PDF" (Save as PDF)**.</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-amber-400" /> **Layout Optimal:** Pilih opsi Layout **"Potret" (Portrait)** dan aktifkan opsi **"Gambar latar belakang" (Background graphics)** agar warna logo dan tema tetap tampil anggun.</span>
              </div>
            </div>

            {/* Embed CSS inline khusus untuk cetak (Print Stylesheet override) */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                /* Sembunyikan elemen sidebar, navigasi, footer, dan tombol no-print */
                body, html {
                  background: white !important;
                  color: black !important;
                }
                nav, header, footer, .no-print, [role="navigation"], aside {
                  display: none !important;
                }
                /* Pastikan area presentasi ini saja yang dicetak dengan lebar penuh */
                #printable-presentation-doc {
                  visibility: visible !important;
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  box-shadow: none !important;
                  border: none !important;
                  background: white !important;
                  color: black !important;
                }
                .page-break {
                  page-break-before: always;
                  break-before: page;
                }
                /* Sempurnakan kontras warna cetak */
                .print-text-dark {
                  color: #0f172a !important;
                }
                .print-bg-emerald {
                  background-color: #064e3b !important;
                  color: white !important;
                }
                .print-bg-light {
                  background-color: #f8fafc !important;
                  border: 1px solid #e2e8f0 !important;
                }
              }
            `}} />

            {/* THE ACTUAL PRINTABLE AND BEAUTIFUL DOCUMENT CONTAINER */}
            <div 
              id="printable-presentation-doc" 
              className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10 text-slate-800"
            >
              
              {/* DOCUMENT HEADER / LOGO BAR */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-emerald-900/10 pb-8">
                {/* Visual App Logo Block */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-900 flex flex-col items-center justify-center shadow-md border-2 border-amber-400 relative overflow-hidden shrink-0">
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-amber-400/90 flex items-center justify-center">
                      <span className="text-[7px] font-black font-display text-emerald-950 uppercase tracking-widest">DESA</span>
                    </div>
                    <Leaf className="w-8 h-8 text-amber-300 mt-[-4px]" />
                    <Coins className="w-3.5 h-3.5 text-white absolute top-2 right-2" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight flex items-center gap-1.5">
                      PARUMSARI
                    </h3>
                    <p className="text-emerald-800 font-extrabold text-xs font-mono uppercase tracking-widest">
                      Pasar UMKM Tegalsari
                    </p>
                    <p className="text-slate-400 text-[10px] font-semibold">
                      Sinergi Ekonomi Berbasis Komunitas Desa & Kecerdasan Buatan
                    </p>
                  </div>
                </div>
                
                {/* Document Metadata Block */}
                <div className="text-center md:text-right font-mono text-[10px] text-slate-500 space-y-1 shrink-0 bg-slate-50 px-4 py-3 rounded-xl border border-slate-150">
                  <div><strong>Kategori:</strong> Dokumen Sosialisasi Warga</div>
                  <div><strong>Lokasi:</strong> Balai Desa Tegalsari, Kandeman, Batang</div>
                  <div><strong>Tanggal:</strong> Juni 2026</div>
                  <div className="text-emerald-700 font-bold">Status: Dokumen Resmi (Siap Sosialisasi)</div>
                </div>
              </div>

              {/* SECTION 1: PENDAHULUAN & MAKSUD */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-1">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  Bagian 1: Tujuan dan Maksud Aplikasi PARUMSARI
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">Mengapa Desa Tegalsari Membutuhkan PARUMSARI?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed text-slate-600 text-xs md:text-sm">
                  <div className="space-y-3">
                    <p>
                      Selama bertahun-tahun, warga pelaku usaha mikro di Desa Tegalsari menghadapi tantangan berat untuk berkembang. Penjualan olahan kelapa, emping melinjo, keripik pisang madu, baju batik tulis Batang, hingga aneka kerajinan tangan lokal seringkali terhambat oleh:
                    </p>
                    <ul className="space-y-2 pl-4 list-disc text-xs">
                      <li><strong>Ketergantungan Tengkulak:</strong> Penjual tidak memiliki kuasa menentukan harga adil, sehingga margin keuntungan menipis.</li>
                      <li><strong>Pemasaran Terbatas:</strong> Produk hanya beredar di kalangan tetangga atau pasar konvensional lokal karena tidak ada etalase digital bersama.</li>
                      <li><strong>Kendala Ongkir & Kepercayaan:</strong> Pembeli luar desa bingung menghitung ongkos kirim ke Tegalsari, serta takut ditipu dalam transaksi online.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-150 space-y-3">
                    <p className="font-extrabold text-emerald-950 text-xs md:text-sm">Solusi Nyata Dari Kita, Oleh Kita, Untuk Kita:</p>
                    <p className="text-xs">
                      <strong>PARUMSARI</strong> lahir sebagai wadah digital kolektif warga Desa Tegalsari. Bukan hanya sekedar website biasa, aplikasi ini adalah ekosistem mandiri yang menghubungkan Penjual (UMKM), Pembeli (Warga & Umum), dan Kurir Lokal (Pemuda Desa) dalam satu rantai transaksi yang aman, adil, dan transparan.
                    </p>
                    <p className="text-xs font-semibold text-emerald-800">
                      Misi Utama kami: "Mendigitalisasi kearifan lokal Tegalsari, mendistribusikan kemakmuran secara merata, dan memberdayakan warga tanpa potongan biaya pihak ketiga!"
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: TEKNOLOGI */}
              <div className="space-y-4 page-break pt-8">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-1">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  Bagian 2: Teknologi Modern & Keunggulan Sistem
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">Inovasi Digital Kelas Dunia yang Ramah Warga</h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">
                  PARUMSARI mengadopsi teknologi terdepan untuk memastikan sistem dapat diakses dengan mudah oleh semua kalangan warga, bahkan dengan handphone berspesifikasi rendah sekalipun.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center"><Download className="w-4 h-4" /></div>
                    <h5 className="font-bold text-slate-900 text-xs">PWA (Tanpa Instalasi Ribet)</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Sistem menggunakan teknologi Progressive Web App. Cukup ditambahkan ke layar HP langsung dari browser, menghemat memori, memuat super cepat, dan selalu update otomatis.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
                    <h5 className="font-bold text-slate-900 text-xs">Gemini AI (Kecerdasan Buatan)</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Asisten kecerdasan buatan dari Google terpasang langsung membantu warga membuat materi pemasaran, draf promosi WhatsApp, dan kata-kata produk e-commerce dalam 3 detik!
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                    <h5 className="font-bold text-slate-900 text-xs">GPS Haversine (Akurasi Rute)</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Menghitung jarak titik koordinat rumah penjual dan pembeli secara presisi. Memastikan biaya ongkos kirim transparan dan adil berdasarkan kilometer asli di lapangan.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                    <h5 className="font-bold text-slate-900 text-xs">Sistem COD Terproteksi</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Pembeli membayar tunai di tempat ketika paket sudah diterima dari Kurir Desa. Aman dari penipuan digital dan membangun rasa saling percaya antar tetangga.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: TUTORIAL LENGKAP */}
              <div className="space-y-6 page-break pt-8">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-1">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Bagian 3: Tutorial & Panduan Operasional Lengkap
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">Panduan Langkah Demi Langkah Bagi Seluruh Peran</h4>
                
                <div className="space-y-6">
                  {/* Tutorial 3.1 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 bg-slate-50 p-2 rounded-lg border-l-4 border-emerald-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center shrink-0">1</span>
                      Akses Aplikasi & Pemasangan di Layar Handphone (PWA)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed pl-7">
                      <div className="p-3 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-1.5">
                        <p className="font-bold text-emerald-950">Bagi Pengguna Android (Google Chrome):</p>
                        <p>1. Buka browser <strong>Google Chrome</strong> di handphone Anda.</p>
                        <p>2. Kunjungi link resmi aplikasi PARUMSARI.</p>
                        <p>3. Ketuk tanda titik tiga <strong className="text-slate-900">⋮</strong> di kanan atas browser.</p>
                        <p>4. Ketuk menu <strong className="text-slate-900">"Tambahkan ke Layar Utama" (atau "Instal Aplikasi")</strong>.</p>
                        <p>5. Selesai! Aplikasi kini muncul di menu HP Anda layaknya aplikasi resmi dari Play Store.</p>
                      </div>
                      <div className="p-3 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-1.5">
                        <p className="font-bold text-emerald-950">Bagi Pengguna iPhone / iOS (Safari):</p>
                        <p>1. Buka browser <strong>Safari</strong> bawaan handphone iPhone Anda.</p>
                        <p>2. Akses link resmi aplikasi PARUMSARI.</p>
                        <p>3. Ketuk tombol <strong className="text-slate-900">Share/Bagikan</strong> (ikon kotak dengan anak panah ke atas `⎋` di bawah layar).</p>
                        <p>4. Scroll ke bawah, pilih <strong className="text-slate-900">"Add to Home Screen" (Tambahkan ke Layar Utama)</strong>.</p>
                        <p>5. Selesai! Klik ikon di layar HP Anda kapan saja untuk berbelanja secara instan.</p>
                      </div>
                    </div>
                  </div>

                  {/* Tutorial 3.2 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 bg-slate-50 p-2 rounded-lg border-l-4 border-emerald-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center shrink-0">2</span>
                      Registrasi Akun Pembeli (Buyer) & Menyetel Alamat GPS
                    </h5>
                    <div className="text-xs text-slate-600 leading-relaxed pl-7 space-y-2">
                      <p>
                        Pendaftaran pembeli sangatlah cepat dan aman. Ikuti instruksi pendaftaran berikut untuk memastikan kurir desa dapat mengantarkan paket makanan/olahan dengan mulus tanpa tersesat:
                      </p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 max-w-2xl space-y-1.5">
                        <p>1. Klik tombol <strong className="text-emerald-900 font-bold">Profil</strong> di kanan atas navigasi utama aplikasi.</p>
                        <p>2. Pilih menu daftar, masukkan <strong className="text-slate-900">Nama Lengkap</strong>, <strong className="text-slate-900">Nomor WhatsApp Aktif</strong> (sangat penting untuk notifikasi pesanan), dan sandi.</p>
                        <p>3. Klik tombol <strong className="text-slate-900">"Pilih Koordinat GPS Alamat Anda"</strong>. Peta Google Maps akan terbuka.</p>
                        <p>4. Hidupkan sensor GPS handphone Anda, lalu geser pin merah tepat di atas atap rumah Anda pada peta. Klik <strong className="text-emerald-800">"Simpan Koordinat"</strong>.</p>
                        <p>5. Klik daftar. Akun pembeli Anda kini siap digunakan berbelanja apa saja!</p>
                      </div>
                    </div>
                  </div>

                  {/* Tutorial 3.3 */}
                  <div className="space-y-3 page-break pt-8">
                    <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 bg-slate-50 p-2 rounded-lg border-l-4 border-emerald-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center shrink-0">3</span>
                      Mendaftar Sebagai Penjual (Seller/Vendor) & Mengatur Toko
                    </h5>
                    <div className="text-xs text-slate-600 leading-relaxed pl-7 space-y-2">
                      <p>
                        Warga yang memiliki usaha (kuliner, kerajinan, konveksi, pertanian) dapat mengaktifkan fitur toko jualan di akun mereka secara gratis tanpa dipungut biaya admin sepeser pun:
                      </p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 max-w-2xl space-y-1.5">
                        <p>1. Masuk ke tab <strong className="text-slate-900">Vendor</strong> di dalam aplikasi.</p>
                        <p>2. Isi formulir pembuatan toko: <strong className="text-slate-900">Nama Toko/UMKM</strong>, deskripsi singkat jualan Anda, dan nomor WhatsApp toko.</p>
                        <p>3. Setel titik koordinat <strong className="text-slate-900">GPS Lokasi Toko</strong> (agar kurir tahu letak pasti saat menjemput pesanan).</p>
                        <p>4. Setelah disetujui Admin Desa, Anda akan memiliki akses penuh ke Dashboard Vendor eksklusif Anda untuk melihat hasil saldo dompet, jumlah pesanan, dan daftar kurir desa.</p>
                      </div>
                    </div>
                  </div>

                  {/* Tutorial 3.4 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 bg-slate-50 p-2 rounded-lg border-l-4 border-emerald-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center shrink-0">4</span>
                      Mengunggah Produk & Memanfaatkan Fitur 'AI Marketing Lab'
                    </h5>
                    <div className="text-xs text-slate-600 leading-relaxed pl-7 space-y-2">
                      <p>
                        Inilah rahasia jualan laris di PARUMSARI. Anda tidak perlu pusing memikirkan cara mengarang kata promosi WhatsApp atau deskripsi dagangan, serahkan semua pada asisten AI kita:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-amber-50/25 rounded-xl border border-amber-200/60 space-y-1.5">
                          <p className="font-extrabold text-amber-950 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Langkah Membuka AI Tool:
                          </p>
                          <p>1. Masuk ke halaman <strong className="text-slate-900">AI TOOL</strong> atau klik sub-tab <strong className="text-slate-900">AI Marketing Lab</strong>.</p>
                          <p>2. Pilih kategori produk Anda (misalnya: Kuliner, Kerajinan, Pertanian).</p>
                          <p>3. Masukkan nama produk asli jualan Anda (contoh: <em>"Emping Melinjo Super Gurih Asli Tegalsari"</em>).</p>
                          <p>4. Sebutkan beberapa kelebihan produk Anda secara acak (contoh: <em>"tanpa pengawet, dibuat dari melinjo pilihan, renyah dan gurih, digoreng minyak kelapa bersih"</em>).</p>
                          <p>5. Klik tombol <strong className="text-emerald-900 font-black">"Mulai Keajaiban AI"</strong>.</p>
                        </div>
                        <div className="p-3 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-1.5">
                          <p className="font-extrabold text-emerald-950 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Hasil Instan yang Siap Dipakai:
                          </p>
                          <p>- **Deskripsi Menarik:** Hasil deskripsi produk profesional siap disalin ke halaman jualan toko Anda agar pembeli terkesima.</p>
                          <p>- **Copywriting WhatsApp:** Teks iklan estetik lengkap dengan emoji manis siap Anda sebar ke grup-grup WhatsApp warga / luar desa.</p>
                          <p>- **Banner Gambar Promosi:** Gambar promosi estetik otomatis bertuliskan brand Anda siap disimpan ke galeri untuk status WhatsApp!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 4: HARAPAN & VISI */}
              <div className="space-y-4 page-break pt-8 border-t border-slate-200">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-1">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Bagian 4: Harapan, Impian & Visi Bersama
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">Sinergi Berkelanjutan Menuju Tegalsari Mandiri</h4>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 leading-relaxed text-slate-600 text-xs md:text-sm">
                  <p>
                    Aplikasi <strong>PARUMSARI</strong> bukanlah milik developer luar, melainkan milik seutuhnya seluruh warga Desa Tegalsari. Keberhasilan aplikasi ini sangat bergantung pada partisipasi aktif dan sinergi kita bersama di lapangan:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-1.5">
                      <p className="font-bold text-slate-900 text-xs">💻 Pelaku UMKM Tegalsari</p>
                      <p className="text-slate-500 text-[11px]">
                        Terus meningkatkan kualitas produk, memanfaatkan AI secara maksimal untuk promosi kreatif, dan merespon pesanan secepat mungkin demi nama baik desa.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-1.5">
                      <p className="font-bold text-slate-900 text-xs">🛵 Pemuda & Kurir Desa</p>
                      <p className="text-slate-500 text-[11px]">
                        Menjaga integritas layanan, mengantarkan paket COD dengan amanah dan senyuman ramah, serta merawat kepercayaan pembeli luar daerah.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-1.5">
                      <p className="font-bold text-slate-900 text-xs">👥 Seluruh Warga Desa</p>
                      <p className="text-slate-500 text-[11px]">
                        Memprioritaskan berbelanja kebutuhan harian di PARUMSARI demi menghidupkan sirkulasi perputaran uang di dalam desa kita sendiri.
                      </p>
                    </div>
                  </div>
                  <p className="text-center font-bold text-emerald-950 font-display text-xs md:text-sm pt-4 border-t border-slate-100">
                    Mari bersama-sama kita jadikan Desa Tegalsari sebagai Desa Pelopor Ekonomi Digital Komunitas di Kabupaten Batang!
                  </p>
                </div>
              </div>

              {/* DOCUMENT FOOTER SIGNATURE */}
              <div className="flex justify-between items-center pt-8 border-t border-slate-100 font-mono text-[9px] text-slate-400">
                <div>Dokumen ini dihasilkan secara otomatis oleh Sistem Admin PARUMSARI v2.0</div>
                <div>© Koperasi & Perangkat Desa Tegalsari 2026</div>
              </div>

            </div>

            {/* Print Footer / Sticky Trigger */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center no-print space-y-3">
              <p className="text-slate-600 text-xs font-semibold">
                Materi Presentasi Anda Siap Digunakan. Cetak sekarang atau simpan sebagai dokumen PDF untuk disebarkan melalui grup WhatsApp warga Desa Tegalsari!
              </p>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md transition duration-250 cursor-pointer inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Cetak Dokumen Sekarang (Simpan PDF)
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
