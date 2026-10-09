import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Truck, CreditCard, Banknote, QrCode, ArrowLeft } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Order } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingFee,
    discount,
    voucherCode,
    total,
    formatVND,
    addOrder,
    setCurrentView,
    setCurrentTrackedOrder,
  } = useShop();

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking' | 'momo'>('cod');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Placed Order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Recalculate shipping based on choice
  const actualShippingFee = shippingMethod === 'express' ? shippingFee + 15000 : shippingFee;
  const finalTotal = Math.max(0, subtotal - discount + actualShippingFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!name.trim()) errors.name = 'Vui lòng nhập họ và tên của bạn';
    if (!phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!/^[0-9]{9,11}$/.test(phone.replace(/\s+/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ (9-11 chữ số)';
    }
    if (!address.trim()) errors.address = 'Vui lòng nhập địa chỉ giao hàng cụ thể';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newOrder = addOrder({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || 'khachle@tramhandmade.vn',
      customerAddress: address.trim(),
      notes: notes.trim() || undefined,
      items: cart,
      subtotal,
      shippingFee: actualShippingFee,
      discount,
      total: finalTotal,
      shippingMethod,
      paymentMethod,
    });

    setConfirmedOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackThisOrder = () => {
    if (confirmedOrder) {
      setCurrentTrackedOrder(confirmedOrder);
      setCurrentView('track-order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedOrder) {
    return (
      <div className="bg-[#FFFDF9] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-wider block">
            Đặt hàng thành công
          </span>

          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#6F3038]">
            Cảm Ơn Bạn Đã Chọn Trạm Handmade!
          </h1>

          <p className="text-sm text-[#5A4038]/80 leading-relaxed max-w-lg mx-auto">
            Đơn hàng của bạn đã được ghi nhận. Các nghệ nhân của Trạm sẽ bắt đầu kiểm tra và đóng gói những ngọn nến chỉn chu nhất để gửi đến bạn.
          </p>

          {/* Order Details Card */}
          <div className="p-6 bg-[#F7F0E8] rounded-2xl border border-[#5A4038]/10 text-left space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#5A4038]/10">
              <span className="text-xs text-[#5A4038]/70">Mã đơn hàng:</span>
              <span className="font-mono text-base font-bold text-[#6F3038] tracking-wider">
                {confirmedOrder.id}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5A4038]/70">Khách hàng:</span>
              <span className="font-semibold text-[#5A4038]">{confirmedOrder.customerName}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5A4038]/70">Số điện thoại:</span>
              <span className="font-semibold text-[#5A4038]">{confirmedOrder.customerPhone}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5A4038]/70">Địa chỉ:</span>
              <span className="font-semibold text-[#5A4038] text-right max-w-xs">{confirmedOrder.customerAddress}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5A4038]/70">Phương thức thanh toán:</span>
              <span className="font-semibold text-[#5A4038]">
                {confirmedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : confirmedOrder.paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' : 'Ví điện tử'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#5A4038]/10 text-sm font-bold text-[#6F3038]">
              <span>Tổng thanh toán:</span>
              <span className="tabular-nums text-base">{formatVND(confirmedOrder.total)}</span>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-xl text-xs text-[#8B4A4F] border border-[#8B4A4F]/20">
              Thời gian dự kiến nhận nến: <strong>{confirmedOrder.estimatedDelivery}</strong>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleTrackThisOrder}
              className="py-3 px-6 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>TRA CỨU TIẾN ĐỘ ĐƠN HÀNG</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-6 bg-[#FFFDF9] border border-[#5A4038]/20 text-[#5A4038] text-xs font-semibold rounded-xl hover:bg-[#F7F0E8] transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART CHECKOUT GUARD
  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFDF9] min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <h2 className="font-serif-heading text-2xl font-bold text-[#6F3038]">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-xs text-[#5A4038]/70">
            Vui lòng thêm nến vào giỏ trước khi tiến hành thanh toán nhé.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="py-2.5 px-6 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold rounded-lg hover:bg-[#5A4038]"
          >
            Về trang cửa hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] hover:text-[#6F3038] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Tiếp tục mua hàng</span>
          </button>
        </div>

        <div className="mb-8">
          <h1 className="font-serif-heading text-3xl font-bold text-[#6F3038]">
            Thanh Toán Đơn Hàng
          </h1>
          <p className="text-xs text-[#5A4038]/70 mt-1">
            Vui lòng điền thông tin người nhận để Trạm tiến hành đóng gói và giao hàng.
          </p>
        </div>

        {/* 2-Column: Form Left, Order Summary Right */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Customer info, shipping, payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Thông tin giao hàng */}
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#5A4038]/10 shadow-2xs space-y-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038] pb-3 border-b border-[#5A4038]/10">
                1. Thông Tin Khách Hàng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                    Họ và tên người nhận <span className="text-[#8B4A4F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Lưu Ngọc Mai"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    className={`w-full bg-[#FFFDF9] border rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none ${
                      formErrors.name ? 'border-rose-500' : 'border-[#5A4038]/20 focus:border-[#6F3038]'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                    Số điện thoại nhận hàng <span className="text-[#8B4A4F]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="VD: 0901234567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                    className={`w-full bg-[#FFFDF9] border rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none ${
                      formErrors.phone ? 'border-rose-500' : 'border-[#5A4038]/20 focus:border-[#6F3038]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Email (để nhận hóa đơn & mã tra cứu)
                </label>
                <input
                  type="email"
                  placeholder="VD: ngocmai@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none focus:border-[#6F3038]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Địa chỉ nhận hàng cụ thể <span className="text-[#8B4A4F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                  }}
                  className={`w-full bg-[#FFFDF9] border rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none ${
                    formErrors.address ? 'border-rose-500' : 'border-[#5A4038]/20 focus:border-[#6F3038]'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Ghi chú đơn hàng (nội dung thiệp tặng, giờ nhận hàng...)
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Nhờ shop viết giúp thiệp: 'Chúc mừng sinh nhật Mai yêu!'"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038] focus:outline-none focus:border-[#6F3038]"
                />
              </div>
            </div>

            {/* 2. Phương thức giao hàng */}
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#5A4038]/10 shadow-2xs space-y-3">
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038] pb-3 border-b border-[#5A4038]/10">
                2. Phương Thức Vận Chuyển
              </h3>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    shippingMethod === 'standard'
                      ? 'border-[#6F3038] bg-[#F7F0E8]/40'
                      : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#6F3038]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#5A4038] block">
                        Giao hàng tiêu chuẩn (Toàn quốc)
                      </span>
                      <span className="text-[11px] text-[#5A4038]/70">2 – 3 ngày làm việc</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#6F3038] tabular-nums">
                    {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    shippingMethod === 'express'
                      ? 'border-[#6F3038] bg-[#F7F0E8]/40'
                      : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#6F3038]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#5A4038] block">
                        Giao hàng hỏa tốc (Nội thành)
                      </span>
                      <span className="text-[11px] text-[#5A4038]/70">Giao ngay trong 2 – 4 giờ</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#6F3038] tabular-nums">
                    {formatVND(shippingFee + 15000)}
                  </span>
                </label>
              </div>
            </div>

            {/* 3. Phương thức thanh toán */}
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#5A4038]/10 shadow-2xs space-y-3">
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038] pb-3 border-b border-[#5A4038]/10">
                3. Phương Thức Thanh Toán
              </h3>

              <div className="space-y-3">
                {/* COD */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-[#6F3038] bg-[#F7F0E8]/40'
                      : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#6F3038]"
                    />
                    <Banknote size={18} className="text-[#8B4A4F]" />
                    <div>
                      <span className="text-xs font-bold text-[#5A4038] block">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <span className="text-[11px] text-[#5A4038]/70">Kiểm tra nến trước khi trả tiền cho shipper</span>
                    </div>
                  </div>
                </label>

                {/* Banking / VietQR */}
                <label
                  className={`flex flex-col p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'banking'
                      ? 'border-[#6F3038] bg-[#F7F0E8]/40'
                      : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'banking'}
                      onChange={() => setPaymentMethod('banking')}
                      className="accent-[#6F3038]"
                    />
                    <QrCode size={18} className="text-[#8B4A4F]" />
                    <div>
                      <span className="text-xs font-bold text-[#5A4038] block">
                        Chuyển khoản ngân hàng (VietQR Quét Mã)
                      </span>
                      <span className="text-[11px] text-[#5A4038]/70">Xác nhận thanh toán tự động qua mã QR</span>
                    </div>
                  </div>

                  {paymentMethod === 'banking' && (
                    <div className="mt-3 p-3 bg-[#FFFDF9] rounded-lg border border-[#5A4038]/15 text-xs text-[#5A4038] space-y-1">
                      <p className="font-semibold text-[#6F3038]">Ngân hàng Quân Đội (MB Bank)</p>
                      <p>Số tài khoản: <strong>0901234567</strong></p>
                      <p>Chủ tài khoản: <strong>TRẠM HANDMADE - NGUYEN VAN A</strong></p>
                      <p className="text-[11px] text-[#8B4A4F]">Nội dung CK: [Họ tên] + [Số điện thoại]</p>
                    </div>
                  )}
                </label>

                {/* MoMo */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'momo'
                      ? 'border-[#6F3038] bg-[#F7F0E8]/40'
                      : 'border-[#5A4038]/15 hover:border-[#8B4A4F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="accent-[#6F3038]"
                    />
                    <CreditCard size={18} className="text-[#8B4A4F]" />
                    <div>
                      <span className="text-xs font-bold text-[#5A4038] block">
                        Ví điện tử MoMo / ZaloPay
                      </span>
                      <span className="text-[11px] text-[#5A4038]/70">Thanh toán nhanh chóng và an toàn</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-[#F7F0E8] p-6 rounded-2xl border border-[#5A4038]/10 space-y-5">
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038] pb-3 border-b border-[#5A4038]/10">
                Tóm Tắt Đơn Hàng ({cart.reduce((s, i) => s + i.quantity, 0)} món)
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#5A4038]/10">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 flex gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-[#FFFDF9] shrink-0 border border-[#5A4038]/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#5A4038] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#8B4A4F]">Số lượng: {item.quantity}</p>
                      {item.selectedScent && (
                        <p className="text-[10px] text-[#5A4038]/70 truncate">{item.selectedScent}</p>
                      )}
                    </div>
                    <span className="font-semibold text-[#6F3038] tabular-nums shrink-0">
                      {formatVND(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-[#5A4038]/10 space-y-2 text-xs text-[#5A4038]">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium tabular-nums">{formatVND(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Mã ưu đãi ({voucherCode})</span>
                    <span className="font-medium tabular-nums">-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium tabular-nums">
                    {actualShippingFee === 0 ? (
                      <span className="text-emerald-700">Miễn phí</span>
                    ) : (
                      formatVND(actualShippingFee)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#5A4038]/10 flex justify-between text-base font-bold text-[#6F3038]">
                  <span>Tổng thanh toán</span>
                  <span className="tabular-nums text-xl">{formatVND(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-bold tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 uppercase"
              >
                <span>HOÀN TẤT ĐẶT HÀNG</span>
                <ArrowRight size={16} />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#5A4038]/70">
                <ShieldCheck size={14} className="text-[#8B4A4F]" />
                <span>Bảo mật thông tin cá nhân 100%</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
