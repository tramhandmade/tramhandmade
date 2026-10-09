import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatVND,
    viewProductDetail,
    setIsCartOpen,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'scent' | 'guide'>('desc');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback to first product if none selected
  const product: Product = selectedProduct || PRODUCTS[0];
  const isFav = isWishlisted(product.id);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] hover:text-[#6F3038] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Quay lại cửa hàng</span>
          </button>
        </div>

        {/* Product Purchase Module (2-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#5A4038]/10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured View */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F0E8] border border-[#5A4038]/10 shadow-sm relative">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#6F3038] text-[#FFFDF9] text-xs font-bold tracking-wider uppercase py-1 px-3 rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#6F3038] shadow-xs'
                        : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3 bg-[#F7F0E8]/50 rounded-xl text-center border border-[#5A4038]/10">
                <Truck size={18} className="mx-auto text-[#8B4A4F] mb-1" />
                <p className="text-[11px] font-semibold text-[#5A4038]">Giao Hàng An Toàn</p>
                <p className="text-[10px] text-[#5A4038]/70">Bọc chống sốc 3 lớp</p>
              </div>
              <div className="p-3 bg-[#F7F0E8]/50 rounded-xl text-center border border-[#5A4038]/10">
                <ShieldCheck size={18} className="mx-auto text-[#8B4A4F] mb-1" />
                <p className="text-[11px] font-semibold text-[#5A4038]">100% Tự Nhiên</p>
                <p className="text-[10px] text-[#5A4038]/70">Sáp đậu nành thực vật</p>
              </div>
              <div className="p-3 bg-[#F7F0E8]/50 rounded-xl text-center border border-[#5A4038]/10">
                <RotateCcw size={18} className="mx-auto text-[#8B4A4F] mb-1" />
                <p className="text-[11px] font-semibold text-[#5A4038]">Đổi Trả Dễ Dàng</p>
                <p className="text-[10px] text-[#5A4038]/70">Trong vòng 7 ngày</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5A4038]/60 mb-2">
                <span className="font-semibold text-[#8B4A4F] uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-emerald-700 font-medium">Còn hàng tại xưởng</span>
              </div>

              <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#6F3038] leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-[#8B4A4F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#8B4A4F]" />
                  ))}
                </div>
                <span className="font-bold text-[#5A4038] tabular-nums">{product.rating}</span>
                <span className="text-[#5A4038]/60">· {product.reviewCount} đánh giá từ người mua</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#6F3038] tabular-nums">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#5A4038]/50 line-through tabular-nums">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#5A4038]/80 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="p-4 bg-[#F7F0E8]/60 rounded-xl border border-[#5A4038]/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#5A4038]/60 block text-[11px]">Kích thước:</span>
                <span className="font-medium text-[#5A4038]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-[#5A4038]/60 block text-[11px]">Thời gian cháy:</span>
                <span className="font-medium text-[#5A4038]">{product.burnTime}</span>
              </div>
              <div>
                <span className="text-[#5A4038]/60 block text-[11px]">Trọng lượng:</span>
                <span className="font-medium text-[#5A4038]">{product.weight}</span>
              </div>
              <div>
                <span className="text-[#5A4038]/60 block text-[11px]">Chất liệu sáp:</span>
                <span className="font-medium text-[#5A4038]">100% sáp đậu nành</span>
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#5A4038]">Số lượng:</span>
                <div className="flex items-center border border-[#5A4038]/20 rounded-lg bg-[#FFFDF9]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm hover:bg-[#F7F0E8] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold tabular-nums text-[#5A4038]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-sm hover:bg-[#F7F0E8] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-bold tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm uppercase"
                >
                  <ShoppingBag size={16} />
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-[#8B4A4F] hover:bg-[#6F3038] text-[#FFFDF9] text-xs font-bold tracking-wider rounded-xl transition-colors flex items-center justify-center shadow-sm uppercase"
                >
                  <span>MUA NGAY</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                    isFav
                      ? 'border-[#8B4A4F] bg-[#E9D5D0] text-[#8B4A4F]'
                      : 'border-[#5A4038]/20 hover:border-[#8B4A4F] text-[#5A4038]'
                  }`}
                  aria-label="Lưu vào yêu thích"
                  title="Thêm yêu thích"
                >
                  <Heart size={18} className={isFav ? 'fill-[#8B4A4F]' : ''} />
                </button>
              </div>
            </div>

            {/* Custom note promotion */}
            <div className="p-3.5 rounded-xl bg-[#E9D5D0]/40 border border-[#8B4A4F]/20 text-xs text-[#5A4038] flex items-center gap-2">
              <Sparkles size={16} className="text-[#8B4A4F] shrink-0" />
              <span>
                Bạn muốn khắc tên riêng hoặc đóng gói hộp quà đặc biệt? Hãy ghi chú khi thanh toán hoặc sử dụng tính năng <strong>Tự Phối Nến</strong> nhé.
              </span>
            </div>
          </div>

        </div>

        {/* Detailed Tabs: Mô tả chi tiết, Kim tự tháp mùi hương, Hướng dẫn sử dụng */}
        <div className="py-12 border-b border-[#5A4038]/10">
          <div className="flex border-b border-[#5A4038]/10 space-x-8 mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'desc'
                  ? 'text-[#6F3038]'
                  : 'text-[#5A4038]/60 hover:text-[#5A4038]'
              }`}
            >
              Mô Tả & Thành Phần
              {activeTab === 'desc' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('scent')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'scent'
                  ? 'text-[#6F3038]'
                  : 'text-[#5A4038]/60 hover:text-[#5A4038]'
              }`}
            >
              Các Tầng Mùi Hương
              {activeTab === 'scent' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'guide'
                  ? 'text-[#6F3038]'
                  : 'text-[#5A4038]/60 hover:text-[#5A4038]'
              }`}
            >
              Hướng Dẫn Thắp & Bảo Quản
              {activeTab === 'guide' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
              )}
            </button>
          </div>

          <div className="max-w-3xl text-sm text-[#5A4038]/85 leading-relaxed space-y-4">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <div className="pt-2">
                  <h4 className="font-serif-heading text-base font-bold text-[#6F3038] mb-1">
                    Thành phần nguyên liệu:
                  </h4>
                  <p className="text-xs text-[#5A4038]/80">{product.ingredients}</p>
                </div>
              </div>
            )}

            {activeTab === 'scent' && (
              <div className="space-y-4">
                <p>
                  Sản phẩm được điều chế theo công thức 3 tầng hương độc quyền, tỏa hương nhẹ nhàng, không gây đau đầu:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-[#F7F0E8] rounded-lg">
                    <span className="text-xs font-bold text-[#6F3038] uppercase block">
                      Hương đầu (Top Notes):
                    </span>
                    <span className="text-xs text-[#5A4038]">{product.scentNotes.top}</span>
                  </div>
                  <div className="p-3 bg-[#F7F0E8] rounded-lg">
                    <span className="text-xs font-bold text-[#6F3038] uppercase block">
                      Hương giữa (Heart Notes):
                    </span>
                    <span className="text-xs text-[#5A4038]">{product.scentNotes.heart}</span>
                  </div>
                  <div className="p-3 bg-[#F7F0E8] rounded-lg">
                    <span className="text-xs font-bold text-[#6F3038] uppercase block">
                      Hương cuối (Base Notes):
                    </span>
                    <span className="text-xs text-[#5A4038]">{product.scentNotes.base}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-3">
                <p><strong>Lần thắp đầu tiên:</strong> Đốt liên tục từ 1.5 – 2 giờ để mặt sáp tan chảy đều đến mép nến, tránh hiện tượng nến bị đào lòng hốc.</p>
                <p><strong>Cắt bấc:</strong> Trước mỗi lần thắp, hãy tỉa bấc còn khoảng 5mm để ngọn lửa cháy êm dịu, không sinh khói đen.</p>
                <p><strong>Bảo quản:</strong> Để nơi khô ráo, tránh ánh nắng mặt trời trực tiếp và nơi có gió lùa mạnh. Đậy nắp khi nến nguội để giữ hương bền lâu.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="py-12">
          <h2 className="font-serif-heading text-2xl font-bold text-[#6F3038] mb-8">
            Có Thể Bạn Sẽ Thích
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => viewProductDetail(rel)}
                className="group bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-[#F7F0E8] overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[#8B4A4F]">{rel.categoryName}</span>
                    <h4 className="font-serif-heading text-sm font-bold text-[#5A4038] group-hover:text-[#6F3038] transition-colors mt-0.5 line-clamp-1">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#5A4038]/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6F3038] tabular-nums">
                      {formatVND(rel.price)}
                    </span>
                    <span className="text-[11px] text-[#8B4A4F] font-semibold">Xem chi tiết</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
