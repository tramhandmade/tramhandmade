import React from 'react';
import { Flame, Wind, PackageCheck, Palette } from 'lucide-react';

export const BrandCommitmentSection: React.FC = () => {
  const commitments = [
    {
      icon: Flame,
      title: 'Nến Làm Thủ Công',
      description: 'Mỗi chiếc nến đều được nghệ nhân rót tay từng mẻ nhỏ từ 100% sáp thực vật tự nhiên, an toàn cho hô hấp.',
    },
    {
      icon: Wind,
      title: 'Mùi Hương Tuyển Chọn',
      description: 'Tinh dầu thơm chuẩn quốc tế IFRA, phối trộn 3 tầng hương tinh tế giúp xoa dịu căng thẳng và chữa lành tâm trí.',
    },
    {
      icon: PackageCheck,
      title: 'Đóng Gói Chỉn Chu',
      description: 'Hộp quà giấy kraft mộc mạc, thắt nơ nhung burgundy tinh xảo, bọc chống sốc kỹ lưỡng kèm thiệp viết tay theo yêu cầu.',
    },
    {
      icon: Palette,
      title: 'Thiết Kế Theo Yêu Cầu',
      description: 'Cho phép khách hàng tự do chọn khuôn, pha màu, đổi hương và khắc tên riêng để tạo nên món quà mang đậm dấu ấn cá nhân.',
    },
  ];

  return (
    <section className="py-14 bg-[#FFFDF9] border-b border-[#5A4038]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start p-5 rounded-xl bg-[#F7F0E8]/40 border border-[#5A4038]/10 hover:bg-[#F7F0E8] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E9D5D0] text-[#6F3038] flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif-heading text-base font-bold text-[#6F3038] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A4038]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
