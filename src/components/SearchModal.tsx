import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    viewProductDetail,
    formatVND,
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.shortDescription.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.categoryName.toLowerCase().includes(normalizedQuery) ||
          p.scentNotes.top.toLowerCase().includes(normalizedQuery)
        );
      })
    : [];

  const handleSelectProduct = (product: typeof PRODUCTS[0]) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    viewProductDetail(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#5A4038]/10 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#5A4038]/10 bg-[#F7F0E8]/50">
          <Search size={22} className="text-[#6F3038] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm nến vỏ sò, nến gấu, sao biển, mùi hương..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[#5A4038] text-base placeholder-[#5A4038]/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#5A4038]/60 hover:text-[#5A4038] mr-2"
              title="Xóa tìm kiếm"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#5A4038] hover:text-[#6F3038] rounded-md transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Popular Keyword Suggestions */}
        {!searchQuery && (
          <div className="p-6">
            <p className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-wider mb-3">
              Gợi ý tìm kiếm phổ biến
            </p>
            <div className="flex flex-wrap gap-2">
              {['Vỏ sò', 'Sao biển', 'Nến gấu', 'Cá voi', 'Hoa sen', 'Quà tặng', 'Muối biển'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="py-1 px-3 bg-[#F7F0E8] hover:bg-[#E9D5D0] text-xs text-[#5A4038] rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {searchQuery && (
          <div className="max-h-96 overflow-y-auto p-4 divide-y divide-[#5A4038]/10">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="py-3 px-3 flex items-center justify-between hover:bg-[#F7F0E8] rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-[#F7F0E8] border border-[#5A4038]/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-[#5A4038] group-hover:text-[#6F3038] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#5A4038]/70 line-clamp-1">
                        {product.shortDescription}
                      </p>
                      <span className="text-xs font-semibold text-[#6F3038] tabular-nums mt-0.5 block">
                        {formatVND(product.price)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[#8B4A4F] opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-[#5A4038] text-base font-medium">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
                <p className="text-xs text-[#5A4038]/70 mt-1">
                  Hãy thử gõ từ khóa khác như "sò", "gấu", "sao biển", "biển", "hoa" bạn nhé!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
