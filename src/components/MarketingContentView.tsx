import React from 'react';
import { AppSetting } from '../types';
import { Award, FileText, Check, Zap, Users, ExternalLink, ChevronRight, MessageSquare } from 'lucide-react';

interface MarketingContentViewProps {
  appSettings: AppSetting;
  type: 'nib' | 'pirt' | 'halal' | 'pelatihan' | 'whatsapp';
}

// Zero-dependency pure React Markdown parser for formatting rich descriptions safely
export function renderMarkdown(text: string) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} className="h-2" />;

    // Headers
    if (cleanLine.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-sm font-bold text-slate-800 mt-5 mb-2 first:mt-0 font-display">
          {parseInline(cleanLine.substring(4))}
        </h3>
      );
    }
    if (cleanLine.startsWith('#### ')) {
      return (
        <h4 key={idx} className="text-xs font-bold text-emerald-900 mt-4 mb-1.5 uppercase tracking-wide font-mono">
          {parseInline(cleanLine.substring(5))}
        </h4>
      );
    }

    // List items (unordered)
    if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
      return (
        <li key={idx} className="ml-4 list-disc text-slate-650 mb-1.5 leading-relaxed text-xs">
          {parseInline(cleanLine.substring(2))}
        </li>
      );
    }

    // List items (ordered)
    const matchOrdered = cleanLine.match(/^(\d+)\.\s+(.*)/);
    if (matchOrdered) {
      return (
        <li key={idx} className="ml-4 list-decimal text-slate-650 mb-1.5 leading-relaxed text-xs">
          {parseInline(matchOrdered[2])}
        </li>
      );
    }

    return (
      <p key={idx} className="text-slate-650 mb-2 leading-relaxed text-xs">
        {parseInline(cleanLine)}
      </p>
    );
  });
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    const boldIndex = currentText.indexOf('**');
    const linkIndex = currentText.indexOf('[');

    if (boldIndex === -1 && linkIndex === -1) {
      parts.push(<span key={key++}>{currentText}</span>);
      break;
    }

    if (boldIndex !== -1 && (linkIndex === -1 || boldIndex < linkIndex)) {
      if (boldIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, boldIndex)}</span>);
      }
      const nextBold = currentText.indexOf('**', boldIndex + 2);
      if (nextBold !== -1) {
        const boldText = currentText.substring(boldIndex + 2, nextBold);
        parts.push(<strong key={key++} className="font-bold text-slate-900">{boldText}</strong>);
        currentText = currentText.substring(nextBold + 2);
      } else {
        parts.push(<span key={key++}>**</span>);
        currentText = currentText.substring(boldIndex + 2);
      }
    } else {
      if (linkIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, linkIndex)}</span>);
      }
      const endLabelIndex = currentText.indexOf(']', linkIndex);
      if (endLabelIndex !== -1 && currentText[endLabelIndex + 1] === '(') {
        const endUrlIndex = currentText.indexOf(')', endLabelIndex + 2);
        if (endUrlIndex !== -1) {
          const label = currentText.substring(linkIndex + 1, endLabelIndex);
          const url = currentText.substring(endLabelIndex + 2, endUrlIndex);
          parts.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-bold hover:underline flex-inline items-center gap-0.5"
            >
              {label} <ExternalLink className="w-3 h-3 inline-block" />
            </a>
          );
          currentText = currentText.substring(endUrlIndex + 1);
          continue;
        }
      }
      parts.push(<span key={key++}>[</span>);
      currentText = currentText.substring(linkIndex + 1);
    }
  }

  return parts;
}

export default function MarketingContentView({ appSettings, type }: MarketingContentViewProps) {
  // Extract content based on selected sub-tab
  let title = '';
  let category = '';
  let content = '';
  let imageUrl = '';
  let Icon = Award;
  let actionBtn: { label: string; url: string; secondary?: boolean } | null = null;

  if (type === 'nib') {
    title = 'Nomor Induk Berusaha (NIB)';
    category = 'Perijinan Berusaha';
    content = appSettings.marketing_nib_content || '';
    imageUrl = appSettings.marketing_nib_image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600';
    Icon = Award;
    actionBtn = {
      label: 'Daftar Mandiri via OSS Indonesia',
      url: 'https://oss.go.id'
    };
  } else if (type === 'pirt') {
    title = 'Sertifikat Pangan Industri Rumah Tangga (PIRT)';
    category = 'Perijinan Berusaha';
    content = appSettings.marketing_pirt_content || '';
    imageUrl = appSettings.marketing_pirt_image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600';
    Icon = FileText;
    actionBtn = {
      label: 'Panduan Pendaftaran SPP-PIRT',
      url: 'https://sppirt.pom.go.id'
    };
  } else if (type === 'halal') {
    title = 'Sertifikasi Halal Indonesia';
    category = 'Perijinan Berusaha';
    content = appSettings.marketing_halal_content || '';
    imageUrl = appSettings.marketing_halal_image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600';
    Icon = Check;
    actionBtn = {
      label: 'Daftar Sertifikasi Halal Gratis (SEHATI)',
      url: 'https://ptsp.halal.go.id'
    };
  } else if (type === 'pelatihan') {
    title = 'Informasi Pelatihan UMKM Desa';
    category = 'Kapasitas & Pembelajaran';
    content = appSettings.marketing_pelatihan_content || '';
    imageUrl = appSettings.marketing_pelatihan_image || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600';
    Icon = Zap;
  } else if (type === 'whatsapp') {
    title = 'Grup WhatsApp Paguyuban UMKM';
    category = 'Media Komunikasi Warga';
    content = appSettings.marketing_whatsapp_content || '';
    imageUrl = appSettings.marketing_whatsapp_image || 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=600';
    Icon = Users;
    actionBtn = {
      label: 'Gabung Grup WhatsApp Paguyuban',
      url: 'https://chat.whatsapp.com/ExampleGroupTegalsari'
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6" id={`marketing-view-${type}`}>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-[10.5px] font-mono text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 w-fit">
        <span>Marketing Tool</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span>{category}</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-emerald-600 font-extrabold">{title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left column: Visual elements & action buttons */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            {imageUrl && (
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-950 px-2.5 py-1 rounded-lg text-[9.5px] font-bold font-mono tracking-wide uppercase shadow-xs flex items-center gap-1 border border-emerald-100/50">
                  <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {category}
                </div>
              </div>
            )}
            <div className="p-4 space-y-3.5">
              <h1 className="text-sm font-extrabold text-slate-900 leading-snug">{title}</h1>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Diperbarui langsung oleh Admin Desa Tegalsari untuk memberikan kemudahan pelayanan perijinan dan pengembangan daya saing UMKM lokal.
              </p>

              {actionBtn && (
                <a
                  href={actionBtn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs text-xs"
                >
                  {type === 'whatsapp' ? <MessageSquare className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  {actionBtn.label}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Content reader */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 shadow-xs min-h-[300px] space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-extrabold uppercase text-slate-400 font-mono tracking-wider flex items-center gap-1.5">
              📌 Informasi & Tata Cara Resmi
            </h2>
          </div>
          <div className="prose prose-slate max-w-none">
            {content ? renderMarkdown(content) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Icon className="w-8 h-8 mx-auto text-slate-300 animate-pulse" />
                <p className="text-xs">Konten belum diisi oleh administrator desa.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
