import React from 'react';
import { AppSetting } from '../types';
import { BookOpen, FileText, Download, MapPin, Phone, Mail, Building, Image as ImageIcon, Sparkles } from 'lucide-react';

interface TegalsariProfileViewProps {
  appSettings: AppSetting | null;
}

export const TegalsariProfileView: React.FC<TegalsariProfileViewProps> = ({ appSettings }) => {
  const profile = appSettings?.tegalsari_profile || {
    title: 'Profil Desa Tegalsari',
    subtitle: 'Kecamatan Tegalsari, Kabupaten Banyuwangi, Jawa Timur',
    hero_image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    description: 'Selamat datang di halaman resmi Profil Desa Tegalsari. Desa Tegalsari terletak di wilayah Kecamatan Tegalsari, Kabupaten Banyuwangi. Desa ini terkenal dengan sejarah religi, persawahan yang subur, serta semangat gotong royong warganya yang tinggi dalam mendukung kemajuan ekonomi desa melalui UMKM mandiri.',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    pdf_title: 'Unduh Dokumen Regulasi & Profil Desa Tegalsari (PDF)',
    address: 'Kantor Kepala Desa Tegalsari, Jl. Raya Tegalsari No.1, Banyuwangi, Jawa Timur',
    phone: '6281234567890',
    email: 'desa@tegalsari.id',
    sections: [
      {
        id: 'sec_1',
        title: 'Visi & Misi Desa',
        content: 'Mewujudkan Desa Tegalsari yang mandiri, sejahtera, agraris, dan religius melalui sinergi pemerintahan desa, pemberdayaan ekonomi mikro (UMKM), serta pelestarian warisan budaya lokal.',
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'sec_2',
        title: 'Potensi Ekonomi & UMKM',
        content: 'Tegalsari memiliki keunggulan luar biasa di bidang pertanian pangan, industri olahan makanan ringan, kerajinan bambu, hingga produk jamu tradisional. Melalui platform digital ini, kami menghubungkan langsung karya-karya terbaik tetangga ke seluruh masyarakat.',
        image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=500'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500'
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-fade-in" id="tegalsari-profile-container">
      
      {/* 1. Hero banner section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[280px] sm:h-[380px] lg:h-[420px]" id="profile-hero">
        <img
          src={profile.hero_image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200'}
          alt={profile.title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] transition-transform duration-700 hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-6 sm:p-10 md:p-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider w-fit">
            <Building className="w-3.5 h-3.5" />
            Profil Resmi Wilayah
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
            {profile.title}
          </h1>
          <p className="text-xs sm:text-base text-zinc-300 font-medium max-w-2xl leading-relaxed">
            {profile.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Main welcome/description section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-xl relative overflow-hidden" id="profile-welcome">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-emerald-600 rounded-full" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">Sambutan Hangat</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line">
            {profile.description}
          </p>
        </div>
      </div>

      {/* 3. PDF / Document Download segment */}
      {profile.pdf_url && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden" id="profile-document">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          <div className="space-y-2 max-w-lg z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase text-emerald-300">
              <FileText className="w-3.5 h-3.5" />
              Dokumen Resmi
            </div>
            <h3 className="text-lg font-bold tracking-tight">
              {profile.pdf_title || 'Unduh Dokumen Regulasi / Profil Desa'}
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Dapatkan berkas lengkap mengenai regulasi, tata ruang desa, rencana kerja, atau laporan tahunan dalam berkas digital PDF resmi.
            </p>
          </div>
          <a
            href={profile.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 font-black rounded-2xl text-xs sm:text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 z-10 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            Unduh Berkas PDF
          </a>
        </div>
      )}

      {/* 4. Structured sections (Visi, Misi, Ekonomi, etc.) */}
      {profile.sections && profile.sections.length > 0 && (
        <div className="space-y-6" id="profile-sections">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-800 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Fokus Utama & Potensi Wilayah
            </h2>
            <div className="h-px bg-slate-100 flex-1 ml-4 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.sections.map((section, idx) => (
              <div
                key={section.id || idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col h-full transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {section.image_url && (
                  <div className="h-44 sm:h-52 overflow-hidden relative">
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Sektor {idx + 1}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Image gallery layout */}
      {profile.gallery && profile.gallery.length > 0 && (
        <div className="space-y-4" id="profile-gallery">
          <h2 className="text-xl font-extrabold text-slate-800 font-display flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Galeri Foto Tegalsari
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.gallery.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-md aspect-video md:aspect-square bg-slate-100"
              >
                <img
                  src={img}
                  alt={`Galeri Tegalsari ${i + 1}`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[10px] font-semibold text-white tracking-wide">Desa Tegalsari {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Contact and interactive directory metadata footer card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden" id="profile-contact-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-display">
              <Building className="w-5 h-5 text-emerald-400" />
              Sekretariat & Hubungan Publik
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              Kami terbuka untuk kolaborasi bisnis, kunjungan studi banding, kemitraan instansi, dan berbagai masukan yang membangun demi kemandirian ekonomi pedesaan di wilayah Tegalsari.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl w-fit text-xs text-emerald-300 font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Kec. Tegalsari, Banyuwangi
              </div>
            </div>
          </div>

          <div className="md:col-span-6 space-y-4 border-t border-zinc-800 pt-6 md:border-t-0 md:pt-0 md:pl-6 md:border-l md:border-zinc-800">
            <div className="space-y-3">
              
              {profile.address && (
                <div className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Alamat Kantor</span>
                    <span className="text-xs text-zinc-300 leading-relaxed font-medium">{profile.address}</span>
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className="flex gap-3 items-start">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Nomor Telepon / WhatsApp</span>
                    <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline leading-relaxed font-medium">
                      +{profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className="flex gap-3 items-start">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Surat Elektronik (Email)</span>
                    <a href={`mailto:${profile.email}`} className="text-xs text-emerald-400 hover:underline leading-relaxed font-medium">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
