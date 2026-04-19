const API_BASE = 'https://driver-uenm.cfd/api';

const REGIONS = {
  north: ['Hà Nội', 'Hải Phòng', 'Hải Dương', 'Hưng Yên', 'Thái Bình', 'Hà Nam', 'Nam Định', 'Ninh Bình', 'Vĩnh Phúc', 'Bắc Ninh', 'Quảng Ninh', 'Lạng Sơn', 'Cao Bằng', 'Bắc Kạn', 'Thái Nguyên', 'Tuyên Quang', 'Hà Giang', 'Lào Cai', 'Yên Bái', 'Lai Châu', 'Điện Biên', 'Sơn La', 'Hòa Bình', 'Phú Thọ', 'Bắc Giang'],
  central: ['Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Thừa Thiên - Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng'],
  south: ['TP. Hồ Chí Minh', 'Bình Dương', 'Đồng Nai', 'Long An', 'Tiền Giang', 'Bà Rịa - Vũng Tàu', 'Bà Rịa-Vũng Tàu', 'Tây Ninh', 'Bình Phước', 'Cần Thơ', 'An Giang', 'Kiên Giang', 'Đồng Tháp', 'Vĩnh Long', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau', 'Bến Tre', 'Trà Vinh'],
};

const ALL_PROVINCES = [...new Set([...REGIONS.north, ...REGIONS.central, ...REGIONS.south])];
const REQUESTS_CACHE_KEY = 'local_requests_cache_v2';

const HTML_DRIVERS = [
  { name: 'Tài xế 6', phone: '032 xxxx 415', route: 'Cầu Giấy ⇄ Hưng Yên', avatar: 'https://driver-uenm.vercel.app/assets/z7062668584897_e5c2ed5020cd2b90921cdd893caba47a-BBqvol0J.jpg', region: 'north' },
  { name: 'Tài xế 5', phone: '088 xxxx 121', route: 'Hà Nội ⇄ Nam Định', avatar: 'https://driver-uenm.vercel.app/assets/z7051375393488_5e5f019e86dc98d4334a1c765ce911d4-DBY6nJ1-.jpg', region: 'north' },
  { name: 'Tài xế 4', phone: '077 xxxx 349', route: 'Mỹ Đình ⇄ Nội Bài', avatar: 'https://driver-uenm.vercel.app/assets/z7062668656409_8e28337ee69d5d76530cbadb795340ee-Bm6VBwLG.jpg', region: 'north' },
  { name: 'Tài xế 3', phone: '084 xxxx 330', route: 'Hà Nội ⇄ Bắc Ninh', avatar: 'https://driver-uenm.vercel.app/assets/z7051375359431_55334752bc044f51f50bb7d28b6ae5c9-DvCzgWKg.jpg', region: 'north' },
  { name: 'Tài xế 2', phone: '092 xxxx 610', route: 'Hà Nội ⇄ Hải Dương', avatar: 'https://driver-uenm.vercel.app/assets/z7062668517282_54f02c8079d34160fba36135f63d76e7-BkO7Mrnp.jpg', region: 'north' },
  { name: 'Tài xế 1', phone: '092 xxxx 274', route: 'Giáp Bát ⇄ Ninh Bình', avatar: 'https://driver-uenm.vercel.app/assets/z7051375407886_39999056318f4140274ec094449664e9-CLTsr9v3.jpg', region: 'north' },
  { name: 'Chị Linh', phone: '035 xxxx 999', route: 'Hà Đông ⇄ Phú Thọ', avatar: 'https://driver-uenm.vercel.app/assets/z7062668683655_c31ff8791f1f519f920b4626b1bfb078-_vZwexdX.jpg', region: 'north' },
  { name: 'Anh Nam', phone: '097 xxxx 456', route: 'Long Biên ⇄ Hạ Long', avatar: 'https://driver-uenm.vercel.app/assets/z7062668724268_6324cea23465d2222acc396f0a0700ef-DbXXvPyK.jpg', region: 'north' },
  { name: 'Anh Hoàng', phone: '096 xxxx 777', route: 'Cầu Giấy ⇄ Hải Phòng', avatar: 'https://driver-uenm.vercel.app/assets/z7062602357606_ad5f2b2efa209539197f5328b5f40cc9-D7AM-BRw.jpg', region: 'north' },
  { name: 'Anh Dũng', phone: '090 xxxx 567', route: 'Mỹ Đình ⇄ Nội Bài', avatar: 'https://driver-uenm.vercel.app/assets/z7051375377233_8b09960f41a31b33ab9d064230632c7a-CeVShB-2.jpg', region: 'north' },
  { name: 'Chị Hạnh', phone: '098 xxxx 321', route: 'Hà Nội ⇄ Ninh Bình', avatar: 'https://driver-uenm.vercel.app/assets/z7062602377742_00c7adb0a0ad63312a284abff17a88e8-BcmH34Bq.jpg', region: 'north' },
  { name: 'Anh Tuấn', phone: '091 xxxx 678', route: 'Hà Nội ⇄ Lào Cai', avatar: 'https://driver-uenm.vercel.app/assets/z7051375399930_43df68359501e5c5a4e4fd8f089dd297-B0J4RXww.jpg', region: 'north' },
  { name: 'Anh Long', phone: '096 xxxx 333', route: 'Quy Nhon <-> Kon Tum', avatar: 'https://driver-uenm.vercel.app/assets/z7062668540624_9480d4b585309d9749dac24605bf6197-Dey8jTPu.jpg', region: 'central' },
  { name: 'Anh Sơn', phone: '093 xxxx 222', route: 'Đà Nẵng <-> Quảng Bình', avatar: 'https://driver-uenm.vercel.app/assets/z7062668663673_2fb68dc15854ad1a1dab297bc8e3def3-SE12i90J.jpg', region: 'central' },
  { name: 'Chị Hà', phone: '092 xxxx 888', route: 'Huế <-> Đà Nẵng', avatar: 'https://driver-uenm.vercel.app/assets/z7051384998410_7e88aec16eb95d1e181161e722ce8f1b-l7npgvPc.jpg', region: 'central' },
  { name: 'Anh Hùng', phone: '097 xxxx 233', route: 'Quy Nhon <-> Pleiku', avatar: 'https://driver-uenm.vercel.app/assets/z7062602257556_b8719a5849303a700b3257a8e3012bb4-Llf5zTz_.jpg', region: 'central' },
  { name: 'Chị Yến', phone: '092 xxxx 781', route: 'Huế <-> Quảng Trị', avatar: 'https://driver-uenm.vercel.app/assets/z7062602298879_e73752e0579b874426e5d1744d393b78-DT58m5M_.jpg', region: 'central' },
  { name: 'Anh Phúc', phone: '090 xxxx 991', route: 'Đà Nẵng <-> Quảng Ngãi', avatar: 'https://driver-uenm.vercel.app/assets/z7062668564925_c326855dc83272d5116876979ab27180-DobQktTD.jpg', region: 'central' },
  { name: 'Anh Thọ', phone: '090 xxxx 234', route: 'Đà Nẵng <-> Quảng Nam', avatar: 'https://driver-uenm.vercel.app/assets/z7062668699662_c4f6c0289de72ec8dfb91ae6dc179d01-CfEyugXb.jpg', region: 'central' },
  { name: 'Anh Tiến', phone: '097 xxxx 111', route: 'Nha Trang <-> Phan Rang', avatar: 'https://driver-uenm.vercel.app/assets/z7051375359431_55334752bc044f51f50bb7d28b6ae5c9-DvCzgWKg.jpg', region: 'central' },
  { name: 'Anh Khoa', phone: '093 xxxx 890', route: 'Đà Nẵng <-> Huế', avatar: 'https://driver-uenm.vercel.app/assets/z7062668607225_6c7568be9de0842233a31ebf94fcd7c3-Da6FiyPg.jpg', region: 'central' },
  { name: 'Anh Minh', phone: '096 xxxx 789', route: 'Nha Trang <-> Đà Lạt', avatar: 'https://driver-uenm.vercel.app/assets/z7051375367540_06e3fe3d8120166b5e07a244e7a3571e-BH5mfry6.jpg', region: 'central' },
  { name: 'Chị Nhi', phone: '092 xxxx 444', route: 'Cần Thơ <-> Kiên Giang', avatar: 'https://driver-uenm.vercel.app/assets/z7062602308491_47290c9368d7ce4b35389881388df126-BkDfzZrd.jpg', region: 'south' },
  { name: 'Anh Lộc', phone: '091 xxxx 899', route: 'Cần Thơ <-> Cà Mau', avatar: 'https://driver-uenm.vercel.app/assets/z7062668642812_392e44a32f32e80bbbf27eabf1cd6c4e-BF97wMwC.jpg', region: 'south' },
  { name: 'Anh Bảo', phone: '097 xxxx 333', route: 'TP HCM <-> Bến Tre', avatar: 'https://driver-uenm.vercel.app/assets/z7062602390663_be30aed63f66d5ebabc16818b210d4a1-DsthORqk.jpg', region: 'south' },
  { name: 'Anh Cường', phone: '098 xxxx 456', route: 'Biên Hòa <-> Long An', avatar: 'https://driver-uenm.vercel.app/assets/z7062668577090_42dca689332b943cff6fcf0282affbde-D2ikiVhq.jpg', region: 'south' },
  { name: 'Chị Trang', phone: '097 xxxx 123', route: 'TP HCM <-> Tây Ninh', avatar: 'https://driver-uenm.vercel.app/assets/z7062668621083_cee3c2b417b1390405f1843bc6747a2f-BTY8j67c.jpg', region: 'south' },
  { name: 'Anh Phát', phone: '096 xxxx 444', route: 'TP HCM <-> Bình Dương', avatar: 'https://driver-uenm.vercel.app/assets/z7062668649550_d523c6e3fea527ad376bd5c7379b6e71-BXVIKLiv.jpg', region: 'south' },
  { name: 'Anh Phương', phone: '093 xxxx 123', route: 'TP HCM <-> Cần Thơ', avatar: 'https://driver-uenm.vercel.app/assets/z7062668675472_811ae7e6ea377fdb6f4cfa47e9073665-gIY4WyYh.jpg', region: 'south' },
  { name: 'Anh Danh', phone: '093 xxxx 333', route: 'TP HCM <-> Tiền Giang', avatar: 'https://driver-uenm.vercel.app/assets/z7051375433234_de014f2a3854199145f85ef65859e932-8SMeoMSn.jpg', region: 'south' },
  { name: 'Anh Việt', phone: '090 xxxx 889', route: 'TP HCM <-> Vĩnh Long', avatar: 'https://driver-uenm.vercel.app/assets/z7062668561135_95234d08acd6d50f85974c6ea79a73b5-D_UUvVL5.jpg', region: 'south' },
  { name: 'Anh Khai', phone: '090 xxxx 789', route: 'TP HCM <-> Vũng Tàu', avatar: 'https://driver-uenm.vercel.app/assets/z7062668711051_d3683c386842cb7af2b9b53c9a060faf-Bir4k82S.jpg', region: 'south' },
].map((d, index) => ({
  _id: `html-driver-${index + 1}`,
  ...d,
  phoneDisplay: d.phone,
}));

const SEEDED_REQUESTS = [
  { name: 'Minh Việt', phone: '0912345678', startPoint: 'Hà Nội', endPoint: 'Hải Phòng', note: 'Xe 4 chỗ nhận khách từ 5h sáng', price: 900000, region: 'north', status: 'waiting' },
  { name: 'Quốc Sơn', phone: '0987654321', startPoint: 'Hà Nội', endPoint: 'Quảng Ninh', note: 'Đi Hạ Long trong ngày, có thể ghép khách', price: 1200000, region: 'north', status: 'waiting' },
  { name: 'Thanh Hương', phone: '0971122334', startPoint: 'Bắc Ninh', endPoint: 'Ninh Bình', note: 'Xe 7 chỗ, chạy sáng và chiều', price: 1100000, region: 'north', status: 'waiting' },
  { name: 'Gia Mạnh', phone: '0962233445', startPoint: 'Hà Nội', endPoint: 'Lào Cai', note: 'Nhận khách tuyến Sa Pa, tối xuất phát', price: 1500000, region: 'north', status: 'waiting' },
  { name: 'Hải Trường', phone: '0945566778', startPoint: 'Hải Dương', endPoint: 'Hà Nội', note: 'Có mặt nhanh trong 30 phút', price: 700000, region: 'north', status: 'waiting' },
  { name: 'Tuấn Dương', phone: '0913456781', startPoint: 'Hà Nội', endPoint: 'Nam Định', note: 'Xe 5 chỗ, chạy khung giờ sáng', price: 850000, region: 'north', status: 'waiting' },
  { name: 'Ngọc Vân', phone: '0982345671', startPoint: 'Hưng Yên', endPoint: 'Hà Nội', note: 'Đón khách quanh Ecopark', price: 500000, region: 'north', status: 'waiting' },
  { name: 'Hoàng Quân', phone: '0973345612', startPoint: 'Hà Nội', endPoint: 'Thái Bình', note: 'Xe 7 chỗ, nhận đi tỉnh trong ngày', price: 1000000, region: 'north', status: 'waiting' },
  { name: 'Đức Hòa', phone: '0967788123', startPoint: 'Hà Nội', endPoint: 'Phú Thọ', note: 'Đưa đón Việt Trì, có thể ghép 2 khách', price: 780000, region: 'north', status: 'waiting' },
  { name: 'Thu Hà', phone: '0904455661', startPoint: 'Hải Phòng', endPoint: 'Quảng Ninh', note: 'Đi Hạ Long, xe 4 chỗ', price: 650000, region: 'north', status: 'waiting' },
  { name: 'Ngọc Tài', phone: '0935566112', startPoint: 'Bắc Giang', endPoint: 'Hà Nội', note: 'Nhận khách về Mỹ Đình mỗi chiều', price: 550000, region: 'north', status: 'waiting' },
  { name: 'Quang Bình', phone: '0919988771', startPoint: 'Lạng Sơn', endPoint: 'Hà Nội', note: 'Xe gia đình, nhận tuyến cố định', price: 1300000, region: 'north', status: 'waiting' },
  { name: 'Phương Nga', phone: '0922233441', startPoint: 'Hà Nội', endPoint: 'Hòa Bình', note: 'Đi sớm, ưu tiên khách ghép', price: 720000, region: 'north', status: 'waiting' },
  { name: 'Khắc Lâm', phone: '0912000001', startPoint: 'Hà Nội', endPoint: 'Bắc Ninh', note: 'Đón khách khu Cầu Giấy, xe 4 chỗ', price: 420000, region: 'north', status: 'waiting' },
  { name: 'Bảo Thủy', phone: '0912000002', startPoint: 'Hà Nội', endPoint: 'Hải Dương', note: 'Đi sáng sớm, còn 2 ghế', price: 680000, region: 'north', status: 'waiting' },
  { name: 'Văn Cảnh', phone: '0912000003', startPoint: 'Hà Nội', endPoint: 'Vĩnh Phúc', note: 'Nhận khách tuyến Nội Bài - Vĩnh Yên', price: 480000, region: 'north', status: 'waiting' },
  { name: 'Minh Hạnh', phone: '0912000004', startPoint: 'Quảng Ninh', endPoint: 'Hà Nội', note: 'Xe 7 chỗ, đi cao tốc', price: 1150000, region: 'north', status: 'waiting' },
  { name: 'Tiến Dũng', phone: '0912000005', startPoint: 'Phú Thọ', endPoint: 'Hà Nội', note: 'Đón khách Việt Trì về Mỹ Đình', price: 760000, region: 'north', status: 'waiting' },
  { name: 'Thanh Mai', phone: '0912000006', startPoint: 'Hà Nội', endPoint: 'Thái Nguyên', note: 'Xe mới, chạy cả ngày', price: 650000, region: 'north', status: 'waiting' },
  { name: 'Gia Khánh', phone: '0912000007', startPoint: 'Bắc Giang', endPoint: 'Bắc Ninh', note: 'Tuyến ngắn, nhận khách ghép', price: 350000, region: 'north', status: 'waiting' },
  { name: 'Bích Lan', phone: '0912000008', startPoint: 'Hà Nội', endPoint: 'Hưng Yên', note: 'Đón khách khu Gia Lâm, Long Biên', price: 380000, region: 'north', status: 'waiting' },
  { name: 'Mạnh Tùng', phone: '0912000009', startPoint: 'Hà Nội', endPoint: 'Hà Nam', note: 'Xe 5 chỗ, nhận khách công tác', price: 520000, region: 'north', status: 'waiting' },
  { name: 'Khánh Yến', phone: '0912000010', startPoint: 'Nam Định', endPoint: 'Hà Nội', note: 'Đi tối, có thể đón dọc cao tốc', price: 820000, region: 'north', status: 'waiting' },
  { name: 'Hoài Nam', phone: '0912000011', startPoint: 'Ninh Bình', endPoint: 'Hà Nội', note: 'Xe 7 chỗ, còn 3 ghế', price: 900000, region: 'north', status: 'waiting' },
  { name: 'Mỹ Quỳnh', phone: '0912000012', startPoint: 'Hải Phòng', endPoint: 'Hà Nội', note: 'Đón nội thành Hải Phòng', price: 880000, region: 'north', status: 'waiting' },
  { name: 'Đình Hậu', phone: '0912000013', startPoint: 'Hà Nội', endPoint: 'Lạng Sơn', note: 'Đi Đồng Đăng trong ngày', price: 1350000, region: 'north', status: 'waiting' },
  { name: 'Bảo Vi', phone: '0912000014', startPoint: 'Thái Bình', endPoint: 'Hà Nội', note: 'Xe 4 chỗ, khởi hành 6h sáng', price: 760000, region: 'north', status: 'waiting' },
  { name: 'Quốc Phong', phone: '0912000015', startPoint: 'Hà Nội', endPoint: 'Cao Bằng', note: 'Tuyến dài, xe 7 chỗ', price: 1850000, region: 'north', status: 'waiting' },
  { name: 'An Mơ', phone: '0912000016', startPoint: 'Hà Nội', endPoint: 'Tuyên Quang', note: 'Nhận khách gia đình, xe rộng', price: 980000, region: 'north', status: 'waiting' },
  { name: 'Hữu Luân', phone: '0912000017', startPoint: 'Hà Nội', endPoint: 'Hà Giang', note: 'Đi tối, còn 2 ghế cuối', price: 1650000, region: 'north', status: 'waiting' },
  { name: 'Ngọc Oanh', phone: '0912000018', startPoint: 'Lào Cai', endPoint: 'Hà Nội', note: 'Tuyến Sa Pa - Nội Bài', price: 1480000, region: 'north', status: 'waiting' },
  { name: 'Văn Toản', phone: '0912000019', startPoint: 'Yên Bái', endPoint: 'Hà Nội', note: 'Đón khách dọc cao tốc Nội Bài - Lào Cai', price: 1120000, region: 'north', status: 'waiting' },
  { name: 'Thu Nhi', phone: '0912000020', startPoint: 'Hà Nội', endPoint: 'Lai Châu', note: 'Xe 7 chỗ, nhận đồ gọn nhẹ', price: 2100000, region: 'north', status: 'waiting' },
  { name: 'Gia Vương', phone: '0912000021', startPoint: 'Điện Biên', endPoint: 'Hà Nội', note: 'Chạy tuyến đêm cố định', price: 2300000, region: 'north', status: 'waiting' },
  { name: 'Mai Phương', phone: '0912000022', startPoint: 'Sơn La', endPoint: 'Hà Nội', note: 'Xe 5 chỗ, đón khách Mộc Châu', price: 1380000, region: 'north', status: 'waiting' },
  { name: 'Quang Hải', phone: '0912000023', startPoint: 'Hòa Bình', endPoint: 'Hà Nội', note: 'Nhận khách đi khám, công tác', price: 620000, region: 'north', status: 'waiting' },
  { name: 'Thảo Tâm', phone: '0912000024', startPoint: 'Bắc Kạn', endPoint: 'Hà Nội', note: 'Xe 7 chỗ, chạy sáng và tối', price: 1420000, region: 'north', status: 'waiting' },
  { name: 'Khôi Minh', phone: '0912000025', startPoint: 'Quảng Ninh', endPoint: 'Hải Phòng', note: 'Tuyến Hạ Long - Hải Phòng', price: 540000, region: 'north', status: 'waiting' },
  { name: 'Thu Giang', phone: '0912000026', startPoint: 'Bắc Ninh', endPoint: 'Hà Nội', note: 'Đón khách khu Yên Phong', price: 390000, region: 'north', status: 'waiting' },
  { name: 'Tiến Đạt', phone: '0912000027', startPoint: 'Hà Nội', endPoint: 'Bắc Giang', note: 'Xe 4 chỗ, nhận khách từ Mỹ Đình', price: 460000, region: 'north', status: 'waiting' },
  { name: 'Ngọc Hòa', phone: '0912000028', startPoint: 'Hà Nội', endPoint: 'Hải Phòng', note: 'Đi cao tốc, còn 1 ghế', price: 920000, region: 'north', status: 'waiting' },
  { name: 'Gia Tân', phone: '0912000029', startPoint: 'Hưng Yên', endPoint: 'Nam Định', note: 'Xe gia đình, chạy linh hoạt', price: 640000, region: 'north', status: 'waiting' },
  { name: 'Mai Bích', phone: '0912000030', startPoint: 'Hà Nội', endPoint: 'Phú Thọ', note: 'Đón khách khu Thanh Xuân, Hà Đông', price: 740000, region: 'north', status: 'waiting' },
  { name: 'Anh Phú', phone: '0936677889', startPoint: 'Đà Nẵng', endPoint: 'Huế', note: 'Xe 5 chỗ chạy liên tục cả ngày', price: 650000, region: 'central', status: 'waiting' },
  { name: 'Chị Lan', phone: '0923344556', startPoint: 'Đà Nẵng', endPoint: 'Quảng Ngãi', note: 'Đón sân bay và nội thành', price: 850000, region: 'central', status: 'waiting' },
  { name: 'Anh Khang', phone: '0915566779', startPoint: 'Nha Trang', endPoint: 'Đà Lạt', note: 'Xe gia đình 7 chỗ, nhận khách ghép', price: 900000, region: 'central', status: 'waiting' },
  { name: 'Anh Huy', phone: '0907788991', startPoint: 'Quy Nhon', endPoint: 'Gia Lai', note: 'Chạy sáng sớm, nhận hàng nhẹ', price: 1000000, region: 'central', status: 'waiting' },
  { name: 'Chị My', phone: '0898899001', startPoint: 'Thanh Hóa', endPoint: 'Nghệ An', note: 'Xe 4 chỗ, chạy tối hằng ngày', price: 600000, region: 'central', status: 'waiting' },
  { name: 'Anh Đức', phone: '0977712345', startPoint: 'Huế', endPoint: 'Quảng Trị', note: 'Xe 7 chỗ, đón khách tại trung tâm', price: 700000, region: 'central', status: 'waiting' },
  { name: 'Chị Ly', phone: '0911223345', startPoint: 'Đà Nẵng', endPoint: 'Quảng Nam', note: 'Đi Hội An, Tam Kỳ đều nhận', price: 500000, region: 'central', status: 'waiting' },
  { name: 'Anh Nam', phone: '0945678912', startPoint: 'Quảng Bình', endPoint: 'Hà Tĩnh', note: 'Xe 5 chỗ, nhận sớm từ 4h30', price: 680000, region: 'central', status: 'waiting' },
  { name: 'Anh Phong', phone: '0934455667', startPoint: 'Gia Lai', endPoint: 'Đắk Lắk', note: 'Xe SUV 7 chỗ, chở gia đình', price: 850000, region: 'central', status: 'waiting' },
  { name: 'Chị Hà', phone: '0903344556', startPoint: 'Khánh Hòa', endPoint: 'Ninh Thuận', note: 'Có thể đón dọc quốc lộ 1A', price: 600000, region: 'central', status: 'waiting' },
  { name: 'Anh Tùng', phone: '0961122789', startPoint: 'Bình Định', endPoint: 'Phú Yên', note: 'Xe 4 chỗ nhận khách du lịch', price: 720000, region: 'central', status: 'waiting' },
  { name: 'Chị Yến', phone: '0988123456', startPoint: 'Kon Tum', endPoint: 'Quảng Ngãi', note: 'Chạy chiều về biển, có ghép khách', price: 1050000, region: 'central', status: 'waiting' },
  { name: 'Anh Khánh', phone: '0916677881', startPoint: 'Đà Nẵng', endPoint: 'Quảng Bình', note: 'Xe 16 chỗ, còn 4 ghế trống', price: 950000, region: 'central', status: 'waiting' },
  { name: 'Chị Trâm', phone: '0975566123', startPoint: 'Lâm Đồng', endPoint: 'Khánh Hòa', note: 'Tuyến Đà Lạt - Nha Trang cả ngày', price: 880000, region: 'central', status: 'waiting' },
  { name: 'Anh Cường', phone: '0927788994', startPoint: 'Thanh Hóa', endPoint: 'Quảng Bình', note: 'Nhận khách gia đình, xe mới', price: 1150000, region: 'central', status: 'waiting' },
  { name: 'Anh Phong', phone: '0919191911', startPoint: 'Đà Nẵng', endPoint: 'Quảng Nam', note: 'Chạy sáng 6h mỗi ngày', price: 520000, region: 'central', status: 'waiting' },
  { name: 'Chị Vy', phone: '0929292922', startPoint: 'Huế', endPoint: 'Quảng Trị', note: 'Xe 4 chỗ, còn 2 ghế trống', price: 580000, region: 'central', status: 'waiting' },
  { name: 'Anh Đức', phone: '0939393933', startPoint: 'Quảng Ngãi', endPoint: 'Bình Định', note: 'Nhận khách dọc quốc lộ 1A', price: 760000, region: 'central', status: 'waiting' },
  { name: 'Chị Hòa', phone: '0949494944', startPoint: 'Phú Yên', endPoint: 'Khánh Hòa', note: 'Xe gia đình 7 chỗ', price: 690000, region: 'central', status: 'waiting' },
  { name: 'Anh Bình', phone: '0959595955', startPoint: 'Gia Lai', endPoint: 'Đắk Lắk', note: 'Tuyến Pleiku - Buôn Ma Thuột', price: 870000, region: 'central', status: 'waiting' },
  { name: 'Chị Ngân', phone: '0969696966', startPoint: 'Kon Tum', endPoint: 'Gia Lai', note: 'Đi trong ngày, nhận khách ghép', price: 500000, region: 'central', status: 'waiting' },
  { name: 'Anh Hậu', phone: '0979797977', startPoint: 'Ninh Thuận', endPoint: 'Bình Thuận', note: 'Xe 5 chỗ, chạy tối', price: 720000, region: 'central', status: 'waiting' },
  { name: 'Chị Kim', phone: '0989898988', startPoint: 'Hà Tĩnh', endPoint: 'Nghệ An', note: 'Đón khách tận nơi nội thành', price: 540000, region: 'central', status: 'waiting' },
  { name: 'Anh Lực', phone: '0901010101', startPoint: 'Thanh Hóa', endPoint: 'Hà Tĩnh', note: 'Xe 7 chỗ, chạy chiều muộn', price: 980000, region: 'central', status: 'waiting' },
  { name: 'Chị Thư', phone: '0912020202', startPoint: 'Khánh Hòa', endPoint: 'Ninh Thuận', note: 'Nha Trang - Phan Rang, còn chỗ', price: 610000, region: 'central', status: 'waiting' },
  { name: 'Anh Nhật', phone: '0923030303', startPoint: 'Đà Nẵng', endPoint: 'Quảng Bình', note: 'Nhận khách sân bay, xe 4 chỗ', price: 1180000, region: 'central', status: 'waiting' },
  { name: 'Chị Yến', phone: '0934040404', startPoint: 'Lâm Đồng', endPoint: 'Đắk Nông', note: 'Tuyến Đà Lạt - Gia Nghĩa', price: 780000, region: 'central', status: 'waiting' },
  { name: 'Anh Quân', phone: '0945050505', startPoint: 'Bình Định', endPoint: 'Quảng Ngãi', note: 'Chạy sáng và tối mỗi ngày', price: 730000, region: 'central', status: 'waiting' },
  { name: 'Chị Liên', phone: '0956060606', startPoint: 'Quảng Nam', endPoint: 'Đà Nẵng', note: 'Đi Hội An - Đà Nẵng liên tục', price: 450000, region: 'central', status: 'waiting' },
  { name: 'Anh Tài', phone: '0967070707', startPoint: 'Đắk Lắk', endPoint: 'Gia Lai', note: 'Xe dịch vụ 7 chỗ', price: 920000, region: 'central', status: 'waiting' },
  { name: 'Anh Phát', phone: '0912348899', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Cần Thơ', note: 'Xe 7 chỗ, nhận khách trong ngày', price: 1300000, region: 'south', status: 'waiting' },
  { name: 'Chị Thảo', phone: '0987766554', startPoint: 'Bình Dương', endPoint: 'TP. Hồ Chí Minh', note: 'Đón khách khu Thủ Dầu Một', price: 450000, region: 'south', status: 'waiting' },
  { name: 'Anh Lâm', phone: '0976655443', startPoint: 'Đồng Nai', endPoint: 'Bà Rịa - Vũng Tàu', note: 'Xe 5 chỗ, chạy sáng sớm', price: 800000, region: 'south', status: 'waiting' },
  { name: 'Chị Hiền', phone: '0965544332', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Tây Ninh', note: 'Nhận khách từ sân bay Tân Sơn Nhất', price: 900000, region: 'south', status: 'waiting' },
  { name: 'Anh Duy', phone: '0934433221', startPoint: 'Cần Thơ', endPoint: 'Kiên Giang', note: 'Xe gia đình 7 chỗ, còn 2 ghế', price: 750000, region: 'south', status: 'waiting' },
  { name: 'Chị Ngọc', phone: '0923322110', startPoint: 'Tiền Giang', endPoint: 'TP. Hồ Chí Minh', note: 'Đi Mỹ Tho - Sài Gòn cả ngày', price: 650000, region: 'south', status: 'waiting' },
  { name: 'Anh Khoa', phone: '0911212121', startPoint: 'Vĩnh Long', endPoint: 'Cần Thơ', note: 'Xe 4 chỗ, nhận khách ghép', price: 420000, region: 'south', status: 'waiting' },
  { name: 'Chị Oanh', phone: '0909091234', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Bến Tre', note: 'Xe 7 chỗ, nhận khách du lịch', price: 950000, region: 'south', status: 'waiting' },
  { name: 'Anh Tín', phone: '0943434343', startPoint: 'An Giang', endPoint: 'Cần Thơ', note: 'Tuyến Châu Đốc - Cần Thơ', price: 700000, region: 'south', status: 'waiting' },
  { name: 'Chị Mai', phone: '0954545454', startPoint: 'Bạc Liêu', endPoint: 'Cà Mau', note: 'Xe 5 chỗ, chạy tối mỗi ngày', price: 600000, region: 'south', status: 'waiting' },
  { name: 'Anh Vũ', phone: '0961112233', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Đồng Nai', note: 'Đón khách khu Thủ Đức', price: 420000, region: 'south', status: 'waiting' },
  { name: 'Chị Hân', phone: '0972223344', startPoint: 'Long An', endPoint: 'TP. Hồ Chí Minh', note: 'Xe 4 chỗ đi về trong ngày', price: 500000, region: 'south', status: 'waiting' },
  { name: 'Anh Kiệt', phone: '0983334455', startPoint: 'Tây Ninh', endPoint: 'Bình Dương', note: 'Nhận khách ghép tuyến cố định', price: 680000, region: 'south', status: 'waiting' },
  { name: 'Chị Diễm', phone: '0994445566', startPoint: 'Bến Tre', endPoint: 'Tiền Giang', note: 'Xe 7 chỗ, còn 3 ghế', price: 360000, region: 'south', status: 'waiting' },
  { name: 'Anh Hào', phone: '0905556677', startPoint: 'Trà Vinh', endPoint: 'Vĩnh Long', note: 'Đi sáng sớm, xe rộng rãi', price: 400000, region: 'south', status: 'waiting' },
  { name: 'Chị Quỳnh', phone: '0916667788', startPoint: 'Kiên Giang', endPoint: 'Cà Mau', note: 'Xe gia đình, nhận khách du lịch', price: 820000, region: 'south', status: 'waiting' },
  { name: 'Anh Nghi', phone: '0927778899', startPoint: 'Sóc Trăng', endPoint: 'Cần Thơ', note: 'Xe 4 chỗ, chạy tối hằng ngày', price: 430000, region: 'south', status: 'waiting' },
  { name: 'Chị Ánh', phone: '0938889900', startPoint: 'Hậu Giang', endPoint: 'An Giang', note: 'Nhận khách nội tỉnh và liên tỉnh', price: 590000, region: 'south', status: 'waiting' },
  { name: 'Anh Phước', phone: '0949990011', startPoint: 'Bình Phước', endPoint: 'TP. Hồ Chí Minh', note: 'Tuyến Đồng Xoài - Sài Gòn', price: 880000, region: 'south', status: 'waiting' },
  { name: 'Chị Tuyền', phone: '0950001122', startPoint: 'Đồng Tháp', endPoint: 'Tiền Giang', note: 'Xe 5 chỗ, còn 2 ghế', price: 470000, region: 'south', status: 'waiting' },
  { name: 'Anh Thành', phone: '0961231234', startPoint: 'Cần Thơ', endPoint: 'Bạc Liêu', note: 'Chạy tuyến miền Tây cả ngày', price: 760000, region: 'south', status: 'waiting' },
  { name: 'Chị Bích', phone: '0972342345', startPoint: 'Cà Mau', endPoint: 'Kiên Giang', note: 'Xe 7 chỗ, nhận khách đoàn nhỏ', price: 840000, region: 'south', status: 'waiting' },
  { name: 'Anh Lễ', phone: '0983453456', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Long An', note: 'Chạy đêm, nhận khách tận nơi', price: 460000, region: 'south', status: 'waiting' },
  { name: 'Chị Sen', phone: '0994564567', startPoint: 'Bà Rịa - Vũng Tàu', endPoint: 'Bình Dương', note: 'Xe mới, đi cao tốc', price: 930000, region: 'south', status: 'waiting' },
  { name: 'Anh Toàn', phone: '0905675678', startPoint: 'Vĩnh Long', endPoint: 'Trà Vinh', note: 'Nhận khách đi chợ nổi và nội thành', price: 390000, region: 'south', status: 'waiting' },
  { name: 'Nguyễn Khánh Duy', phone: '0913001001', startPoint: 'Hà Nội', endPoint: 'Hải Dương', note: 'Xe 5 chỗ, nhận khách từ 6h đến 20h', price: 780000, region: 'north', status: 'waiting' },
  { name: 'Trần Minh Đức', phone: '0913001002', startPoint: 'Hà Nội', endPoint: 'Ninh Bình', note: 'Đi sân bay Nội Bài hoặc nội thành đều được', price: 980000, region: 'north', status: 'waiting' },
  { name: 'Phạm Quang Huy', phone: '0913001003', startPoint: 'Hải Phòng', endPoint: 'Hà Nội', note: 'Xe 7 chỗ, có thể ghép khách', price: 920000, region: 'north', status: 'waiting' },
  { name: 'Lê Tuấn Kiệt', phone: '0913001004', startPoint: 'Hà Nội', endPoint: 'Thái Nguyên', note: 'Chạy cả ngày, ưu tiên khách công tác', price: 680000, region: 'north', status: 'waiting' },
  { name: 'Vũ Hoài Nam', phone: '0913001005', startPoint: 'Bắc Ninh', endPoint: 'Hà Nội', note: 'Đón khách khu Yên Phong, xe mới', price: 420000, region: 'north', status: 'waiting' },
  { name: 'Đỗ Minh Quân', phone: '0913001006', startPoint: 'Hà Nội', endPoint: 'Quảng Ninh', note: 'Đi Hạ Long, chạy cao tốc, có ghép khách', price: 1180000, region: 'north', status: 'waiting' },
  { name: 'Ngô Quốc Bảo', phone: '0913001007', startPoint: 'Nam Định', endPoint: 'Hà Nội', note: 'Xe 4 chỗ, đón từ sáng sớm', price: 820000, region: 'north', status: 'waiting' },
  { name: 'Bùi Anh Thư', phone: '0913001008', startPoint: 'Hưng Yên', endPoint: 'Hà Nội', note: 'Nhận khách quanh Văn Giang, Ecopark', price: 480000, region: 'north', status: 'waiting' },
  { name: 'Nguyễn Gia Hân', phone: '0913001009', startPoint: 'Hà Nội', endPoint: 'Phú Thọ', note: 'Xe 7 chỗ, đón khách từ Mỹ Đình', price: 760000, region: 'north', status: 'waiting' },
  { name: 'Trịnh Hải Đăng', phone: '0913001010', startPoint: 'Vĩnh Phúc', endPoint: 'Hà Nội', note: 'Có thể đón tại Nội Bài, chạy linh hoạt', price: 520000, region: 'north', status: 'waiting' },
  { name: 'Nguyễn Thành Luân', phone: '0923002001', startPoint: 'Đà Nẵng', endPoint: 'Quảng Nam', note: 'Đi Hội An, Tam Kỳ, nhận khách cả ngày', price: 520000, region: 'central', status: 'waiting' },
  { name: 'Lê Quốc Thiên', phone: '0923002002', startPoint: 'Huế', endPoint: 'Đà Nẵng', note: 'Xe 5 chỗ, đón tận nơi nội thành', price: 650000, region: 'central', status: 'waiting' },
  { name: 'Phan Nhật Minh', phone: '0923002003', startPoint: 'Quảng Ngãi', endPoint: 'Bình Định', note: 'Nhận khách dọc quốc lộ 1A', price: 760000, region: 'central', status: 'waiting' },
  { name: 'Trần Gia Bảo', phone: '0923002004', startPoint: 'Khánh Hòa', endPoint: 'Ninh Thuận', note: 'Nha Trang đi Phan Rang, xe 4 chỗ', price: 620000, region: 'central', status: 'waiting' },
  { name: 'Đặng Minh Châu', phone: '0923002005', startPoint: 'Gia Lai', endPoint: 'Đắk Lắk', note: 'Xe 7 chỗ, đi Pleiku - Buôn Ma Thuột', price: 890000, region: 'central', status: 'waiting' },
  { name: 'Võ Quỳnh Anh', phone: '0923002006', startPoint: 'Thanh Hóa', endPoint: 'Nghệ An', note: 'Đi buổi tối, nhận khách gia đình', price: 640000, region: 'central', status: 'waiting' },
  { name: 'Nguyễn Hải My', phone: '0923002007', startPoint: 'Quảng Bình', endPoint: 'Hà Tĩnh', note: 'Xe mới, khởi hành từ 5h sáng', price: 700000, region: 'central', status: 'waiting' },
  { name: 'Lâm Đức Anh', phone: '0923002008', startPoint: 'Đà Nẵng', endPoint: 'Quảng Bình', note: 'Nhận khách sân bay và bến xe trung tâm', price: 1160000, region: 'central', status: 'waiting' },
  { name: 'Trương Khánh Linh', phone: '0923002009', startPoint: 'Lâm Đồng', endPoint: 'Khánh Hòa', note: 'Đà Lạt - Nha Trang, còn 2 ghế trống', price: 860000, region: 'central', status: 'waiting' },
  { name: 'Phạm Tuấn Anh', phone: '0923002010', startPoint: 'Kon Tum', endPoint: 'Gia Lai', note: 'Chạy trong ngày, có thể ghép khách', price: 520000, region: 'central', status: 'waiting' },
  { name: 'Nguyễn Đức Tài', phone: '0933003001', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Cần Thơ', note: 'Xe 7 chỗ, đón khách từ sân bay Tân Sơn Nhất', price: 1280000, region: 'south', status: 'waiting' },
  { name: 'Lê Minh Khoa', phone: '0933003002', startPoint: 'Bình Dương', endPoint: 'TP. Hồ Chí Minh', note: 'Đi Thủ Dầu Một - trung tâm thành phố cả ngày', price: 480000, region: 'south', status: 'waiting' },
  { name: 'Trần Quang Hào', phone: '0933003003', startPoint: 'Đồng Nai', endPoint: 'Bà Rịa - Vũng Tàu', note: 'Xe 5 chỗ, nhận khách đi biển', price: 820000, region: 'south', status: 'waiting' },
  { name: 'Phạm Gia Linh', phone: '0933003004', startPoint: 'TP. Hồ Chí Minh', endPoint: 'Tây Ninh', note: 'Nhận khách sáng và chiều, xe mới', price: 920000, region: 'south', status: 'waiting' },
  { name: 'Ngô Hoàng Phúc', phone: '0933003005', startPoint: 'Cần Thơ', endPoint: 'Kiên Giang', note: 'Còn 2 ghế, nhận khách đi Rạch Giá', price: 760000, region: 'south', status: 'waiting' },
  { name: 'Đỗ Hải Yến', phone: '0933003006', startPoint: 'Tiền Giang', endPoint: 'TP. Hồ Chí Minh', note: 'Mỹ Tho đi Sài Gòn, đón tận nơi', price: 660000, region: 'south', status: 'waiting' },
  { name: 'Vũ Minh Trang', phone: '0933003007', startPoint: 'An Giang', endPoint: 'Cần Thơ', note: 'Tuyến Châu Đốc - Cần Thơ, xe 4 chỗ', price: 720000, region: 'south', status: 'waiting' },
  { name: 'Bùi Gia Hưng', phone: '0933003008', startPoint: 'Bến Tre', endPoint: 'TP. Hồ Chí Minh', note: 'Nhận khách du lịch, xe 7 chỗ', price: 980000, region: 'south', status: 'waiting' },
  { name: 'Nguyễn Khả Hân', phone: '0933003009', startPoint: 'Vĩnh Long', endPoint: 'Cần Thơ', note: 'Xe gia đình, đi trong ngày', price: 430000, region: 'south', status: 'waiting' },
  { name: 'Trần Quốc Thắng', phone: '0933003010', startPoint: 'Cà Mau', endPoint: 'Kiên Giang', note: 'Xe 7 chỗ, nhận khách đoàn nhỏ', price: 860000, region: 'south', status: 'waiting' },
].map((request, index) => ({
  _id: `seed-req-${index + 1}`,
  ...request,
}));

const state = {
  user: load('driver_user', null),
  token: localStorage.getItem('token') || '',
  pendingRegister: null,
  toastTimer: 0,
  requests: [],
  drivers: [],
  requestRegion: 'north',
  driverRegion: 'north',
  selectedProvince: '',
  requestsReady: false,
  qrConfig: {
    bankName: 'VIB',
    accountNumber: '088064513',
    accountName: 'PHI THAM GIA NHOM',
    amount: 200000,
    transferNote: 'Phi tham gia nhom',
  },
};

function load(k, f) { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(f)); } catch { return f; } }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function persistLists() { save(REQUESTS_CACHE_KEY, state.requests); save('local_drivers_cache', state.drivers); }
function q(s, r = document) { return r.querySelector(s); }
function qa(s, r = document) { return [...r.querySelectorAll(s)]; }
function regionName(k) { return k === 'north' ? 'Miền Bắc' : k === 'central' ? 'Miền Trung' : 'Miền Nam'; }
function fmtPhone(p) { return String(p || '').replace(/(\d{3})(\d{3})(\d{3,4})/, '$1 xxxx $3'); }
function initials(name) { return String(name || 'TX').trim().split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase() || 'TX'; }
function normalizePhone(phone = '') { return String(phone).replace(/\D+/g, ''); }
function parsePrice(text = '') { return Number(String(text).replace(/[^\d]/g, '')) || 0; }

function getRegionByProvince(province) {
  if (REGIONS.north.includes(province)) return 'north';
  if (REGIONS.central.includes(province)) return 'central';
  if (REGIONS.south.includes(province)) return 'south';
  return 'north';
}

function parseInitialDataFromDom() {
  return { requests: SEEDED_REQUESTS, drivers: HTML_DRIVERS };
}

function buildQrUrl(cfg = {}) {
  const bank = encodeURIComponent(String(cfg.bankName || '').trim());
  const accountNumber = encodeURIComponent(String(cfg.accountNumber || '').trim());
  const accountName = encodeURIComponent(String(cfg.accountName || '').trim());
  const amount = encodeURIComponent(String(Number(cfg.amount) || 0));
  const transferNote = encodeURIComponent(String(cfg.transferNote || '').trim());
  return `https://img.vietqr.io/image/${bank}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${transferNote}&accountName=${accountName}`;
}

async function api(path, opt = {}) {
  const res = await fetch(API_BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    },
    ...opt,
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(d.message || 'Có lỗi xảy ra');
  return d;
}

function toast(msg, err = false) {
  qa('.toast').forEach((n) => n.remove());
  const el = document.createElement('div');
  el.className = err ? 'toast error' : 'toast';
  el.innerHTML = `<span class="toast__icon">${err ? '✖' : '✔'}</span><span>${msg}</span>`;
  document.body.appendChild(el);
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => el.remove(), 2500);
}

function closeModal(options = {}) {
  const { keepPendingRegister = false } = options;
  qa('.modal[data-local]').forEach((n) => n.remove());
  if (!keepPendingRegister) state.pendingRegister = null;
}

function openModal(inner, options = {}) {
  closeModal(options);
  const m = document.createElement('div');
  m.className = 'modal';
  m.dataset.local = '1';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.innerHTML = `<div class="modal__backdrop"></div><div class="modal__panel">${inner}</div>`;
  document.body.appendChild(m);
  return m;
}

function field(label, name, type = 'text', ph = '', required = true) {
  const w = document.createElement('label');
  w.className = 'field';
  w.innerHTML = `<span>${label}</span>`;
  const i = type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
  i.name = name;
  if (type !== 'textarea') i.type = type;
  i.placeholder = ph;
  if (required) i.required = true;
  if (name === 'phone') {
    i.inputMode = 'tel';
    i.pattern = '[0-9]{9,11}';
  }
  if (name === 'price') i.inputMode = 'numeric';
  if (type === 'textarea') i.rows = 3;
  w.appendChild(i);
  return w;
}

function setupAuthModal(mode) {
  const modal = openModal(`<div class="modal__header"><div class="modal__title">${mode === 'login' ? 'Đăng nhập' : 'Đăng ký thành viên nhóm'}</div><button class="modal__close" aria-label="Đóng">×</button></div><form class="form"></form>`);
  const form = q('.form', modal);

  if (mode === 'register') {
    form.append(field('Họ và tên', 'name', 'text', 'VD: Nguyễn Văn A'));
    form.append(field('Số điện thoại', 'phone', 'tel', 'VD: 09xxxxxxx'));
    form.append(field('Loại xe', 'carType', 'text', 'VD: Toyota Camry, Honda Civic...'));
    form.append(field('Đời xe', 'carYear', 'text', 'VD: 2020, 2021...'));
  } else {
    form.append(field('Số điện thoại', 'phone', 'tel', 'VD: 09xxxxxxx'));
  }

  form.append(field('Mật khẩu', 'password', 'password', 'Ít nhất 4 ký tự'));
  if (mode === 'register') form.append(field('Xác nhận lại mật khẩu', 'confirmPassword', 'password', 'Nhập lại mật khẩu'));

  const btn = document.createElement('button');
  btn.className = 'submit';
  btn.type = 'submit';
  btn.textContent = 'XÁC NHẬN';
  form.append(btn);

  modal.querySelector('.modal__backdrop').onclick = closeModal;
  modal.querySelector('.modal__close').onclick = closeModal;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(form).entries());

    try {
      if (mode === 'register') {
        const password = String(fd.password || '');
        const confirmPassword = String(fd.confirmPassword || '');
        if (password !== confirmPassword) return toast('Mật khẩu xác nhận không khớp!', true);

        const pendingRegister = {
          name: String(fd.name || '').trim(),
          phone: normalizePhone(fd.phone),
          password,
          carType: String(fd.carType || '').trim(),
          carYear: String(fd.carYear || '').trim(),
        };

        api('/notify/register-intent', {
          method: 'POST',
          body: JSON.stringify({
            name: pendingRegister.name,
            phone: pendingRegister.phone,
            carType: pendingRegister.carType,
            carYear: pendingRegister.carYear,
          }),
        }).catch(() => {
          // không chặn luồng đăng ký nếu Telegram lỗi
        });

        state.pendingRegister = pendingRegister;
        closeModal({ keepPendingRegister: true });
        paymentModal();
        return;
      }

      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: normalizePhone(fd.phone), password: fd.password }),
      });

      state.user = data.user;
      state.token = data.token;
      save('driver_user', data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('driver_registered', '1');
      closeModal();
      toast('Đăng nhập thành công');
      render();
    } catch (err) {
      toast(err.message, true);
    }
  };
}

async function handlePaymentConfirmation(confirmBtn) {
  if (!state.pendingRegister) {
    toast('Không tìm thấy thông tin đăng ký. Vui lòng nhập lại.', true);
    closeModal();
    return;
  }

  confirmBtn.disabled = true;
  confirmBtn.style.opacity = '0.7';
  confirmBtn.textContent = 'Đang xác nhận...';
  toast('Đã nhận xác nhận thanh toán, vui lòng chờ...');

  try {
    const data = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(state.pendingRegister),
    });

    const user = data.user || {
      ...state.pendingRegister,
      status: 'pending',
    };

    state.user = user;
    save('driver_user', user);
    localStorage.setItem('driver_registered', '1');

    state.pendingRegister = null;
    toast('Đăng ký thành công! Tài khoản đang chờ admin phê duyệt.');
    setTimeout(async () => {
      closeModal();
      await loadData();
      render();
    }, 500);
  } catch (err) {
    confirmBtn.disabled = false;
    confirmBtn.style.opacity = '1';
    confirmBtn.textContent = 'Tôi đã chuyển 200k - Tiếp tục';
    toast(err?.message || 'Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối hoặc thử lại sau.', true);
  }
}


function paymentModal() {
  const cfg = state.qrConfig || {};
  const amountText = Number(cfg.amount || 0).toLocaleString('vi-VN');
  const qrUrl = buildQrUrl(cfg);
  const modal = openModal(`<div class="modal__header"><div class="modal__title">Phí vào nhóm ${amountText}đ</div><button class="modal__close" aria-label="Đóng">×</button></div><div style="padding:8px 16px;overflow-y:auto;flex:1;max-height:calc(90vh - 60px);-webkit-overflow-scrolling:touch"><p style="margin-top:0">Vui lòng chuyển khoản theo QR bên dưới để hoàn tất đăng ký.</p><div style="display:flex;justify-content:center"><div style="width:100%;max-width:360px;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.08);background:linear-gradient(135deg,#fff,#f4f7fb);padding:18px;text-align:center"><div style="font-size:13px;color:#666;margin-bottom:10px">QR thanh toán nội bộ</div><img src="${qrUrl}" alt="QR thanh toán" style="width:100%;max-width:280px;border-radius:12px;border:1px solid #e5e7eb;background:#fff"><div style="margin-top:10px;font-family:monospace;font-size:12px">${cfg.bankName || ''} - ${cfg.accountNumber || ''} | ${amountText} | ${cfg.transferNote || ''}</div><div style="margin-top:8px;font-size:13px;color:#444">Chủ tài khoản: <strong>${cfg.accountName || ''}</strong></div></div></div><div style="margin-top:12px;font-size:13px;color:#444">Nội dung chuyển khoản: <strong>${cfg.transferNote || ''}</strong></div><div style="display:flex;gap:12px;margin-top:16px;margin-bottom:16px"><button type="button" class="submit payment-confirm" style="flex:1;cursor:pointer">Tôi đã chuyển ${amountText}đ - Tiếp tục</button><button type="button" class="sheet__cancel" style="flex:1;cursor:pointer">Để sau</button></div></div>`, { keepPendingRegister: true });

  const confirmBtn = modal.querySelector('.payment-confirm');

  modal.querySelector('.modal__backdrop').onclick = closeModal;
  modal.querySelector('.modal__close').onclick = closeModal;
  modal.querySelector('.sheet__cancel').onclick = closeModal;

  confirmBtn.onclick = () => handlePaymentConfirmation(confirmBtn);
}

function callModal(d) {
  const modal = openModal(`<div class="sheet__panel"><div class="sheet__row"><span class="sheet__label">Gọi</span><strong class="sheet__phone">${fmtPhone(d.phone)}</strong></div><a class="sheet__call" href="tel:${d.phone}">GỌI NGAY</a><button class="submit sheet__request" type="button">ĐĂNG KÝ THÀNH VIÊN NHÓM</button><button class="sheet__cancel">Hủy</button></div>`);
  modal.querySelector('.modal__backdrop').onclick = closeModal;
  modal.querySelector('.sheet__cancel').onclick = closeModal;
  modal.querySelector('.sheet__request').onclick = () => setupAuthModal('register');
}

function copyReq(r) {
  navigator.clipboard.writeText(`${r.name}\n${r.phone}\n${r.startPoint} -> ${r.endPoint}\nGiá: ${Number(r.price).toLocaleString('vi-VN')} VND`);
  toast('Đã sao chép');
}

function requestCard(r) {
  const el = document.createElement('div');
  el.className = 'request-card';
  el.innerHTML = `<div class="request-main"><div class="request-name">${r.name}</div><div class="request-phone">Số điện thoại khách hàng: ${fmtPhone(r.phone)}</div><div class="request-route">${r.startPoint} -> ${r.endPoint}</div>${r.note ? `<div class="request-note">Ghi chú: ${r.note}</div>` : ''}<div class="request-price">Giá: ${Number(r.price).toLocaleString('vi-VN')} VND</div></div><button class="copy-btn">SAO CHÉP</button>`;
  el.querySelector('.copy-btn').onclick = () => copyReq(r);
  return el;
}

function driverCard(d) {
  const el = document.createElement('article');
  el.className = 'driver-card';
  const avatarHtml = d.avatar
    ? `<div class="avatar" aria-label="${d.name}" title="${d.name}"><img alt="${d.name}" src="${d.avatar}"></div>`
    : `<div class="avatar"><span>${initials(d.name)}</span></div>`;
  const phoneText = d.phoneDisplay || fmtPhone(d.phone);
  el.innerHTML = `${avatarHtml}<div class="driver-info"><div class="driver-phone">${phoneText}</div><div class="driver-route">${d.route || ''}</div></div><button class="call-btn" aria-label="Gọi tài xế"><svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V21a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.01l-2.21 2.22z"></path></svg></button>`;
  el.querySelector('.call-btn').onclick = () => callModal({ ...d, phone: normalizePhone(phoneText) });
  return el;
}

function regionTabs(active, onPick) {
  const wrap = document.createElement('div');
  wrap.className = 'region-tabs';
  wrap.style.marginBottom = '16px';
  ['north', 'central', 'south'].forEach((k) => {
    const b = document.createElement('button');
    b.className = `region-tab${active === k ? ' active' : ''}`;
    b.textContent = regionName(k);
    b.onclick = () => onPick(k);
    wrap.appendChild(b);
  });
  return wrap;
}

function fillProvinceSelect(select, regionKey, placeholder = 'Chọn tỉnh/thành') {
  const provinces = REGIONS[regionKey] || [];
  const current = select.value;
  select.innerHTML = '';
  select.appendChild(new Option(placeholder, '', true, !provinces.includes(current)));
  provinces.forEach((p) => select.appendChild(new Option(p, p, false, p === current)));
}

function render() {
  const app = q('#root .app') || q('#root');
  app.classList.add('app');
  app.innerHTML = '';

  const top = document.createElement('div');
  top.className = 'topbar';
  top.innerHTML = '<button class="hamburger" aria-label="Menu"> MENU</button>';
  app.appendChild(top);

  if (!state.user || state.user.status !== 'approved') {
    const auth = document.createElement('div');
    auth.className = 'auth-box';
    auth.innerHTML = '<div class="auth-box__content"><h3 class="auth-box__title">Tham gia nhóm tài xế</h3><p class="auth-box__subtitle">Đăng ký để có thể liên hệ và đăng cuốc xe</p><div class="auth-box__buttons"><button class="auth-box__btn auth-box__btn--primary">Đăng ký thành viên</button><button class="auth-box__btn auth-box__btn--secondary">Đăng nhập</button></div></div>';
    auth.querySelector('.auth-box__btn--primary').onclick = () => setupAuthModal('register');
    auth.querySelector('.auth-box__btn--secondary').onclick = () => setupAuthModal('login');
    app.appendChild(auth);
  } else {
    const box = document.createElement('div');
    box.className = 'main-actions';
    box.innerHTML = `<div class="user-summary-card user-summary-card--clickable" style="cursor:pointer"><div class="user-summary-card__avatar">${initials(state.user.name)}</div><div class="user-summary-card__info"><span class="user-summary-card__greeting">Xin chào,</span><strong class="user-summary-card__name">${state.user.name}</strong><span class="user-summary-card__phone">${fmtPhone(state.user.phone)}</span><span class="user-summary-card__hint">Nhấn để xem dashboard</span></div></div><button class="main-action-btn main-action-btn--logout"><span class="main-action-btn__icon">🚪</span><span class="main-action-btn__text">Đăng xuất</span></button>`;
    box.querySelector('.user-summary-card').onclick = () => alert('Dashboard local đang giữ nguyên trải nghiệm');
    box.querySelector('.main-action-btn--logout').onclick = () => {
      localStorage.removeItem('driver_user');
      localStorage.removeItem('token');
      localStorage.removeItem('driver_registered');
      state.user = null;
      state.token = '';
      render();
    };
    app.appendChild(box);
  }

  const ticker = document.createElement('header');
  ticker.className = 'ticker';
  const track = document.createElement('div');
  track.className = 'ticker__track';
  const items = state.requestsReady ? state.requests.slice(0, 6) : [];
  [...items, ...items].forEach((r) => {
    const it = document.createElement('div');
    it.className = 'ticker__item';
    it.innerHTML = `<span class="dot"></span><span class="ticker__text">${r.name} đang nhờ: ${r.startPoint} ⇄ ${r.endPoint} - Liên hệ ${fmtPhone(r.phone)}</span>`;
    track.appendChild(it);
  });
  ticker.appendChild(track);
  app.appendChild(ticker);

  const main = document.createElement('main');
  main.className = 'content';

  const req = document.createElement('section');
  req.className = 'requests-section';
  req.id = 'requests';

  const reqH = document.createElement('h2');
  reqH.className = 'requests-heading';
  reqH.textContent = 'Yêu cầu chở cuốc xe';
  req.append(reqH, regionTabs(state.requestRegion, (v) => {
    state.requestRegion = v;
    state.selectedProvince = '';
    render();
  }));

  const choose = document.createElement('div');
  choose.style.marginBottom = '12px';
  choose.innerHTML = '<label class="field" style="margin-bottom:0"><span>Chọn tỉnh/thành phố</span></label>';
  const select = document.createElement('select');
  select.style.cssText = 'width:100%;padding:12px 36px 12px 12px;border-radius:12px;border:2px solid #e5e7eb;font-size:15px;font-weight:600;background:#fff;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px';
  select.appendChild(new Option(`Tất cả tỉnh/thành (${regionName(state.requestRegion)})`, ''));
  REGIONS[state.requestRegion].forEach((p) => select.appendChild(new Option(p, p)));
  select.value = state.selectedProvince;
  select.onchange = (e) => {
    state.selectedProvince = e.target.value;
    render();
  };
  choose.firstElementChild.appendChild(select);
  req.appendChild(choose);

  const filtered = state.requests.filter((r) => {
    const reqRegion = r.region || getRegionByProvince(r.startPoint || r.endPoint);
    return reqRegion === state.requestRegion
      && (!state.selectedProvince || r.startPoint === state.selectedProvince || r.endPoint === state.selectedProvince);
  });

  const h3 = document.createElement('h3');
  h3.style.cssText = 'margin:0 0 12px 0;font-size:16px;color:#333';
  h3.textContent = state.selectedProvince ? `${regionName(state.requestRegion)} - ${state.selectedProvince}` : regionName(state.requestRegion);
  req.appendChild(h3);

  if (!state.requestsReady) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = `Chưa có yêu cầu nào trong ${regionName(state.requestRegion)}.`;
    req.appendChild(empty);
  } else if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = `Chưa có yêu cầu nào trong ${regionName(state.requestRegion)}.`;
    req.appendChild(empty);
  } else {
    filtered.forEach((r) => req.appendChild(requestCard(r)));
  }

  const drv = document.createElement('section');
  drv.className = 'drivers-section';
  drv.innerHTML = '<h2 class="section-heading">Danh sách tài xế</h2>';
  drv.appendChild(regionTabs(state.driverRegion, (v) => {
    state.driverRegion = v;
    render();
  }));

  const drH = document.createElement('h3');
  drH.className = 'region-heading';
  drH.textContent = regionName(state.driverRegion);
  drv.appendChild(drH);

  const drivers = state.drivers.filter((d) => (d.region || 'north') === state.driverRegion);
  if (!drivers.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Chưa có tài xế trong nhóm này.';
    drv.appendChild(empty);
  } else {
    drivers.forEach((d) => drv.appendChild(driverCard(d)));
  }

  main.append(req, drv);
  app.appendChild(main);

  const cta = document.createElement('button');
  cta.className = 'floating-cta';
  cta.innerHTML = 'ĐĂNG KÝ CHỞ CUỐC XE<span class="chevron">›</span>';
  cta.onclick = () => setupAuthModal('register');
  app.appendChild(cta);
}

async function loadData() {
  const initialDom = parseInitialDataFromDom();
  const cachedRequests = load(REQUESTS_CACHE_KEY, []);
  const cachedDrivers = load('local_drivers_cache', []);
  const localRequests = initialDom.requests.length > cachedRequests.length ? initialDom.requests : cachedRequests;
  const localDrivers = initialDom.drivers.length > cachedDrivers.length ? initialDom.drivers : cachedDrivers;

  try {
    const requestsPromise = state.token
      ? api('/requests?status=waiting').catch(() => ({ requests: localRequests }))
      : api('/public/requests').catch(() => ({ requests: localRequests }));
    const driversPromise = api('/drivers').catch(() => ({ drivers: [] }));

    const qrPromise = api('/qr-config').catch(() => ({ qrConfig: state.qrConfig }));
    const [reqs, drvs, qrRes] = await Promise.all([requestsPromise, driversPromise, qrPromise]);

    const serverRequests = Array.isArray(reqs.requests) ? reqs.requests : [];
    const serverDrivers = Array.isArray(drvs.drivers) ? drvs.drivers : [];
    state.qrConfig = qrRes.qrConfig || state.qrConfig;

    state.requests = serverRequests.length
      ? serverRequests.map((r) => ({ ...r, region: r.region || getRegionByProvince(r.startPoint || r.endPoint) }))
      : localRequests;

    state.drivers = HTML_DRIVERS;

    if (state.user && !state.user.status) {
      try {
        const me = await api('/auth/me');
        state.user = me.user;
        save('driver_user', me.user);
      } catch {
        // bỏ qua
      }
    }
  } catch {
    state.requests = localRequests;
    state.drivers = localDrivers;
  }

  persistLists();
}

(async function init() {
  const root = document.querySelector('#root');
  const initialDom = parseInitialDataFromDom();
  const cachedRequests = load(REQUESTS_CACHE_KEY, []);

  state.requests = initialDom.requests.length ? initialDom.requests : cachedRequests;
  state.requestsReady = true;

  root.innerHTML = '<div class="app"></div>';
  render();

  loadData().then(() => render()).catch(() => render());
  window.DEBUG_APP = { state, loadData, render, setupAuthModal, paymentModal, persistLists };
})();
