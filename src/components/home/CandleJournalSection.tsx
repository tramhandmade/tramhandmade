import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ARTICLES } from '../../data/articles';

export const CandleJournalSection: React.FC = () => {
  const { setCurrentView, setSelectedArticle } = useShop();

  const handleArticleClick = (article: typeof ARTICLES[0]) => {
    setSelectedArticle(article);
    setCurrentView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllJournal = () => {
    setCurrentView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
              <BookOpen size={14} />
              <span>Góc Chia Sẻ Trạm Handmade</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
              Cẩm Nang Sử Dụng Nến Thơm
            </h2>
            <p className="text-sm text-[#5A4038]/80 mt-2 max-w-xl">
              Bí quyết chăm sóc và thắp nến an toàn, giúp ngọn nến của bạn luôn cháy đều mặt và tỏa hương trọn vẹn nhất.
            </p>
          </div>

          <button
            onClick={handleViewAllJournal}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F3038] hover:text-[#8B4A4F] transition-colors group uppercase tracking-wider"
          >
            <span>Đọc tất cả bài viết</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="group bg-[#F7F0E8]/40 border border-[#5A4038]/10 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-[#F7F0E8] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#5A4038]/60 mb-2">
                    <span className="font-medium text-[#8B4A4F]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif-heading text-lg font-bold text-[#5A4038] group-hover:text-[#6F3038] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#5A4038]/70 mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6F3038] group-hover:text-[#8B4A4F]">
                  <span>Đọc tiếp</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
