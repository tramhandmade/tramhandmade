import React, { useState } from 'react';
import { Package, DollarSign, Users, ShoppingBag, ArrowLeft, RefreshCw, CheckCircle, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { OrderStatus } from '../../types';
import { PRODUCTS } from '../../data/products';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus, formatVND, setCurrentView, setCurrentTrackedOrder } = useShop();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingCount = orders.filter((o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing').length;
  const shippingCount = orders.filter((o) => o.status === 'shipping').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const statusMap: { [key in OrderStatus]: { label: string; color: string } } = {
    placed: { label: 'Đã đặt hàng', color: 'bg-amber-100 text-amber-800' },
    confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
    preparing: { label: 'Đang chuẩn bị', color: 'bg-purple-100 text-purple-800' },
    shipping: { label: 'Đang giao hàng', color: 'bg-indigo-100 text-indigo-800' },
    delivered: { label: 'Đã giao thành công', color: 'bg-emerald-100 text-emerald-800' },
  };

  const handleNextStatus = (orderId: string, currentStatus: OrderStatus) => {
    let next: OrderStatus = 'confirmed';
    if (currentStatus === 'placed') next = 'confirmed';
    else if (currentStatus === 'confirmed') next = 'preparing';
    else if (currentStatus === 'preparing') next = 'shipping';
    else if (currentStatus === 'shipping') next = 'delivered';
    else return;

    updateOrderStatus(orderId, next);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#5A4038]/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest mb-1">
              <ShieldCheck size={14} />
              <span>Giao Diện Quản Trị Hệ Thống TMĐT (Admin Demo)</span>
            </div>
            <h1 className="font-serif-heading text-3xl font-bold text-[#6F3038]">
              Bảng Điều Khiển Quản Lý Bán Hàng
            </h1>
            <p className="text-xs text-[#5A4038]/70 mt-1">
              Hệ thống theo dõi đơn hàng, doanh số và vận hành xưởng nến thủ công TRẠM HANDMADE.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg border border-[#6F3038] text-[#6F3038] hover:bg-[#6F3038] hover:text-[#FFFDF9] text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Về trang chủ khách hàng</span>
          </button>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#F7F0E8] border border-[#5A4038]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6F3038] text-[#FFFDF9] flex items-center justify-center shrink-0">
              <DollarSign size={22} />
            </div>
            <div>
              <span className="text-xs text-[#5A4038]/70 block font-medium">Doanh Thu Toàn Bộ</span>
              <span className="font-serif-heading text-2xl font-bold text-[#6F3038] tabular-nums">
                {formatVND(totalRevenue)}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F0E8] border border-[#5A4038]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8B4A4F] text-[#FFFDF9] flex items-center justify-center shrink-0">
              <Package size={22} />
            </div>
            <div>
              <span className="text-xs text-[#5A4038]/70 block font-medium">Tổng Đơn Hàng</span>
              <span className="font-serif-heading text-2xl font-bold text-[#6F3038] tabular-nums">
                {orders.length} đơn
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F0E8] border border-[#5A4038]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-[#FFFDF9] flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <span className="text-xs text-[#5A4038]/70 block font-medium">Đơn Đang Xử Lý & Chuẩn Bị</span>
              <span className="font-serif-heading text-2xl font-bold text-purple-900 tabular-nums">
                {pendingCount} đơn
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F0E8] border border-[#5A4038]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-[#FFFDF9] flex items-center justify-center shrink-0">
              <CheckCircle size={22} />
            </div>
            <div>
              <span className="text-xs text-[#5A4038]/70 block font-medium">Đã Giao Thành Công</span>
              <span className="font-serif-heading text-2xl font-bold text-emerald-900 tabular-nums">
                {deliveredCount} đơn
              </span>
            </div>
          </div>
        </div>

        {/* Orders Management Table */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#5A4038]/10 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#5A4038]/10">
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
                Danh Sách Đơn Hàng Cần Xử Lý
              </h3>
              <p className="text-xs text-[#5A4038]/70 mt-0.5">
                Nhấp vào nút trạng thái để chuyển bước tiến trình đơn hàng (Thử nghiệm vận hành TMĐT).
              </p>
            </div>

            {/* Filter Status Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#5A4038]/70">Lọc theo trạng thái:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#F7F0E8] border border-[#5A4038]/20 rounded-lg py-1.5 px-3 text-xs text-[#5A4038] focus:outline-none"
              >
                <option value="all">Tất cả đơn hàng</option>
                <option value="placed">Đã đặt hàng</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="preparing">Đang chuẩn bị nến</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="delivered">Đã giao thành công</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F0E8]/70 text-[#5A4038] border-b border-[#5A4038]/10">
                <tr>
                  <th className="py-3 px-4 font-semibold">Mã đơn</th>
                  <th className="py-3 px-4 font-semibold">Khách hàng</th>
                  <th className="py-3 px-4 font-semibold">Sản phẩm</th>
                  <th className="py-3 px-4 font-semibold">Tổng tiền</th>
                  <th className="py-3 px-4 font-semibold">Thanh toán</th>
                  <th className="py-3 px-4 font-semibold">Trạng thái hiện tại</th>
                  <th className="py-3 px-4 font-semibold text-right">Cập nhật tiến độ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5A4038]/10">
                {filteredOrders.map((ord) => {
                  const statusInfo = statusMap[ord.status];
                  return (
                    <tr key={ord.id} className="hover:bg-[#F7F0E8]/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#6F3038]">
                        {ord.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-[#5A4038]">{ord.customerName}</p>
                        <p className="text-[11px] text-[#5A4038]/60">{ord.customerPhone}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        {ord.items.map((i) => (
                          <div key={i.id} className="line-clamp-1 text-[#5A4038]/85">
                            • {i.name} (x{i.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#6F3038] tabular-nums">
                        {formatVND(ord.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[10px] font-semibold text-[#8B4A4F]">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`py-1 px-2.5 rounded-full font-bold text-[10px] ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {ord.status !== 'delivered' ? (
                          <button
                            onClick={() => handleNextStatus(ord.id, ord.status)}
                            className="py-1 px-3 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] rounded-md text-[11px] font-medium transition-colors"
                          >
                            Chuyển bước tiếp →
                          </button>
                        ) : (
                          <span className="text-emerald-700 text-[11px] font-semibold flex items-center justify-end gap-1">
                            <CheckCircle size={13} />
                            Hoàn tất
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products in store overview */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#5A4038]/10 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#5A4038]/10">
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#6F3038]">
                Sản Phẩm Đang Bán ({PRODUCTS.length} mẫu nến)
              </h3>
              <p className="text-xs text-[#5A4038]/70 mt-0.5">
                Các dòng nến vỏ sò, sao biển, hoa sen, cá voi và combo quà tặng.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs text-[#8B4A4F] hover:underline font-semibold"
            >
              Xem giao diện cửa hàng →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {PRODUCTS.slice(0, 5).map((p) => (
              <div key={p.id} className="p-3 bg-[#F7F0E8]/40 rounded-xl border border-[#5A4038]/10 text-xs">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-2"
                  referrerPolicy="no-referrer"
                />
                <p className="font-semibold text-[#5A4038] line-clamp-1">{p.name}</p>
                <p className="font-bold text-[#6F3038] mt-1 tabular-nums">{formatVND(p.price)}</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Tồn kho xưởng: {p.stock} bé</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
