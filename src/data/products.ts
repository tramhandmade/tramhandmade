    scentNotes: {
      top: 'Sữa tươi ấm, Hạnh nhân nướng',
      heart: 'Hoa hồng ngọt ngào, Vani kem bơ',
      base: 'Kẹo caramel mềm, Xạ hương phấn',
    },
    ingredients: 'Sáp đậu nành tự nhiên, chi tiết hoa sáp thủ công tỉ mỉ',
    dimensions: '8.5 x 7.5 x 9.5 cm',
    burnTime: '30 – 35 giờ',
    weight: '200g',
    stock: 25,
    isFeatured: true,
  },
  {
    id: 'sp-51',
    name: 'Nến Cốc Hoa Sáp Nổi Nghệ Thuật',
    slug: 'nen-coc-hoa-sap-noi-nghe-thuat',
    price: 179000,
    originalPrice: 215000,
    category: 'flower',
    categoryName: 'Nến hoa',
    rating: 5.0,
    reviewCount: 48,
    image: '/src/assets/images/floating_wax_flowers_1791214174633.jpg',
    gallery: [
      '/src/assets/images/floating_wax_flowers_1791214174633.jpg',
    ],
    badge: 'Yêu thích',
    shortDescription: 'Cốc thủy tinh trong suốt với tầng hoa mẫu đơn và hoa hồng sáp nổi bồng bềnh trên mặt nước nến, hương thơm đài các.',
    description: 'Tuyệt tác nghệ thuật cắm hoa sáp trên nền nến thơm. Các đóa hoa mẫu đơn và nụ hồng hé nở mềm mại nổi trên bề mặt sáp, khi thắp lên tỏa hương thơm sang trọng của một khu vườn hoa nước Pháp.',
    scentNotes: {
      top: 'Quả mọng đỏ, Vỏ cam hương',
      heart: 'Hoa mẫu đơn Pháp, Hoa hồng Damask, Hoa nhài',
      base: 'Gỗ hồng mộc, Xạ hương tuyết',
    },
    ingredients: 'Cốc thủy tinh chịu nhiệt cao cấp, sáp đậu nành, hoa sáp điêu khắc nổi',
    dimensions: 'Đường kính 8 cm x Cao 8.5 cm',
    burnTime: '35 – 40 giờ',
    weight: '290g',
    stock: 22,
    isFeatured: true,
  }
];


// Resolve both the main image and gallery images to Vite-generated URLs.
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => ({
  ...product,
  image: resolveProductImage(product.image),
  gallery: (product.gallery ?? []).map(resolveProductImage),
}));

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'seashell', name: 'Nến Vỏ Sò & Vỏ Ốc' },
  { id: 'sculpture', name: 'Nến Tạo Hình' },
  { id: 'gift', name: 'Nến Quà Tặng' },
  { id: 'gift-set', name: 'Set Quà Tặng' },
  { id: 'holiday-set', name: 'Quà Tặng Theo Dịp' },
  { id: 'tray-accessories', name: 'Khay & Phụ Kiện' },
  { id: 'custom', name: 'Nến Thiết Kế Riêng' },
];

export const GIFT_OCCASIONS = [
  {
    id: 'valentine',
    title: 'Valentine – Love Candle Gift',
    subtitle: 'Hương thơm ngọt ngào cho giây phút lãng mạn lứa đôi',
    recommended: 'sp-36',
    tagline: 'Hộp quà nến trái tim & hoa hồng kèm thiệp tình yêu'
  },
  {
    id: 'women-day',
    title: '8/3 & 20/10 – Blooming Gift',
    subtitle: 'Tôn vinh phái đẹp với những đóa hoa nến ngát hương',
    recommended: 'sp-37',
    tagline: 'Set nến hoa pastel thanh lịch kèm thiệp chúc mừng'
  },
  {
    id: 'teacher-day',
    title: '20/11 – Thank You Teacher',
    subtitle: 'Gửi trọn lòng tri ân sâu sắc đến người thầy, người cô',
    recommended: 'sp-38',
    tagline: 'Thiết kế thanh tao trang nhã với hương trà xô thơm'
  },
  {
    id: 'christmas',
    title: 'Noel – Christmas Candle Box',
    subtitle: 'Ấm áp mùa đông với hương gỗ thông và quế thanh',
    recommended: 'sp-39',
    tagline: 'Phụ kiện Noel, nơ ruy băng xanh và cam sấy'
  },
  {
    id: 'birthday',
    title: 'Sinh Nhật – Birthday Gift Box',
    subtitle: 'Lời chúc ngọt ngào và rạng rỡ tuổi mới',
    recommended: 'sp-10',
    tagline: 'Cốc gấu teddy ôm bóng bay trái tim kèm thiệp chúc mừng'
  },
  {
    id: 'anniversary',
    title: 'Kỷ Niệm – Anniversary Gift',
    subtitle: 'Giữ ấm ngọn lửa tình yêu theo năm tháng bền lâu',
    recommended: 'sp-34',
    tagline: 'Bộ nến đôi hòa quyện thắt nơ nhung sang trọng'
  }
];
