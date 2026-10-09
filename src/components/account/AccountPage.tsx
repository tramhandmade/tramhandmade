import React, { useState } from 'react';
import { User, Heart, Package, LogIn, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const AccountPage: React.FC = () => {
  const {
    wishlistIds,
    toggleWishlist,
    addToCart,
    viewProductDetail,
    formatVND,
    orders,
    setCurrentTrackedOrder,
    setCurrentView,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('wishlist');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sample customer info
  const [userProfile, setUserProfile] = useState({
    name: 'Lưu Ngọc Mai',
    email: 'luungocmai@gmail.com',
    phone: '0901234567',
    address: 'Số 18, Đường Hoa Hồng, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh',
  });

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleTrackOrder = (ord: typeof orders[0]) => {
    setCurrentTrackedOrder(ord);
    setCurrentView('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#5A4038]/10">
          <div>
            <span className="text-xs font-semibold text-[#8B4A4F] uppercase tracking-widest block mb-1">
              Trung Tâm Khách Hàng
            </span>
            <h1 className="font-serif-heading text-3xl font-bold text-[#6F3038]">
              Tài Khoản & Danh Sách Yêu Thích
            </h1>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E9D5D0] text-[#6F3038] font-bold flex items-center justify-center text-sm">
                LM
              </div>
              <div>
                <p className="text-xs font-bold text-[#5A4038]">{userProfile.name}</p>
                <p className="text-[11px] text-[#5A4038]/60">{userProfile.email}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="py-2 px-4 bg-[#6F3038] text-[#FFFDF9] rounded-lg text-xs font-semibold"
            >
              Đăng nhập tài khoản
            </button>
          )}
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-[#5A4038]/10 space-x-6 sm:space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 relative ${
              activeTab === 'wishlist' ? 'text-[#6F3038]' : 'text-[#5A4038]/60 hover:text-[#5A4038]'
            }`}
          >
            <Heart size={16} className={wishlistIds.length > 0 ? 'fill-[#8B4A4F] text-[#8B4A4F]' : ''} />
            <span>Sản Phẩm Yêu Thích ({wishlistIds.length})</span>
            {activeTab === 'wishlist' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 relative ${
              activeTab === 'orders' ? 'text-[#6F3038]' : 'text-[#5A4038]/60 hover:text-[#5A4038]'
            }`}
          >
            <Package size={16} />
            <span>Lịch Sử Đơn Hàng ({orders.length})</span>
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 relative ${
              activeTab === 'profile' ? 'text-[#6F3038]' : 'text-[#5A4038]/60 hover:text-[#5A4038]'
            }`}
          >
            <User size={16} />
            <span>Thông Tin Cá Nhân</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F3038]" />
            )}
          </button>
        </div>

        {/* TAB 1: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {wishlistedProducts.length === 0 ? (
              <div className="py-16 text-center bg-[#F7F0E8]/40 rounded-2xl border border-[#5A4038]/10 p-6">
                <Heart size={32} className="mx-auto text-[#8B4A4F]/60 mb-3" />
                <h3 className="font-serif-heading text-lg font-bold text-[#5A4038]">
                  Bạn chưa lưu sản phẩm nến nào
                </h3>
                <p className="text-xs text-[#5A4038]/70 mt-1 max-w-sm mx-auto mb-6">
                  Khi xem sản phẩm, hãy nhấn vào biểu tượng trái tim để lưu lại những ngọn nến bạn yêu thích nhé.
                </p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="py-2.5 px-6 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold rounded-lg hover:bg-[#5A4038]"
                >
                  Khám phá cửa hàng ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-[#F7F0E8] overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => viewProductDetail(product)}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#FFFDF9]/90 text-rose-600 hover:bg-[#FFFDF9] shadow-xs"
                        title="Xóa khỏi yêu thích"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] text-[#8B4A4F]">{product.categoryName}</span>
                        <h4
                          onClick={() => viewProductDetail(product)}
                          className="font-serif-heading text-sm font-bold text-[#5A4038] hover:text-[#6F3038] cursor-pointer mt-0.5 line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#6F3038] mt-1 tabular-nums">
                          {formatVND(product.price)}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#5A4038]/10">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 px-3 bg-[#6F3038] hover:bg-[#5A4038] text-[#FFFDF9] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag size={14} />
                          <span>Thêm vào giỏ hàng</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#5A4038]/10 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#5A4038]/60">Mã đơn hàng:</span>
                      <span className="font-mono text-sm font-bold text-[#6F3038]">{ord.id}</span>
                      <span className="text-xs text-[#5A4038]/60">· {ord.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs py-1 px-3 rounded-full bg-[#E9D5D0] text-[#6F3038] font-bold">
                      {ord.status === 'placed' && 'Đã đặt hàng'}
                      {ord.status === 'confirmed' && 'Đã xác nhận'}
                      {ord.status === 'preparing' && 'Đang chuẩn bị nến'}
                      {ord.status === 'shipping' && 'Đang giao hàng'}
                      {ord.status === 'delivered' && 'Đã giao thành công'}
                    </span>

                    <button
                      onClick={() => handleTrackOrder(ord)}
                      className="py-1 px-3 border border-[#6F3038] text-[#6F3038] hover:bg-[#6F3038] hover:text-[#FFFDF9] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Chi tiết</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {ord.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-[#F7F0E8] border border-[#5A4038]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#5A4038] line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-[#5A4038]/70">Số lượng: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-[#6F3038] tabular-nums">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#5A4038]/10 flex items-center justify-between text-xs text-[#5A4038]">
                  <span>Địa chỉ: {ord.customerAddress}</span>
                  <div className="text-right">
                    <span>Tổng thanh toán: </span>
                    <strong className="text-sm text-[#6F3038] tabular-nums">{formatVND(ord.total)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#FFFDF9] border border-[#5A4038]/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif-heading text-xl font-bold text-[#6F3038]">
              Thông Tin Khách Hàng
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4038] mb-1">
                  Địa chỉ nhận hàng mặc định
                </label>
                <input
                  type="text"
                  value={userProfile.address}
                  onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#5A4038]/20 rounded-lg p-2.5 text-xs text-[#5A4038]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Đã cập nhật thông tin cá nhân thành công!')}
                  className="py-2.5 px-6 bg-[#6F3038] text-[#FFFDF9] text-xs font-semibold rounded-lg hover:bg-[#5A4038] transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
