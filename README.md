# WEBSITE QUẢN LÝ CHI TIÊU CÁ NHÂN

## Website quản lý chi phí cá nhân này giúp người dùng theo dõi các khoản chi tiêu và quản lý các hoạt động tài chính của họ một cách thuận tiện.

## Các tính năng chính
- Đăng nhập
- Đăng ký
- Đăng xuất
- Đổi mật khẩu
- Thêm giao dịch
- Cập nhật giao dịch
- Xóa giao dịch
- Xem biểu đồ thống kê Thu nhập và chi tiêu
- Xem biểu đồ thống kê Chi phí theo danh mục
- Tìm kiếm 

## Công nghệ sử dụng
- Ngôn ngữ lập trình: Javascript
- Framework: Expressjs (Nodejs) và Vuejs
- Cơ sở dữ liệu: MongoDB
- Các công nghệ và thư viện khác: tailwindcss, jsonwebtoken, mongoose,...

## Hướng dẫn cài đặt và chạy
### 1. Clone repository này về máy tính của bạn:
```sh
git clone https://github.com/quooctrangg/Budget-Manager-App.git
```
### 2. Di chuyển vào thư mục dự án:
```sh
cd Budget-Manager-App
```
### 3. Di chuyển vào thư mục con:
(Tạo 2 terminal để thao tác với 2 thư mục con)

### 3.1. Thư mục Server
3.1.1. Di chuyển:
```sh
cd Server
```

3.1.2. Cài đặt các dependencies cần thiết:
```sh
npm install
```

3.1.3. Tạo tập tin .env và thiết lập:
```sh
touch .env
```

3.1.4. Mở file .env bằng trình soạn thảo văn bản và cung cấp các biến môi trường cần thiết theo định dạng "TÊN_BIẾN=GIÁ_TRỊ"
```sh
MONGO_URI=mongodb://127.0.0.1:27017/budgetmanager
PORT=8000
ACCESS_TOKEN=budgetmanager
```

3.1.5. Chạy ứng dụng trên thiết bị:
```sh
npm run dev
```

#### 3.2. Thư mục Client:

3.2.1. Di chuyển:
```sh
cd Client
```

3.2.2. Cài đặt các dependencies cần thiết:
```sh
npm install
```

3.2.3. Chạy ứng dụng trên thiết bị:
```sh
npm run dev
```

3.2.4. Truy cập http://localhost:8080 để sử dụng:
```sh
http://localhost:8080
```

## Lưu ý
- Máy tính của bạn phải cài đặt git, nodejs và mongoDB
- Khởi chạy mongoDB trước khi chạy ứng dụng