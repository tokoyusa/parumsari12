import React from 'react';
import { motion } from 'motion/react';
import { Store, ClipboardList, User, Shield, Briefcase } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileBottomNavProps {
  activeTab: 'katalog' | 'tentang' | 'vendor' | 'admin' | 'profil' | 'pesanan' | 'transaksi-pesanan' | 'profil-tegalsari';
  setActiveTab: (tab: 'katalog' | 'tentang' | 'vendor' | 'admin' | 'profil' | 'pesanan' | 'transaksi-pesanan' | 'profil-tegalsari') => void;
  currentProfile: UserProfile | null;
  ordersCount: number;
  vendorOrdersCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentProfile,
  ordersCount,
  vendorOrdersCount = 0,
}) => {
  const tabs: Array<{
    id: 'katalog' | 'tentang' | 'vendor' | 'admin' | 'profil' | 'pesanan' | 'transaksi-pesanan' | 'profil-tegalsari';
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
  }> = [];

  if (!currentProfile) {
    // 3 tabs: Belanja Saya (left), Katalog (center), Masuk (right)
    tabs.push({ id: 'pesanan', label: 'Belanja Saya', icon: ClipboardList });
    tabs.push({ id: 'katalog', label: 'Katalog', icon: Store });
    tabs.push({ id: 'profil', label: 'Masuk', icon: User });
  } else {
    const isVendor = currentProfile.role === 'vendor';
    const isAdmin = currentProfile.role === 'admin';

    if (isVendor) {
      // 5 tabs: Symmetrical layout
      tabs.push({ id: 'transaksi-pesanan', label: 'Pesanan Masuk', icon: ClipboardList, badge: vendorOrdersCount });
      tabs.push({ id: 'pesanan', label: 'Belanja Saya', icon: ClipboardList, badge: ordersCount });
      tabs.push({ id: 'katalog', label: 'Katalog', icon: Store });
      tabs.push({ id: 'vendor', label: 'Toko Saya', icon: Briefcase });
      tabs.push({ id: 'profil', label: 'Profil', icon: User });
    } else if (isAdmin) {
      // 5 tabs: Symmetrical layout
      tabs.push({ id: 'transaksi-pesanan', label: 'Pesanan Masuk', icon: ClipboardList, badge: vendorOrdersCount });
      tabs.push({ id: 'pesanan', label: 'Belanja Saya', icon: ClipboardList, badge: ordersCount });
      tabs.push({ id: 'katalog', label: 'Katalog', icon: Store });
      tabs.push({ id: 'admin', label: 'Admin', icon: Shield });
      tabs.push({ id: 'profil', label: 'Profil', icon: User });
    } else {
      // Regular customer
      // 3 tabs: Belanja Saya (left), Katalog (center), Profil (right)
      tabs.push({ id: 'pesanan', label: 'Belanja Saya', icon: ClipboardList, badge: ordersCount });
      tabs.push({ id: 'katalog', label: 'Katalog', icon: Store });
      tabs.push({ id: 'profil', label: 'Profil', icon: User });
    }
  }

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-45">
      {/* 3D Soft Shadow Glow Underlay */}
      <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl -z-10 pointer-events-none" />

      {/* Main Bar */}
      <div className="relative bg-gradient-to-b from-zinc-900/95 to-black/98 border border-zinc-800/85 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] px-1 py-1.5 flex justify-around items-center h-14">
        
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.id === 'katalog') {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center justify-center flex-1 h-full focus:outline-none select-none tap-highlight-transparent cursor-pointer group py-1"
              >
                {/* Circular container design like previous version but lowered and perfectly aligned */}
                <div className="relative flex flex-col items-center justify-center -mt-1.5 z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border shadow-md ${
                      isActive
                        ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-400 text-white shadow-emerald-500/30 scale-105'
                        : 'bg-zinc-800/90 border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/80 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>

                  <span
                    className={`text-[8.5px] font-bold tracking-tight text-center mt-0.5 transition-all duration-200 ${
                      isActive ? 'text-emerald-400 font-extrabold' : 'text-zinc-500 group-hover:text-zinc-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full focus:outline-none select-none tap-highlight-transparent cursor-pointer group py-1"
            >
              {/* Active flat glow backdrop */}
              {isActive && (
                <motion.span
                  layoutId="mobileActiveBGGlow"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute inset-x-1 inset-y-0.5 bg-emerald-600/15 border border-emerald-500/15 rounded-xl"
                />
              )}

              {/* Inner Icon Content */}
              <div className="relative flex flex-col items-center justify-center space-y-0.5 z-10">
                <div
                  className={`transition-all duration-200 group-hover:scale-105 ${
                    isActive
                      ? 'text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.35)]'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  <IconComponent className="w-4.5 h-4.5 shrink-0" />
                </div>

                <span
                  className={`text-[8px] sm:text-[8.5px] font-bold tracking-tight text-center transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Dynamic Notification Badge */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-2.5 -right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(239,68,68,0.4)] animate-pulse border border-zinc-950">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
};
