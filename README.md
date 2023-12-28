# CÁC BƯỚC CHẠY SOURCE CODE FRONT-END Ở LOCAL

Bước 1: Clone project về máy bằng lệnh git clone https://github.com/MinhTuongLe/Paradise_Booking.git
Bước 2: Mở Terminal trong thư mục clone về và nhập lệnh npm i để cài đặt thư viện cần thiết
Bước 3: Nhập lệnh npm run dev trong Terminal để chạy ứng dụng

# CÁCH CHẠY BẰNG DOCKER
Bước 1: Mở Terminal trong thư mục source code
Bước 2: Chạy lệnh: docker build -t paradise-frontend . (để build Docker image từ docker file)
Bước 3: Chạy lệnh: docker run --name AppFE -d -p 3000:3000 paradise-frontend  ( để chạy container từ docker image vừa mới build ở trên lên) và app sẽ chạy với port là 3000 trên localhost
