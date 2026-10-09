import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import {
  CUSTOM_MOLDS,
  CUSTOM_COLORS,
  CUSTOM_SCENTS,
  CUSTOM_ACCESSORIES,
  CUSTOM_PACKAGING,
} from '../../data/customOptions';
import { Product } from '../../types';

export const CustomCandleBuilder: React.FC = () => {
  const { addToCart, formatVND, setCurrentView, setIsCartOpen } = useShop();

  // Step state (1 through 6, and final preview)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedMoldId, setSelectedMoldId] = useState<string>(CUSTOM_MOLDS[0].id);
  const [selectedColorId, setSelectedColorId] = useState<string>(CUSTOM_COLORS[0].id);
  const [selectedScentId, setSelectedScentId] = useState<string>(CUSTOM_SCENTS[0].id);
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([CUSTOM_ACCESSORIES[0].id]);
  const [customMessage, setCustomMessage] = useState<string>('Gửi một chút bình yên đến bạn');
  const [selectedPackagingId, setSelectedPackagingId] = useState<string>(CUSTOM_PACKAGING[0].id);

  // Selected Objects
  const mold = CUSTOM_MOLDS.find((m) => m.id === selectedMoldId) || CUSTOM_MOLDS[0];
  const color = CUSTOM_COLORS.find((c) => c.id === selectedColorId) || CUSTOM_COLORS[0];
  const scent = CUSTOM_SCENTS.find((s) => s.id === selectedScentId) || CUSTOM_SCENTS[0];
  const packaging = CUSTOM_PACKAGING.find((p) => p.id === selectedPackagingId) || CUSTOM_PACKAGING[0];
  const accessories = CUSTOM_ACCESSORIES.filter((a) => selectedAccessoryIds.includes(a.id));

  // Dynamic price calculation
  const accessoriesTotal = accessories.reduce((acc, item) => acc + item.price, 0);
  const totalPrice = mold.price + accessoriesTotal + packaging.price;

  const toggleAccessory = (accId: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId]
    );
  };

  const handleAddToCart = () => {
    // Construct bespoke product representation
    const customProduct: Product = {
      id: `custom-candle-${Date.now()}`,
      name: `Nến Tự Phối – ${mold.name}`,
      slug: 'nen-tu-phoi-handmade',
      price: totalPrice,
      category: 'custom',
      categoryName: 'Nến thiết kế riêng',
      rating: 5.0,
      reviewCount: 1,
      image: mold.image,
      gallery: [mold.image],
      shortDescription: `Màu: ${color.name} · Hương: ${scent.name} · Đóng gói: ${packaging.name}`,
      description: `Chiếc nến độc bản do chính bạn tự phối: Khuôn ${mold.name}, sáp màu ${color.name}, hương thơm ${scent.name}, phụ kiện ${accessories.map((a) => a.name).join(', ')}. Lời nhắn: "${customMessage}".`,
      scentNotes: {
        top: scent.notes,
        heart: scent.notes,
        base: scent.notes,
      },
      ingredients: '100% sáp đậu nành thiên nhiên, tinh dầu cao cấp IFRA, phụ kiện thủ công tự nhiên',
      dimensions: 'Tùy chỉnh theo dáng khuôn',
      burnTime: '25 – 40 giờ',
      weight: '180g – 250g',
      stock: 99,
    };

    addToCart(customProduct, 1, scent.name, {
      mold: mold.name,
      color: color.name,
      scent: scent.name,
      accessories: accessories.map((a) => a.name),
      message: customMessage.trim() || undefined,
      packaging: packaging.name,
    });

    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#E9D5D0] text-[#6F3038] text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles size={14} />
            <span>Xưởng Nến Sáng Tạo Online</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
            Tự Phối Nến Của Riêng Bạn
          </h1>
          <p className="text-sm text-[#5A4038]/80 mt-2">
            Thực hiện 6 bước đơn giản để tạo nên chiếc nến độc bản mang đậm dấu ấn và câu chuyện của bạn.
          </p>
        </div>

        {/* Step Tabs indicator */}
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-10 overflow-x-auto pb-2 gap-2 text-xs">
          {[
            { step: 1, label: 'Khuôn dáng' },
            { step: 2, label: 'Màu sáp' },
            { step: 3, label: 'Mùi hương' },
            { step: 4, label: 'Phụ kiện' },
            { step: 5, label: 'Lời nhắn' },
            { step: 6, label: 'Bao bì' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`flex items-center gap-1.5 py-2 px-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                currentStep === item.step
                  ? 'bg-[#6F3038] text-[#FFFDF9]'
                  : currentStep > item.step
                  ? 'bg-[#E9D5D0] text-[#6F3038]'
                  : 'bg-[#F7F0E8] text-[#5A4038]/60 hover:bg-[#E9D5D0]/50'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold">
                {item.step}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main 2-Column: Builder Controls Left + Live Visual Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl border border-[#5A4038]/10 p-6 sm:p-8 shadow-xs">
            
            {/* STEP 1: CHỌN KHUÔN DÁNG */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 1: Chọn Kiểu Khuôn Nến
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Chọn hình dáng nến bạn yêu thích làm nền tảng tác phẩm.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CUSTOM_MOLDS.map((m) => {
                    const isSelected = selectedMoldId === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMoldId(m.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#6F3038] bg-[#F7F0E8]/50 shadow-xs'
                            : 'border-[#5A4038]/10 hover:border-[#8B4A4F]'
                        }`}
                      >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-[#F7F0E8]">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-heading text-sm font-bold text-[#5A4038]">
                              {m.name}
                            </h4>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#6F3038] text-[#FFFDF9] flex items-center justify-center">
                                <Check size={12} />
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-[#5A4038]/70 mt-1 leading-snug">
                            {m.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#6F3038] mt-3 tabular-nums">
                          {formatVND(m.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHỌN MÀU SÁP */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 2: Chọn Màu Sắc Nến
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Sáp đậu nành được phối cùng bột màu khoáng tự nhiên an toàn tuyệt đối khi đốt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CUSTOM_COLORS.map((c) => {
                    const isSelected = selectedColorId === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedColorId(c.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? 'border-[#6F3038] bg-[#F7F0E8]/50 shadow-xs'
                            : 'border-[#5A4038]/10 hover:border-[#8B4A4F]'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full border border-black/10 shrink-0 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-heading text-sm font-bold text-[#5A4038]">
                              {c.name}
                            </h4>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#6F3038] text-[#FFFDF9] flex items-center justify-center">
                                <Check size={12} />
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-[#5A4038]/70 mt-0.5 leading-snug">
                            {c.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: CHỌN MÙI HƯƠNG */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 3: Chọn Mùi Hương Tinh Dầu
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Tinh dầu tự nhiên cao cấp không cồn, không paraben, tỏa hương dịu êm.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_SCENTS.map((s) => {
                    const isSelected = selectedScentId === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedScentId(s.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                          isSelected
                            ? 'border-[#6F3038] bg-[#F7F0E8]/50 shadow-xs'
                            : 'border-[#5A4038]/10 hover:border-[#8B4A4F]'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="font-serif-heading text-sm font-bold text-[#5A4038]">
                            {s.name}
                          </h4>
                          <p className="text-xs text-[#5A4038]/80 leading-relaxed">
                            {s.description}
                          </p>
                          <span className="text-[11px] text-[#8B4A4F] font-medium block">
                            Tầng hương: {s.notes}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#6F3038] text-[#FFFDF9] flex items-center justify-center shrink-0 ml-3">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: CHỌN PHỤ KIỆN TRANG TRÍ */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 4: Chọn Phụ Kiện Trang Trí Bề Mặt
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Bạn có thể chọn một hoặc nhiều phụ kiện kết hợp cùng nhau.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_ACCESSORIES.map((acc) => {
                    const isSelected = selectedAccessoryIds.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#6F3038] bg-[#F7F0E8]/50 shadow-xs'
                            : 'border-[#5A4038]/10 hover:border-[#8B4A4F]'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif-heading text-sm font-bold text-[#5A4038]">
                            {acc.name}
                          </h4>
                          <p className="text-[11px] text-[#5A4038]/70 mt-0.5">
                            {acc.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#6F3038] tabular-nums">
                            +{formatVND(acc.price)}
                          </span>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#6F3038] border-[#6F3038] text-[#FFFDF9]'
                                : 'border-[#5A4038]/30'
                            }`}
                          >
                            {isSelected && <Check size={13} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: THÊM LỜI NHẮN */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 5: Thêm Lời Nhắn & Khắc Tên
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Trạm Handmade sẽ khắc laser nội dung này lên thẻ gỗ nhỏ buộc quanh cổ nến hoặc viết tay vào thiệp hoa.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A4038] mb-1.5">
                      Nội dung lời nhắn hoặc tên muốn khắc (Tối đa 60 ký tự):
                    </label>
                    <textarea
                      rows={3}
                      maxLength={60}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="VD: Chúc Mai sinh nhật rực rỡ và luôn bình an ♥"
                      className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-xl p-3 text-xs text-[#5A4038] focus:outline-none focus:border-[#6F3038]"
                    />
                    <span className="text-[11px] text-[#5A4038]/60 text-right block mt-1">
                      {customMessage.length}/60 ký tự
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#8B4A4F] mb-2">
                      Gợi ý câu chúc ý nghĩa:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Chạm một cảm xúc – Chữa lành tâm hồn',
                        'Chúc bạn mỗi ngày đều ngập tràn an yên',
                        'Happy Birthday to my sweetest girl ♥',
                        'Cảm ơn bạn đã luôn ở bên mình',
                      ].map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCustomMessage(sugg)}
                          className="py-1 px-2.5 bg-[#F7F0E8] hover:bg-[#E9D5D0] text-[11px] text-[#5A4038] rounded-md transition-colors text-left"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CHỌN BAO BÌ */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                    Bước 6: Chọn Kiểu Đóng Gói & Hộp Quà
                  </h3>
                  <p className="text-xs text-[#5A4038]/70 mt-1">
                    Mỗi phong cách bao bì đều được chăm chút cẩn thận như một món quà nghệ thuật.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_PACKAGING.map((pack) => {
                    const isSelected = selectedPackagingId === pack.id;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => setSelectedPackagingId(pack.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#6F3038] bg-[#F7F0E8]/50 shadow-xs'
                            : 'border-[#5A4038]/10 hover:border-[#8B4A4F]'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif-heading text-sm font-bold text-[#5A4038]">
                            {pack.name}
                          </h4>
                          <p className="text-[11px] text-[#5A4038]/70 mt-0.5">
                            {pack.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#6F3038] tabular-nums">
                            {pack.price === 0 ? 'Miễn phí' : `+${formatVND(pack.price)}`}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#6F3038] border-[#6F3038] text-[#FFFDF9]'
                                : 'border-[#5A4038]/30'
                            }`}
                          >
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-[#5A4038]/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="py-2.5 px-4 rounded-lg border border-[#5A4038]/20 text-xs font-semibold text-[#5A4038] hover:bg-[#F7F0E8] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Quay lại</span>
                </button>
              ) : <div />}

              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="py-2.5 px-6 rounded-lg bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold hover:bg-[#5A4038] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Tiếp theo: Bước {currentStep + 1}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-7 rounded-lg bg-[#6F3038] text-[#FFFDF9] text-xs font-bold tracking-wider hover:bg-[#5A4038] transition-colors flex items-center gap-2 shadow-md uppercase"
                >
                  <ShoppingBag size={15} />
                  <span>THÊM CHIẾC NẾN VÀO GIỎ</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Live Visual Preview Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-[#F7F0E8]/70 rounded-2xl border border-[#5A4038]/10 p-6 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#5A4038]/10">
                <h3 className="font-serif-heading text-lg font-bold text-[#6F3038]">
                  Bản Xem Trước Trực Quan
                </h3>
                <span className="text-[11px] text-[#8B4A4F] font-semibold">Tự động cập nhật</span>
              </div>

              {/* Preview Image & Color Dot */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFFDF9] border border-[#5A4038]/10 shadow-xs">
                <img
                  src={mold.image}
                  alt={mold.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Color overlay indicator */}
                <div className="absolute bottom-3 left-3 bg-[#FFFDF9]/95 backdrop-blur-xs py-1 px-3 rounded-full flex items-center gap-2 shadow-xs border border-[#5A4038]/10">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[11px] font-semibold text-[#5A4038]">{color.name}</span>
                </div>
              </div>

              {/* Message Tag Card */}
              {customMessage && (
                <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#8B4A4F]/20 flex items-start gap-2 text-xs shadow-2xs">
                  <MessageSquare size={16} className="text-[#8B4A4F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#8B4A4F] font-bold uppercase block">
                      Thẻ gỗ khắc theo yêu cầu:
                    </span>
                    <p className="font-serif-heading italic text-[#5A4038] mt-0.5">
                      “{customMessage}”
                    </p>
                  </div>
                </div>
              )}

              {/* Detailed Breakdown List */}
              <div className="space-y-2 text-xs text-[#5A4038] pt-1">
                <div className="flex justify-between py-1 border-b border-[#5A4038]/10">
                  <span className="text-[#5A4038]/70">Kiểu khuôn:</span>
                  <span className="font-medium">{mold.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#5A4038]/10">
                  <span className="text-[#5A4038]/70">Màu sắc:</span>
                  <span className="font-medium">{color.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#5A4038]/10">
                  <span className="text-[#5A4038]/70">Mùi hương:</span>
                  <span className="font-medium">{scent.name.split('(')[0]}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#5A4038]/10">
                  <span className="text-[#5A4038]/70">Phụ kiện:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">
                    {accessories.length > 0
                      ? accessories.map((a) => a.name.split(' ')[0]).join(', ')
                      : 'Không chọn'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#5A4038]/10">
                  <span className="text-[#5A4038]/70">Đóng gói:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">
                    {packaging.name.split(' ')[0]} {packaging.name.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Live Price Calculation Total */}
              <div className="p-4 bg-[#FFFDF9] rounded-xl border border-[#5A4038]/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5A4038]/70 block">Giá dự kiến:</span>
                  <span className="text-xl font-bold text-[#6F3038] tabular-nums">
                    {formatVND(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-4 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag size={14} />
                  <span>Thêm vào giỏ</span>
                </button>
              </div>

              <p className="text-[11px] text-[#5A4038]/60 text-center italic">
                Thời gian đúc nến thủ công: 24h – 48h trước khi giao hàng.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
