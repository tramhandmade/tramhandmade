import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, Package, Truck, Check, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Order, OrderStatus } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, currentTrackedOrder, formatVND } = useShop();

  const [orderCode, setOrderCode] = useState(currentTrackedOrder?.id || '');
  const [phone, setPhone] = useState(currentTrackedOrder?.customerPhone || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(currentTrackedOrder || orders[0]);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    if (currentTrackedOrder) {
      setOrderCode(currentTrackedOrder.id);
      setPhone(currentTrackedOrder.customerPhone);
      setSearchedOrder(currentTrackedOrder);
    }
  }, [currentTrackedOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');

    const cleanCode = orderCode.trim().toUpperCase();
    const cleanPhone = phone.trim();

    if (!cleanCode && !cleanPhone) {
      setSearchError('Vui lòng nhập Mã đơn hàng hoặc Số điện thoại để tra cứu');
      return;
    }

    const found = orders.find((o) => {
      const matchCode = cleanCode ? o.id.toUpperCase() === cleanCode : true;
      const matchPhone = cleanPhone ? o.customerPhone.includes(cleanPhone) : true;
      return matchCode && matchPhone;
    });

    if (found) {
      setSearchedOrder(found);
      setSearchError('');
    } else {
      setSearchedOrder(null);
      setSearchError('Không tìm thấy đơn hàng phù hợp với thông tin đã nhập.');
    }
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'placed', label: 'Đã đặt hàng', desc: 'Đơn hàng được ghi nhận' },
    { status: 'confirmed', label: 'Đã xác nhận', desc: 'Xưởng kiểm tra nguyên liệu' },
    { status: 'preparing', label: 'Đang chuẩn bị', desc: 'Đúc nến thủ công & thắt nơ' },
    { status: 'shipping', label: 'Đang giao', desc: 'Bàn giao cho đơn vị vận chuyển' },
    { status: 'delivered', label: 'Đã giao', desc: 'Giao nến thành công đến bạn' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'shipping': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
            Theo Dõi Hành Trình
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
            Tra Cứu Đơn Hàng
          </h1>
          <p className="text-sm text-[#5A4038]/80 mt-2">
            Nhập mã đơn hàng hoặc số điện thoại để kiểm tra tiến độ đúc nến và lịch giao hàng dự kiến.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#F7F0E8] p-6 sm:p-8 rounded-2xl border border-[#5A4038]/10 shadow-xs mb-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                Mã đơn hàng:
              </label>
              <input
                type="text"
                placeholder="VD: TR-84920"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038] uppercase focus:outline-none focus:border-[#6F3038]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                Số điện thoại:
              </label>
              <input
                type="text"
                placeholder="VD: 0901234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none focus:border-[#6F3038]"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-bold tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm uppercase h-10"
              >
                <Search size={15} />
                <span>TRA CỨU</span>
              </button>
            </div>
          </form>

          {/* Quick test buttons for evaluation */}
          <div className="mt-4 pt-3 border-t border-[#5A4038]/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#5A4038]/60">Mã mẫu thử nghiệm:</span>
            {['TR-84920', 'TR-1082', 'TR-2026'].map((demoCode) => (
              <button
                key={demoCode}
                type="button"
                onClick={() => {
                  setOrderCode(demoCode);
                  setPhone('');
                  const found = orders.find((o) => o.id === demoCode);
                  if (found) setSearchedOrder(found);
                }}
                className="py-1 px-2.5 bg-[#FFFDF9] hover:bg-[#E9D5D0] text-[#6F3038] font-mono text-xs rounded border border-[#5A4038]/15 transition-colors"
              >
                {demoCode}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Results Card with Visual Timeline */}
        {searchedOrder && (
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#5A4038]/10 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#5A4038]/10 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5A4038]/60">Mã đơn:</span>
                  <span className="font-mono text-xl font-bold text-[#6F3038]">
                    {searchedOrder.id}
                  </span>
                </div>
                <p className="text-xs text-[#5A4038]/70 mt-0.5">
                  Ngày đặt: {searchedOrder.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#F7F0E8] py-1.5 px-3.5 rounded-full border border-[#5A4038]/10 text-xs">
                <Clock size={14} className="text-[#8B4A4F]" />
                <span className="text-[#5A4038]">Dự kiến nhận hàng:</span>
                <span className="font-bold text-[#6F3038]">{searchedOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Visual 5-Step Timeline */}
            <div>
              <h3 className="font-serif-heading text-base font-bold text-[#6F3038] mb-6">
                Tiến Trình Đơn Hàng
              </h3>

              <div className="relative">
                {/* Horizontal Bar (Desktop) */}
                <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-[#5A4038]/15 -z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.status} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                        {/* Status Circle */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isCompleted
                              ? 'bg-[#6F3038] text-[#FFFDF9] ring-4 ring-[#E9D5D0]'
                              : 'bg-[#F7F0E8] text-[#5A4038]/50 border border-[#5A4038]/20'
                          }`}
                        >
                          {isCompleted ? <Check size={16} /> : idx + 1}
                        </div>

                        <div>
                          <h4
                            className={`text-xs font-bold transition-colors ${
                              isCurrent ? 'text-[#6F3038]' : isCompleted ? 'text-[#5A4038]' : 'text-[#5A4038]/50'
                            }`}
                          >
                            {step.label}
                          </h4>
                          <p className="text-[11px] text-[#5A4038]/60 mt-0.5 leading-snug">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items & Customer details */}
            <div className="pt-6 border-t border-[#5A4038]/10 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Product items */}
              <div>
                <h4 className="font-serif-heading text-sm font-bold text-[#6F3038] mb-3">
                  Sản Phẩm Trong Đơn
                </h4>
                <div className="space-y-3">
                  {searchedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg bg-[#F7F0E8] border border-[#5A4038]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#5A4038] line-clamp-1">{item.name}</p>
                        <p className="text-[#5A4038]/60 text-[11px]">SL: {item.quantity} × {formatVND(item.price)}</p>
                        {item.selectedScent && (
                          <p className="text-[#8B4A4F] text-[10px]">Hương: {item.selectedScent}</p>
                        )}
                      </div>
                      <span className="font-semibold text-[#6F3038] tabular-nums">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 mt-3 border-t border-[#5A4038]/10 text-xs text-[#5A4038] space-y-1">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="tabular-nums font-medium">{formatVND(searchedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="tabular-nums font-medium">
                      {searchedOrder.shippingFee === 0 ? 'Miễn phí' : formatVND(searchedOrder.shippingFee)}
                    </span>
                  </div>
                  {searchedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Giảm giá:</span>
                      <span className="tabular-nums font-medium">-{formatVND(searchedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-[#5A4038]/10 text-sm font-bold text-[#6F3038]">
                    <span>Tổng thanh toán:</span>
                    <span className="tabular-nums">{formatVND(searchedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery recipient info */}
              <div className="space-y-3 text-xs bg-[#F7F0E8]/50 p-4 rounded-xl border border-[#5A4038]/10">
                <h4 className="font-serif-heading text-sm font-bold text-[#6F3038]">
                  Thông Tin Giao Nhận
                </h4>
                <p><strong>Người nhận:</strong> {searchedOrder.customerName}</p>
                <p><strong>Số điện thoại:</strong> {searchedOrder.customerPhone}</p>
                <p><strong>Địa chỉ:</strong> {searchedOrder.customerAddress}</p>
                <p><strong>Hình thức giao:</strong> {searchedOrder.shippingMethod === 'standard' ? 'Tiêu chuẩn (2-3 ngày)' : 'Hỏa tốc (2-4 giờ)'}</p>
                <p><strong>Thanh toán:</strong> {searchedOrder.paymentMethod === 'cod' ? 'COD (khi nhận hàng)' : searchedOrder.paymentMethod === 'banking' ? 'Chuyển khoản VietQR' : 'Ví điện tử'}</p>
                {searchedOrder.notes && (
                  <p><strong>Ghi chú:</strong> <span className="italic">{searchedOrder.notes}</span></p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
