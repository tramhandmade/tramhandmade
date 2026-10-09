import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discount,
    voucherCode,
    applyVoucher,
    total,
    formatVND,
    setCurrentView,
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyVoucher(inputCode);
    setVoucherMsg({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setCurrentView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-[#5A4038]/10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#5A4038]/10 flex items-center justify-between bg-[#F7F0E8]/40">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#6F3038]" />
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038]">
                Giỏ Hàng Của Bạn
              </h3>
              <span className="text-xs bg-[#E9D5D0] text-[#6F3038] py-0.5 px-2 rounded-full font-medium tabular-nums">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} món
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#5A4038]/70 hover:text-[#6F3038] rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F7F0E8] flex items-center justify-center text-[#8B4A4F] mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-serif-heading text-lg font-semibold text-[#5A4038]">
                  Giỏ hàng của bạn đang trống
                </h4>
                <p className="text-xs text-[#5A4038]/70 mt-1 max-w-xs mb-6">
                  Hãy ghé thăm bộ sưu tập nến thơm thủ công để chọn cho mình ngọn nến bình yên nhé.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="py-2.5 px-6 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold rounded-lg hover:bg-[#5A4038] transition-colors"
                >
                  Khám phá cửa hàng ngay
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-[#5A4038]/10 group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-lg bg-[#F7F0E8] border border-[#5A4038]/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-[#5A4038] leading-tight line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#5A4038]/40 hover:text-[#8B4A4F] p-1 transition-colors"
                        title="Xóa món này"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {item.selectedScent && (
                      <p className="text-[11px] text-[#8B4A4F] mt-0.5 line-clamp-1">
                        Hương: {item.selectedScent}
                      </p>
                    )}

                    {item.customDetails && (
                      <p className="text-[10px] text-[#5A4038]/70 bg-[#F7F0E8] px-1.5 py-0.5 rounded mt-1 line-clamp-1">
                        Màu: {item.customDetails.color} · Hộp: {item.customDetails.packaging.split(' ')[0]}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#5A4038]/20 rounded-md bg-[#FFFDF9]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-[#5A4038] hover:bg-[#F7F0E8] transition-colors"
                          aria-label="Giảm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-[#5A4038]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-[#5A4038] hover:bg-[#F7F0E8] transition-colors"
                          aria-label="Tăng"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total line price */}
                      <span className="text-sm font-semibold text-[#6F3038] tabular-nums">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#5A4038]/10 bg-[#F7F0E8]/50 space-y-3.5">
              {/* Promo code input */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-2.5 top-2.5 text-[#8B4A4F]" />
                  <input
                    type="text"
                    placeholder="Mã giảm giá (VD: TRAMYEU)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-md py-1.5 pl-8 pr-2 text-xs text-[#5A4038] uppercase placeholder-normal focus:outline-none focus:border-[#6F3038]"
                  />
                </div>
                <button
                  type="submit"
                  className="py-1.5 px-3 bg-[#8B4A4F] text-[#FFFDF9] text-xs font-medium rounded-md hover:bg-[#6F3038] transition-colors"
                >
                  Áp dụng
                </button>
              </form>

              {voucherMsg && (
                <p
                  className={`text-[11px] ${
                    voucherMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {voucherMsg.text}
                </p>
              )}

              {/* Order calculations */}
              <div className="space-y-1.5 text-xs text-[#5A4038]">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium tabular-nums">{formatVND(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Giảm giá voucher ({voucherCode})</span>
                    <span className="font-medium tabular-nums">-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700">Miễn phí (Freeship)</span>
                    ) : (
                      formatVND(shippingFee)
                    )}
                  </span>
                </div>

                {subtotal < 300000 && (
                  <p className="text-[10px] text-[#8B4A4F] italic">
                    Mua thêm {formatVND(300000 - subtotal)} để được MIỄN PHÍ VẬN CHUYỂN toàn quốc!
                  </p>
                )}

                <div className="pt-2 border-t border-[#5A4038]/10 flex justify-between text-sm font-bold text-[#6F3038]">
                  <span>Tổng thanh toán</span>
                  <span className="tabular-nums text-base">{formatVND(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3 px-4 bg-[#6F3038] text-[#FFFDF9] font-medium text-xs rounded-lg hover:bg-[#5A4038] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>TIẾN HÀNH THANH TOÁN</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-xs text-[#5A4038]/80 hover:text-[#6F3038] text-center"
                >
                  Tiếp tục chọn thêm nến
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
