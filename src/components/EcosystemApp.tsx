import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Home, 
  Newspaper, 
  Briefcase, 
  ShoppingBag, 
  Store, 
  User, 
  Search, 
  Bell, 
  ArrowLeft,
  Sparkles,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
  Plus,
  Filter,
  Camera,
  MessageCircle,
  ShieldCheck,
  Bot,
  Wallet,
  Share2,
  X
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

type Tab = 'home' | 'news' | 'jobs' | 'market' | 'shop' | 'profile';

export const EcosystemApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const navItems = [
    { id: 'home', icon: Home, label: t.ecosystem.nav.home },
    { id: 'news', icon: Newspaper, label: t.ecosystem.nav.news },
    { id: 'jobs', icon: Briefcase, label: t.ecosystem.nav.jobs },
    { id: 'market', icon: ShoppingBag, label: t.ecosystem.nav.market },
    { id: 'shop', icon: Store, label: t.ecosystem.nav.shop },
    { id: 'profile', icon: User, label: t.ecosystem.nav.profile },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white flex justify-center font-sans">
      {/* Main Container */}
      <div className="w-full max-w-7xl flex h-full">
        
        {/* Left Sidebar - Navigation (Desktop) */}
        <div className="hidden md:flex flex-col w-64 border-r border-x-border p-4 shrink-0">
          <div className="mb-8 px-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-xl">X²</span>
            </div>
          </div>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${
                  activeTab === item.id 
                    ? 'text-white font-bold bg-white/10' 
                    : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'text-x-blue' : ''}`} />
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </nav>
          <button 
            onClick={onBack}
            className="mt-auto flex items-center gap-4 px-4 py-3 rounded-full text-zinc-400 hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
            <span className="text-lg">退出</span>
          </button>
        </div>

        {/* Center Content - Feed */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-x-border">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-x-border px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="md:hidden">
                <X className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">
                {navItems.find(i => i.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Search className="w-5 h-5 text-zinc-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Filter className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-6"
                >
                  {activeTab === 'home' && <HomeView />}
                  {activeTab === 'news' && <NewsView />}
                  {activeTab === 'jobs' && <JobsView />}
                  {activeTab === 'market' && <MarketView />}
                  {activeTab === 'shop' && <ShopView />}
                  {activeTab === 'profile' && <ProfileView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center justify-around py-3 bg-black border-t border-x-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`p-2 rounded-full transition-colors ${
                  activeTab === item.id ? 'text-x-blue' : 'text-zinc-500'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </nav>
        </div>

        {/* Right Sidebar - Widgets (Desktop Only) */}
        <div className="hidden lg:flex flex-col w-80 p-6 space-y-6 shrink-0">
          <div className="bg-zinc-900 rounded-2xl p-4 border border-x-border">
            <h3 className="font-bold text-xl mb-4">今日热门</h3>
            <div className="space-y-4">
              {[
                { tag: '墨西哥新政', count: '1.2k' },
                { tag: '印尼物流', count: '856' },
                { tag: '华商年会', count: '2.4k' }
              ].map((trend, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-xs text-zinc-500">正在热议</div>
                  <div className="font-bold group-hover:underline">#{trend.tag}</div>
                  <div className="text-xs text-zinc-500">{trend.count} 讨论</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl p-4 border border-x-border">
            <h3 className="font-bold text-xl mb-4">推荐关注</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800" />
                    <div>
                      <div className="font-bold text-sm">华商总会</div>
                      <div className="text-xs text-zinc-500">@huashang_global</div>
                    </div>
                  </div>
                  <button className="x-button-primary text-xs">关注</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-cyan-400' : 'text-zinc-500'}`}
  >
    <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-cyan-500/10' : 'bg-transparent'}`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const HomeView = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      {/* AI Greeting */}
      <div className="glass p-6 rounded-3xl border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t.ecosystem.app.dailyInsights}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t.ecosystem.app.greeting}</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t.ecosystem.app.briefing}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl border-white/5">
          <div className="text-zinc-500 text-[10px] font-bold uppercase mb-1">{t.ecosystem.app.newInsights}</div>
          <div className="text-xl font-bold flex items-center gap-2">
            128 <span className="text-xs text-emerald-400 font-normal">+12%</span>
          </div>
        </div>
        <div className="glass p-4 rounded-2xl border-white/5">
          <div className="text-zinc-500 text-[10px] font-bold uppercase mb-1">{t.ecosystem.app.activeJobs}</div>
          <div className="text-xl font-bold flex items-center gap-2">
            2.4k <span className="text-xs text-emerald-400 font-normal">+5%</span>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{t.ecosystem.app.recommended}</h3>
          <button className="text-xs text-cyan-400 font-bold uppercase tracking-widest">{t.common.viewAll}</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <AppCard icon={Newspaper} title={t.ecosystem.sections.news.title} desc={t.ecosystem.sections.news.desc} badge={t.ecosystem.sections.news.badge} color="cyan" />
          <AppCard icon={Briefcase} title={t.ecosystem.sections.jobs.title} desc={t.ecosystem.sections.jobs.desc} badge={t.ecosystem.sections.jobs.badge} color="blue" />
          <AppCard icon={ShoppingBag} title={t.ecosystem.sections.market.title} desc={t.ecosystem.sections.market.desc} badge={t.ecosystem.sections.market.badge} color="purple" />
          <AppCard icon={Store} title={t.ecosystem.sections.shop.title} desc={t.ecosystem.sections.shop.desc} badge={t.ecosystem.sections.shop.badge} color="emerald" />
        </div>
      </div>
    </div>
  );
};

const AppCard = ({ icon: Icon, title, desc, badge, color }: any) => (
  <div className="glass p-5 rounded-2xl border-white/5 flex gap-4 items-center group cursor-pointer hover:border-white/10 transition-all">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 flex items-center justify-center shrink-0`}>
      <Icon className={`w-7 h-7 text-${color}-400`} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-bold">{title}</h4>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
          {badge}
        </span>
      </div>
      <p className="text-xs text-zinc-500 line-clamp-1">{desc}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
  </div>
);

const NewsView = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState(t.ecosystem.newsItems.map((item: any, i: number) => ({
    id: i + 1,
    ...item,
    image: '',
    loading: false
  })));

  useEffect(() => {
    const generateImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const updatedArticles = [...articles];
      
      for (let i = 0; i < updatedArticles.length; i++) {
        const article = updatedArticles[i];
        if (article.image) continue;

        try {
          setArticles(prev => prev.map(a => a.id === article.id ? { ...a, loading: true } : a));
          
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [
                {
                  text: `Generate a professional, high-quality news illustration for a news article with the following headline: "${article.title}" and description: "${article.desc}". The style should be modern, clean, and business-oriented.`,
                },
              ],
            },
          });

          let imageUrl = '';
          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              imageUrl = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }

          if (imageUrl) {
            setArticles(prev => prev.map(a => a.id === article.id ? { ...a, image: imageUrl, loading: false } : a));
          } else {
            setArticles(prev => prev.map(a => a.id === article.id ? { ...a, loading: false, image: `https://picsum.photos/seed/news${article.id}/200/200` } : a));
          }
        } catch (error) {
          console.error('Error generating image:', error);
          setArticles(prev => prev.map(a => a.id === article.id ? { ...a, loading: false, image: `https://picsum.photos/seed/news${article.id}/200/200` } : a));
        }
      }
    };

    generateImages();
  }, []);

  return (
    <div className="space-y-0 -mx-4 sm:-mx-6">
      {/* AI Summary Card - X Style */}
      <div className="p-4 border-b border-x-border bg-x-blue/5">
        <div className="flex items-center gap-2 text-x-blue mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">{t.ecosystem.app.newsSummary}</span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          {t.ecosystem.app.newsSummaryText}
        </p>
      </div>

      <div className="divide-y divide-x-border">
        {articles.map(article => (
          <div key={article.id} className="p-4 hover:bg-white/[0.03] transition-colors cursor-pointer space-y-3">
            <div className="flex gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-x-blue">{article.tag}</span>
                  <span className="text-xs text-zinc-500">· {article.time}</span>
                </div>
                <h3 className="font-bold text-lg leading-snug">{article.title}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2">{article.desc}</p>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-zinc-900 overflow-hidden shrink-0 relative border border-x-border">
                {article.loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-5 h-5 border-2 border-x-blue border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <img 
                    src={article.image || `https://picsum.photos/seed/news${article.id}/200/200`} 
                    alt="news" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-zinc-500 hover:text-x-blue transition-colors group">
                  <div className="p-2 group-hover:bg-x-blue/10 rounded-full">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs">48</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors group">
                  <div className="p-2 group-hover:bg-emerald-500/10 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs">2.4k</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-x-blue transition-colors group">
                  <div className="p-2 group-hover:bg-x-blue/10 rounded-full">
                    <Share2 className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.ecosystem.app.jobsTitle}</h2>
        <button className="x-button-blue text-sm">{t.ecosystem.app.postJob}</button>
      </div>

      <div className="bg-zinc-900 rounded-full px-4 py-3 border border-x-border flex items-center gap-3">
        <Search className="w-5 h-5 text-zinc-500" />
        <input type="text" placeholder={t.ecosystem.app.searchPlaceholder} className="bg-transparent border-none outline-none text-sm flex-1" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'all', label: t.ecosystem.app.jobTags.all },
          { id: 'tech', label: t.ecosystem.app.jobTags.tech },
          { id: 'mgmt', label: t.ecosystem.app.jobTags.mgmt },
          { id: 'sales', label: t.ecosystem.app.jobTags.sales },
          { id: 'logistics', label: t.ecosystem.app.jobTags.logistics },
          { id: 'manufacturing', label: t.ecosystem.app.jobTags.manufacturing }
        ].map(tag => (
          <button key={tag.id} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${tag.id === 'all' ? 'bg-white text-black' : 'border border-x-border text-zinc-400 hover:bg-white/5'}`}>
            {tag.label}
          </button>
        ))}
      </div>

      <div className="space-y-0 -mx-4 sm:-mx-6 divide-y divide-x-border">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 hover:bg-white/[0.03] transition-colors cursor-pointer space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden border border-x-border">
                  <img src={`https://picsum.photos/seed/company${i}/100/100`} alt="logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t.ecosystem.app.jobTitle}</h3>
                  <p className="text-sm text-zinc-500">{t.ecosystem.app.jobCompany}</p>
                </div>
              </div>
              <div className="text-x-blue font-bold">$3k - $5k</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.ecosystem.app.jobRequirements.map((tag: string) => (
                <span key={tag} className="px-2 py-1 rounded-md border border-x-border text-[10px] text-zinc-400">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-6 h-6 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${j+i}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-zinc-500">12 {t.ecosystem.app.appliedFriends}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3 h-3" /> {t.ecosystem.app.aiMatch} 95%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.ecosystem.app.marketTitle}</h2>
        <button className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass rounded-2xl border-white/5 overflow-hidden group">
            <div className="aspect-square bg-white/5 relative">
              <img src={`https://picsum.photos/seed/item${i}/400/400`} alt="item" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button className="absolute top-2 right-2 w-8 h-8 rounded-full glass flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-bold text-sm line-clamp-1">2023 款 MacBook Pro M2</h3>
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold">$1,200</span>
                <span className="text-[10px] text-zinc-500">9成新</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                <MapPin className="w-3 h-3" /> {t.ecosystem.app.locationDist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShopView = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-white mx-auto flex items-center justify-center shadow-xl shadow-white/10">
          <Store className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-3xl font-black">{t.ecosystem.app.shopTitle}</h2>
        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
          {t.ecosystem.app.shopDesc}
        </p>
      </div>

      <div className="space-y-4">
        <div className="x-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-x-border flex items-center justify-center">
              <Camera className="w-6 h-6 text-x-blue" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{t.ecosystem.app.shopStep1}</h4>
              <p className="text-xs text-zinc-500">{t.ecosystem.app.shopStep1Desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-x-border flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{t.ecosystem.app.shopStep2}</h4>
              <p className="text-xs text-zinc-500">{t.ecosystem.app.shopStep2Desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-x-border flex items-center justify-center">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{t.ecosystem.app.shopStep3}</h4>
              <p className="text-xs text-zinc-500">{t.ecosystem.app.shopStep3Desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </div>
        </div>

        <button className="x-button-blue w-full py-5 text-lg font-black">
          {t.ecosystem.app.startShop}
        </button>
      </div>
    </div>
  );
};

const ProfileView = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-zinc-800 border-2 border-cyan-500/30 overflow-hidden">
          <img src="https://i.pravatar.cc/200?u=x2user" alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t.ecosystem.app.profileName}</h2>
          <p className="text-sm text-zinc-500">ID: X2-88886666</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" /> {t.ecosystem.app.verifiedMerchant}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold">12</div>
          <div className="text-[10px] text-zinc-500 uppercase font-bold">我的发布</div>
        </div>
        <div className="text-center border-x border-white/5">
          <div className="text-xl font-bold">458</div>
          <div className="text-[10px] text-zinc-500 uppercase font-bold">收藏</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">2.1k</div>
          <div className="text-[10px] text-zinc-500 uppercase font-bold">积分</div>
        </div>
      </div>

      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        {[
          { icon: Wallet, label: t.ecosystem.app.profileMenu.wallet, value: '$1,240.00' },
          { icon: Store, label: t.ecosystem.app.profileMenu.shop, value: t.ecosystem.app.profileMenu.statusRunning },
          { icon: Briefcase, label: t.ecosystem.app.profileMenu.jobs, value: `3 ${t.ecosystem.app.profileMenu.statusInterviews}` },
          { icon: ShieldCheck, label: t.ecosystem.app.profileMenu.security, value: t.ecosystem.app.profileMenu.statusProtected },
        ].map((item, i) => (
          <div key={i} className={`p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${i !== 3 ? 'border-b border-white/5' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-zinc-400" />
              </div>
              <span className="font-bold text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">{item.value}</span>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
