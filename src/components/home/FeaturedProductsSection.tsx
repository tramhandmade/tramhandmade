import React from 'react';
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const FeaturedProductsSection: React.FC = () => {
  const {
    viewProductDetail,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatVND,
    setCurrentView,
    setSelectedCategory,
  } = useShop();

  const featuredItems = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  const handleSeeAll = () => {
    setSelectedCategory('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-18 bg-[#FFFDF9] border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
              Tuyển Chọn Đặc Biệt
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
              Sản Phẩm Nổi Bật Tại Trạm
            </h2>
            <p className="text-sm text-[#5A4038]/80 mt-2 max-w-xl">
              Những chiếc nến thủ công được yêu thích nhất với kiểu dáng vỏ sò, sao biển và hương thơm dịu lành xua tan căng thẳng.
            </p>
          </div>

          <button
            onClick={handleSeeAll}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F3038] hover:text-[#8B4A4F] transition-colors group uppercase tracking-wider"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredItems.map((product) => {
            const isFav = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-[#F7F0E8] overflow-hidden cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => viewProductDetail(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#6F3038] text-[#FFFDF9] text-[10px] font-semibold tracking-wider uppercase py-0.5 px-2.5 rounded-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
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

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#5A4038]/60 mb-1">
                      <span>{product.categoryName}</span>
                      <div className="flex items-center gap-1 text-[#8B4A4F]">
                        <Star size={13} className="fill-[#8B4A4F]" />
                        <span className="font-medium text-[#5A4038] tabular-nums">{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => viewProductDetail(product)}
                      className="font-serif-heading text-base font-bold text-[#5A4038] group-hover:text-[#6F3038] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#5A4038]/70 mt-1 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-4 pt-3 border-t border-[#5A4038]/10 flex items-center justify-between">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-[#6F3038] tabular-nums">
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
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Thêm giỏ</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
