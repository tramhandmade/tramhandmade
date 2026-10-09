import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Article, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/articles';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ShopContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;
  viewProductDetail: (product: Product) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedScent?: string, customDetails?: CartItem['customDetails']) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  voucherCode: string;
  applyVoucher: (code: string) => { success: boolean; message: string };
  total: number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders & Tracking
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  currentTrackedOrder: Order | null;
  setCurrentTrackedOrder: (order: Order | null) => void;

  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast feedback
  toasts: Toast[];
  showToast: (message: string) => void;

  // Format currency helper
  formatVND: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'TR-84920',
    customerName: 'Lưu Ngọc Mai',
    customerPhone: '0901234567',
    customerEmail: 'luungocmai@gmail.com',
    customerAddress: 'Số 18, Đường Hoa Hồng, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh',
    notes: 'Vui lòng gọi trước khi giao, đóng gói cẩn thận giúp mình nhé!',
    items: [
      {
        id: 'cart-init-1',
        productId: 'sp-01',
        name: 'Nến Vỏ Sò Xanh Biển',
        price: 129000,
        image: '/src/assets/images/scallop_sand_ocean_1791133416209.jpg',
        quantity: 2,
        selectedScent: 'Muối biển, Cam Bergamot',
      },
      {
        id: 'cart-init-2',
        productId: 'sp-10',
        name: 'Nến Gấu Teddy Quà Tặng',
        price: 159000,
        image: '/src/assets/images/teddy_pink_pot_1791133518314.jpg',
        quantity: 1,
        selectedScent: 'Vani Bourbon Madagascar',
      },
    ],
    subtotal: 417000,
    shippingFee: 0,
    discount: 20000,
    total: 397000,
    shippingMethod: 'standard',
    paymentMethod: 'cod',
    status: 'shipping',
    createdAt: '03/10/2026 14:30',
    estimatedDelivery: '05/10/2026',
  },
  {
    id: 'TR-1082',
    customerName: 'Trần Hoàng Nam',
    customerPhone: '0987654321',
    customerEmail: 'hoangnam@gmail.com',
    customerAddress: 'Số 45 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    notes: 'Giao trong giờ hành chính',
    items: [
      {
        id: 'cart-init-3',
        productId: 'sp-14',
        name: 'Combo Quà Tặng Trạm – Bình Yên',
        price: 299000,
        image: '/src/assets/images/product_bear_gift_1791132506453.jpg',
        quantity: 1,
      },
    ],
    subtotal: 299000,
    shippingFee: 30000,
    discount: 0,
    total: 329000,
    shippingMethod: 'express',
    paymentMethod: 'banking',
    status: 'delivered',
    createdAt: '01/10/2026 09:15',
    estimatedDelivery: '03/10/2026',
  },
  {
    id: 'TR-2026',
    customerName: 'Lê Thảo Vy',
    customerPhone: '0912334455',
    customerEmail: 'thaovy.le@gmail.com',
    customerAddress: 'Căn hộ B12 Sunview Town, Thủ Đức, TP. Hồ Chí Minh',
    notes: 'Khắc chữ trên thẻ gỗ: Happy 2nd Anniversary',
    items: [
      {
        id: 'cart-init-4',
        productId: 'sp-15',
        name: 'Nến Tự Phối - Khuôn Vỏ Sò Nghệ Thuật',
        price: 214000,
        image: '/src/assets/images/product_seashell_ocean_1791132471945.jpg',
        quantity: 1,
        customDetails: {
          mold: 'Khuôn Vỏ Sò Nghệ Thuật',
          color: 'Xanh Biển Dịu',
          scent: 'Breeze of Ocean (Muối Biển & Xô Thơm)',
          accessories: ['Vỏ ốc & Sao biển thật tuyển chọn', 'Vảy vàng 24k trang trí mặt nến'],
          message: 'Happy 2nd Anniversary ♥',
          packaging: 'Hộp Kraft mộc thắt nơ nhung đỏ burgundy',
        },
      },
    ],
    subtotal: 214000,
    shippingFee: 30000,
    discount: 0,
    total: 244000,
    shippingMethod: 'standard',
    paymentMethod: 'momo',
    status: 'preparing',
    createdAt: '04/10/2026 08:20',
    estimatedDelivery: '06/10/2026',
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tram_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tram_wishlist');
      return saved ? JSON.parse(saved) : ['sp-01', 'sp-06'];
    } catch {
      return ['sp-01', 'sp-06'];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tram_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [currentTrackedOrder, setCurrentTrackedOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tram_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tram_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('tram_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type: 'success' }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedScent?: string,
    customDetails?: CartItem['customDetails']
  ) => {
    setCart((prev) => {
      // For custom candle, always add as distinct item
      if (customDetails) {
        return [
          ...prev,
          {
            id: `custom-${Date.now()}`,
            productId: product.id,
            name: `${product.name} (${customDetails.mold})`,
            price: product.price,
            image: product.image,
            quantity,
            selectedScent: customDetails.scent,
            customDetails,
          },
        ];
      }

      // Check standard item duplicate
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedScent === selectedScent && !item.customDetails
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: `item-${Date.now()}-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          selectedScent: selectedScent || product.scentNotes.top.split(',')[0],
        },
      ];
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa sản phẩm khỏi giỏ');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Đã lưu vào danh sách yêu thích');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping threshold: 300,000 VND
  const rawShippingFee = subtotal >= 300000 || subtotal === 0 ? 0 : 30000;
  const shippingFee = voucherCode.toUpperCase() === 'FREESHIP' ? 0 : rawShippingFee;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyVoucher = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'Vui lòng nhập mã giảm giá' };
    }
    if (trimmed === 'TRAMYEU') {
      setVoucherCode(trimmed);
      setDiscount(20000);
      return { success: true, message: 'Áp dụng thành công: Giảm 20.000đ cho đơn hàng!' };
    }
    if (trimmed === 'FREESHIP') {
      setVoucherCode(trimmed);
      return { success: true, message: 'Áp dụng thành công: Miễn phí vận chuyển toàn quốc!' };
    }
    if (trimmed === 'TRAM10') {
      const discountValue = Math.round(subtotal * 0.1);
      setVoucherCode(trimmed);
      setDiscount(discountValue);
      return { success: true, message: `Áp dụng thành công: Giảm 10% (-${formatVND(discountValue)})!` };
    }
    return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' };
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => {
    const orderId = `TR-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const estDate = new Date();
    estDate.setDate(now.getDate() + 3);

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'placed',
      createdAt: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      estimatedDelivery: `${String(estDate.getDate()).padStart(2, '0')}/${String(estDate.getMonth() + 1).padStart(2, '0')}/${estDate.getFullYear()}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setCurrentTrackedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Đã cập nhật trạng thái đơn ${orderId}`);
  };

  const formatVND = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        selectedArticle,
        setSelectedArticle,
        viewProductDetail,

        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        shippingFee,
        discount,
        voucherCode,
        applyVoucher,
        total,

        wishlistIds,
        toggleWishlist,
        isWishlisted,

        orders,
        addOrder,
        updateOrderStatus,
        currentTrackedOrder,
        setCurrentTrackedOrder,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,

        toasts,
        showToast,

        formatVND,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
