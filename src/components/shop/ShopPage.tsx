import React, { useState, useMemo } from 'react';
import { Filter, Star, Heart, ShoppingBag, ArrowUpDown, Search, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { Product } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    viewProductDetail,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatVND,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-100' | '100-150' | 'over-150'>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Helper to match category groups
  const isMatchCategory = (prodCat: string, targetCat: string) => {
    if (targetCat === 'all') return true;
    if (targetCat === 'seashell') {
      return prodCat === 'seashell' || prodCat === 'starfish' || prodCat === 'mermaid' || prodCat === 'jar';
    }
    if (targetCat === 'sculpture') {
      return prodCat === 'sculpture' || prodCat === 'flower' || prodCat === 'animal';
    }
    if (targetCat === 'gift') {
      return prodCat === 'gift';
    }
    if (targetCat === 'gift-set') {
      return prodCat === 'gift-set';
    }
    if (targetCat === 'holiday-set') {
      return prodCat === 'holiday-set';
    }
    if (targetCat === 'tray-accessories') {
      return prodCat === 'tray-accessories' || prodCat === 'tray';
    }
    if (targetCat === 'custom') {
      return prodCat === 'custom';
    }
    return prodCat === targetCat;
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (!isMatchCategory(product.category, selectedCategory)) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under-100' && product.price >= 100000) return false;
      if (priceFilter === '100-150' && (product.price < 100000 || product.price > 150000)) return false;
      if (priceFilter === 'over-150' && product.price <= 150000) return false;

      // Local search term
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesScent = product.scentNotes.top.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesScent) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, priceFilter, localSearch, sortOption]);

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
            Cửa Hàng Trực Tuyến
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
            Tất Cả Sản Phẩm Nến Thơm
          </h1>
          <p className="text-sm text-[#5A4038]/80 mt-2">
            Được đúc thủ công từ 100% sáp thực vật tự nhiên, an toàn và mang lại không gian thư giãn an yên cho tâm hồn bạn.
          </p>
        </div>

        {/* Top Controls: Search, Filter toggle, Sorting */}
        <div className="bg-[#F7F0E8]/50 p-4 rounded-2xl border border-[#5A4038]/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick inline search */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-3 text-[#5A4038]/60" />
            <input
              type="text"
              placeholder="Tìm theo tên nến, mùi hương..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#FFFDF9] border border-[#5A4038]/15 rounded-lg py-2 pl-9 pr-3 text-xs text-[#5A4038] placeholder-[#5A4038]/50 focus:outline-none focus:border-[#6F3038]"
            />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden py-2 px-3 bg-[#FFFDF9] border border-[#5A4038]/15 rounded-lg text-xs font-medium text-[#5A4038] flex items-center gap-1.5"
            >
              <Filter size={14} />
              <span>Bộ lọc</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown size={14} className="text-[#8B4A4F]" />
              <span className="text-[#5A4038]/70 hidden sm:inline">Sắp xếp:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-[#FFFDF9] border border-[#5A4038]/15 rounded-lg py-2 px-3 text-xs text-[#5A4038] focus:outline-none focus:border-[#6F3038] cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            <span className="text-xs text-[#5A4038]/70 tabular-nums">
              {filteredProducts.length} sản phẩm
            </span>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <aside className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} md:col-span-1 space-y-6`}>
            
            {/* Category Filter */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#5A4038]/10 space-y-3">
              <h3 className="font-serif-heading text-base font-bold text-[#6F3038] pb-2 border-b border-[#5A4038]/10">
                Danh Mục Sản Phẩm
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count = cat.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-left py-2 px-2.5 rounded-lg text-xs transition-colors ${
                        isSelected
                          ? 'bg-[#E9D5D0] text-[#6F3038] font-bold'
                          : 'text-[#5A4038] hover:bg-[#F7F0E8]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] opacity-60 tabular-nums">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#5A4038]/10 space-y-3">
              <h3 className="font-serif-heading text-base font-bold text-[#6F3038] pb-2 border-b border-[#5A4038]/10">
                Khoảng Giá
              </h3>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'Tất cả mức giá' },
                  { id: 'under-100', label: 'Dưới 100.000đ' },
                  { id: '100-150', label: 'Từ 100.000đ – 150.000đ' },
                  { id: 'over-150', label: 'Trên 150.000đ' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 py-1.5 px-1 cursor-pointer text-[#5A4038] hover:text-[#6F3038]"
                  >
                    <input
                      type="radio"
                      name="priceFilter"
                      checked={priceFilter === item.id}
                      onChange={() => setPriceFilter(item.id as any)}
                      className="accent-[#6F3038]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Workshop Banner */}
            <div className="p-5 rounded-2xl bg-[#6F3038] text-[#FFFDF9] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#E9D5D0]">
                <Sparkles size={14} />
                <span>Nến độc bản</span>
              </div>
              <h4 className="font-serif-heading text-base font-bold">
                Tự Phối Nến Theo Ý?
              </h4>
              <p className="text-xs text-[#FFFDF9]/80 leading-relaxed">
                Tự do chọn khuôn vỏ sò, màu sáp biển và khắc tên tặng người thương.
              </p>
            </div>

          </aside>

          {/* Product Grid (Min 12-15 items) */}
          <main className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F7F0E8]/30 rounded-2xl border border-[#5A4038]/10 p-8">
                <p className="text-base font-medium text-[#5A4038]">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
                </p>
                <p className="text-xs text-[#5A4038]/70 mt-2 mb-6">
                  Bạn vui lòng thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceFilter('all');
                    setLocalSearch('');
                  }}
                  className="py-2 px-5 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold rounded-lg hover:bg-[#5A4038] transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isFav = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] bg-[#F7F0E8] overflow-hidden cursor-pointer">
                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => viewProductDetail(product)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[#6F3038] text-[#FFFDF9] text-[10px] font-semibold tracking-wider uppercase py-0.5 px-2.5 rounded-sm">
                            {product.badge}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                            isFav
                              ? 'bg-[#FFFDF9] text-[#8B4A4F]'
                              : 'bg-[#FFFDF9]/80 backdrop-blur-xs text-[#5A4038] hover:bg-[#FFFDF9] hover:text-[#8B4A4F]'
                          }`}
                          aria-label="Thêm vào yêu thích"
                        >
                          <Heart size={16} className={isFav ? 'fill-[#8B4A4F]' : ''} />
                        </button>
                      </div>

                      {/* Info & Purchase */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#5A4038]/60 mb-1">
                            <span>{product.categoryName}</span>
                            <div className="flex items-center gap-1 text-[#8B4A4F]">
                              <Star size={13} className="fill-[#8B4A4F]" />
                              <span className="font-medium text-[#5A4038] tabular-nums">{product.rating}</span>
                              <span>({product.reviewCount})</span>
                            </div>
                          </div>

                          <h3
                            onClick={() => viewProductDetail(product)}
                            className="font-serif-heading text-base font-bold text-[#5A4038] group-hover:text-[#6F3038] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-[#5A4038]/70 mt-1 line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#5A4038]/10 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-[#6F3038] tabular-nums">
                              {formatVND(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-[#5A4038]/50 line-through tabular-nums ml-2">
                                {formatVND(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="py-1.5 px-3 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none"
                            title="Thêm vào giỏ"
                          >
                            <ShoppingBag size={14} />
                            <span>Thêm giỏ</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
