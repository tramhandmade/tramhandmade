import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ARTICLES } from '../../data/articles';
import { Article } from '../../types';

export const JournalPage: React.FC = () => {
  const { selectedArticle, setSelectedArticle } = useShop();
  const [activeArticle, setActiveArticle] = useState<Article | null>(selectedArticle);

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveArticle(null);
    setSelectedArticle(null);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If viewing a single article */}
        {activeArticle ? (
          <div className="space-y-8 animate-in fade-in duration-200">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] hover:text-[#6F3038] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Quay lại cẩm nang nến</span>
            </button>

            <header className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#5A4038]/60">
                <span className="font-semibold text-[#8B4A4F] uppercase">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {activeArticle.date}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {activeArticle.readTime}
                </span>
              </div>

              <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038] leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-sm sm:text-base text-[#5A4038]/80 leading-relaxed italic border-l-2 border-[#8B4A4F] pl-4 py-1">
                {activeArticle.summary}
              </p>
            </header>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#F7F0E8] border border-[#5A4038]/10 shadow-xs">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="max-w-3xl space-y-5 text-sm sm:text-base text-[#5A4038]/85 leading-relaxed pt-4">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Read next articles */}
            <div className="pt-12 mt-12 border-t border-[#5A4038]/10">
              <h3 className="font-serif-heading text-xl font-bold text-[#6F3038] mb-6">
                Các Bài Viết Khác
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ARTICLES.filter((a) => a.id !== activeArticle.id).slice(0, 2).map((other) => (
                  <div
                    key={other.id}
                    onClick={() => handleOpenArticle(other)}
                    className="p-4 rounded-xl bg-[#F7F0E8]/50 hover:bg-[#F7F0E8] border border-[#5A4038]/10 cursor-pointer transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-[#8B4A4F] uppercase">{other.category}</span>
                    <h4 className="font-serif-heading text-base font-bold text-[#5A4038] mt-1 line-clamp-2">
                      {other.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Articles Catalog List */
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest">
                <BookOpen size={14} />
                <span>Góc Thư Giãn</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
                Cẩm Nang Nến Thơm & Chữa Lành
              </h1>
              <p className="text-sm text-[#5A4038]/80">
                Những chia sẻ hữu ích từ xưởng nến Trạm Handmade giúp bạn thắp sáng những phút giây bình yên trọn vẹn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ARTICLES.map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleOpenArticle(art)}
                  className="group bg-[#FFFDF9] rounded-2xl border border-[#5A4038]/10 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#F7F0E8] overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#5A4038]/60">
                        <span className="font-semibold text-[#8B4A4F] uppercase">{art.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.date}</span>
                      </div>

                      <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#5A4038] group-hover:text-[#6F3038] transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#5A4038]/70 line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <span className="text-xs font-semibold text-[#6F3038] group-hover:text-[#8B4A4F] inline-flex items-center gap-1">
                      Đọc toàn bộ bài viết →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
