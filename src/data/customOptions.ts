export interface CustomMold {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CustomColor {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface CustomScent {
  id: string;
  name: string;
  description: string;
  notes: string;
}

export interface CustomAccessory {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CustomPackaging {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const CUSTOM_MOLDS: CustomMold[] = [
  {
    id: 'mold-seashell',
    name: 'Khuôn Vỏ Sò Nghệ Thuật',
    price: 159000,
    description: 'Dáng vỏ sò tự nhiên lớn với rãnh khía sắc nét mang phong vị đại dương tươi mát.',
    image: '/src/assets/images/scallop_sand_ocean_1791133416209.jpg',
  },
  {
    id: 'mold-starfish',
    name: 'Khuôn Sao Biển Cát',
    price: 149000,
    description: 'Tạo hình sao biển 5 cánh nổi bật với bề mặt viền sóng hữu cơ tinh xảo.',
    image: '/src/assets/images/starfish_pastel_shells_1791133619709.jpg',
  },
  {
    id: 'mold-whale',
    name: 'Khuôn Chú Cá Voi Xanh',
    price: 139000,
    description: 'Chú cá voi bơi lội đáng yêu trên đế gỗ mộc, biểu tượng của sự bình yên và dịu lành.',
    image: '/src/assets/images/product_whale_candle_1791132496106.jpg',
  },
  {
    id: 'mold-bear',
    name: 'Khuôn Gấu Teddy Cốc Hồng',
    price: 169000,
    description: 'Chú gấu lông xù ngọt ngào đứng trong cốc hồng, ôm bóng bay trái tim quà tặng.',
    image: '/src/assets/images/teddy_pink_pot_1791133518314.jpg',
  },
  {
    id: 'mold-mermaid',
    name: 'Khuôn Đuôi Cá Nàng Tiên',
    price: 159000,
    description: 'Đuôi cá nàng tiên uốn lượn lặn sâu giữa các hạt cườm ngọc trai và sao biển.',
    image: '/src/assets/images/mermaid_starfish_dish_1791133441887.jpg',
  },
  {
    id: 'mold-lotus',
    name: 'Khuôn Hoa Sen Nở Cánh',
    price: 149000,
    description: 'Bông hoa sen xếp lớp cánh mềm mại thanh tịnh, truyền cảm hứng bình an.',
    image: '/src/assets/images/product_floral_lotus_1791132519065.jpg',
  },
  {
    id: 'mold-glass-ocean',
    name: 'Ly Thủy Tinh Quấn Dây Thừng',
    price: 189000,
    description: 'Ly thủy tinh nhìn thấu cát biển, quấn dây thừng mộc và vỏ sò charm vintage.',
    image: '/src/assets/images/glass_jar_ocean_rope_1791133530908.jpg',
  },
];

export const CUSTOM_COLORS: CustomColor[] = [
  {
    id: 'color-ocean-blue',
    name: 'Xanh Biển Dịu',
    hex: '#7FA9B5',
    description: 'Tông xanh lam nhạt như làn nước biển buổi sớm mai thanh khiết.',
  },
  {
    id: 'color-terracotta',
    name: 'Hồng Đất Mộc',
    hex: '#D99B95',
    description: 'Sắc hồng đất ấm áp, mang lại cảm giác chở che và vỗ về.',
  },
  {
    id: 'color-ivory-cream',
    name: 'Kem Ngà Tự Nhiên',
    hex: '#F7F0E8',
    description: 'Màu sáp đậu nành tự nhiên nguyên bản, tao nhã và thuần khiết.',
  },
  {
    id: 'color-deep-ocean',
    name: 'Xanh Đại Dương Thẳm',
    hex: '#3E667B',
    description: 'Màu biển sâu thẳm tĩnh mịch, tạo chiều sâu thị giác độc đáo.',
  },
  {
    id: 'color-lavender',
    name: 'Tím Oải Hương Nhạt',
    hex: '#C5B6CC',
    description: 'Sắc tím nhạt mộng mơ mang đến cảm xúc nhẹ nhàng thư thái.',
  },
  {
    id: 'color-warm-chocolate',
    name: 'Nâu Cà Phê Ấm',
    hex: '#8D6E63',
    description: 'Tông màu đất nung mộc mạc, đậm chất vintage cổ điển.',
  },
];

export const CUSTOM_SCENTS: CustomScent[] = [
  {
    id: 'scent-ocean-breeze',
    name: 'Breeze of Ocean (Muối Biển & Xô Thơm)',
    description: 'Thanh mát, sảng khoái như đang dạo bước trên bãi cát trắng đón gió lộng.',
    notes: 'Muối biển · Xô thơm · Gỗ lũa',
  },
  {
    id: 'scent-english-pear',
    name: 'English Pear & Freesia (Lê Anh & Lan Nam Phi)',
    description: 'Ngọt thanh hoa quả chín mọng và hoa trắng tinh tế, phong cách quý cô tao nhã.',
    notes: 'Quả lê giòn · Hoa lan trắng · Hoắc hương',
  },
  {
    id: 'scent-sandalwood',
    name: 'Warm Sandalwood (Gỗ Đàn Hương & Hổ Phách)',
    description: 'Ấm cúng, sâu lắng và tĩnh tâm, tạo bầu không khí thư giãn tuyệt đối buổi tối.',
    notes: 'Gỗ đàn hương · Hổ phách ấm · Tuyết tùng',
  },
  {
    id: 'scent-vanilla-butter',
    name: 'Sweet Vanilla & Butter (Vani Bơ Ngọt Ngào)',
    description: 'Ngọt béo như một mẻ bánh vừa nướng ra lò, khơi gợi cảm giác an toàn và hạnh phúc.',
    notes: 'Vani Bourbon · Bơ sữa ngọt · Hạnh nhân nướng',
  },
  {
    id: 'scent-lavender-dream',
    name: 'Lavender Sleep (Oải Hương Dịu Êm)',
    description: 'Mùi hương thảo mộc trứ danh giúp làm dịu hệ thần kinh và đưa vào giấc ngủ ngon.',
    notes: 'Hoa oải hương · Cúc La Mã · Gỗ trắng',
  },
];

export const CUSTOM_ACCESSORIES: CustomAccessory[] = [
  {
    id: 'acc-real-shells',
    name: 'Vỏ ốc & Sao biển thật tuyển chọn',
    price: 15000,
    description: 'Bộ vỏ ốc biển và sao biển mini tự nhiên làm sạch gắn trên sáp.',
  },
  {
    id: 'acc-pearls',
    name: 'Hạt ngọc trai nghệ thuật',
    price: 15000,
    description: 'Ngọc trai nhân tạo phủ bóng ánh xà cừ chịu nhiệt an toàn.',
  },
  {
    id: 'acc-gold-leaf',
    name: 'Vảy vàng 24k trang trí mặt nến',
    price: 20000,
    description: 'Lá vàng thực phẩm lấp lánh sang trọng tan chảy êm ái cùng sáp.',
  },
  {
    id: 'acc-dried-flowers',
    name: 'Cánh hoa hồng & hoa cúc khô',
    price: 15000,
    description: 'Hoa khô tự nhiên giữ trọn sắc tố và hương thơm thực vật mộc.',
  },
  {
    id: 'acc-cinnamon',
    name: 'Quế thanh & Cam sấy thái lát',
    price: 20000,
    description: 'Điểm nhấn đậm chất mộc ấm cúng cho mùa thu đông.',
  },
];

export const CUSTOM_PACKAGING: CustomPackaging[] = [
  {
    id: 'pack-kraft',
    name: 'Hộp Kraft mộc thắt nơ nhung đỏ burgundy',
    price: 25000,
    description: 'Hộp giấy cứng kraft thân thiện môi trường, thắt ruy băng nhung burgundy quý phái.',
  },
  {
    id: 'pack-transparent',
    name: 'Hộp mica trong suốt kèm đèn LED đom đóm',
    price: 45000,
    description: 'Hộp trong suốt khoe trọn tác phẩm nến kèm dây đèn đom đóm lấp lánh lung linh.',
  },
  {
    id: 'pack-simple-bag',
    name: 'Túi giấy canvas mộc của Trạm (Miễn phí)',
    price: 0,
    description: 'Đóng gói bọc giấy chống sốc gọn gàng kèm túi giấy quai xách mộc mạc.',
  },
];
