# ⚽ Cổ Vũ Làng 8 — Trang cổ vũ bóng đá Làng 8

Trang web static cổ vũ **Làng 8** — lễ ra trường sinh viên Công Giáo, bóng đá & cầu lông.

## Hình ảnh — sửa trong `data/hinh-anh.json`

Mở file **`data/hinh-anh.json`** để đổi link ảnh từng vị trí trên giao diện:

| Key JSON | Vị trí trên trang |
|----------|-------------------|
| `hero.collage` | 3 ảnh lơ lửng banner đầu (bên phải) |
| `sinhVien.sectionRaTruong` | Section **Thế hệ ra trường** |
| `lang8.khoanhKhac` | Section **KHOẢNH KHẮC LÀNG 8** (`img/lang8/`) |
| `bongDa.stripDuoiTran` | Dải ảnh dưới card trận **bóng đá** |
| `bongDa.doiHinh.danhSach` | 6 ảnh đội hình bóng đá |
| `cauLong.stripDuoiTran` | Dải ảnh dưới card trận **cầu lông** |
| `cauLong.doiHinh.danhSach` | 6 ảnh đội hình cầu lông |
| `coDongVien.gallery` | Lưới ảnh section **Cổ động viên** |
| `nhacNen.file` | File nhạc nền (mặc định `mp3/bongda.mp3`, loop) |
| `nhacNen.amLuong` | Âm lượng 0–1 (mặc định 0.5) |

- Path tương đối: `img/sinhvien/ten-anh.jpg`
- Hoặc link đầy đủ: `https://...`
- Key bắt đầu `_` (vd `_viTri`) chỉ là ghi chú, không ảnh hưởng code
- Sửa xong → push lên Git → reload trang (Ctrl+F5)

## Chạy local

Mở trực tiếp file `index.html` trong trình duyệt, hoặc dùng server đơn giản:

```bash
# Python
python -m http.server 8080

# Node (nếu có npx)
npx serve .
```

Truy cập: http://localhost:8080

## Đưa lên GitHub Pages

1. Push repo lên GitHub
2. Vào **Settings → Pages**
3. Source: **Deploy from branch** → chọn `main` / folder `/ (root)`
4. Trang sẽ chạy tại `https://<username>.github.io/<repo>/`

## Cấu trúc

```
├── index.html      # Trang chính
├── css/style.css   # Giao diện
├── js/main.js      # GSAP animations
└── README.md
```

## Đăng ký cổ vũ (JSON)

- **`data/dang-ky.json`** — danh sách có sẵn trong repo (sửa tay rồi push lên Git)
- **localStorage** — đăng ký mới qua form được lưu JSON trên trình duyệt (không tải file về)
- Nút **"Xem danh sách đã đăng ký"** hiển thị gộp cả hai nguồn trên trang

> GitHub Pages không cho ghi file trên server, nên form không thể tự cập nhật `dang-ky.json`. Muốn thêm người cố định vào file JSON thì sửa `data/dang-ky.json` và push lại.

## Tùy chỉnh

- Đổi tên đội, cầu thủ trong `index.html`
- Countdown đến **15/06/2026 — 15h** (sửa trong `js/main.js` → `MATCH_SCHEDULE`)
- Màu sắc: biến CSS trong `:root` ở `css/style.css`
