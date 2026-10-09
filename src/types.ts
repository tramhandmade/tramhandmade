export type ProductCategory = 
  | 'all'
  | 'seashell'
  | 'sculpture'
  | 'gift'
  | 'gift-set'
  | 'holiday-set'
  | 'tray-accessories'
  | 'custom'
  | 'starfish'
  | 'animal'
  | 'flower'
  | 'tray'
  | 'jar'
  | 'mermaid'
  | 'ocean'
  | 'decor';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  categoryName: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: 'Bán chạy' | 'Mới' | 'Yêu thích' | 'Thủ công';
  shortDescription: string;
  description: string;
  scentNotes: {
    top: string;
    heart: string;
    base: string;
  };
  ingredients: string;
  dimensions: string;
  burnTime: string;
  weight: string;
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedScent?: string;
  customDetails?: {
    mold: string;
    color: string;
    scent: string;
    accessories: string[];
    message?: string;
    packaging: string;
  };
}

export type OrderStatus = 
  | 'placed'        // Đã đặt hàng
  | 'confirmed'     // Đã xác nhận
  | 'preparing'     // Đang chuẩn bị (đúc nến thủ công)
  | 'shipping'      // Đang giao
  | 'delivered';    // Đã giao

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'cod' | 'banking' | 'momo';
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  image: string;
}

export interface CustomCandleOption {
  id: string;
  name: string;
  description?: string;
  priceOffset: number;
  image?: string;
  colorHex?: string;
}
