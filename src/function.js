// hàm format Price
export function formatPrice(price) {
  // Chuyển đổi giá trị số thành chuỗi
  let priceString = String(price);
  // Tạo mảng để lưu các ký tự
  let formattedPrice = [];
  // Đếm biến đếm số ký tự đã được thêm vào mảng
  let count = 0;
  // Duyệt qua từng ký tự của chuỗi giá
  for (let i = priceString.length - 1; i >= 0; i--) {
    // Thêm ký tự vào mảng
    formattedPrice.unshift(priceString[i]);
    // Tăng biến đếm
    count++;
    // Nếu biến đếm đạt 3 và vị trí ký tự hiện tại không phải là ký tự đầu tiên của chuỗi
    if (count % 3 === 0 && i !== 0) {
      // Thêm dấu chấm vào mảng
      formattedPrice.unshift(".");
    }
  }
  // Kết hợp các phần tử của mảng thành một chuỗi
  return formattedPrice.join("") + " VND";
}

// Hàm localStorage
export function getLocalStorageUser() {
  const data = JSON.parse(localStorage.getItem("currentAdminAsm3"));
  if (
    !data ||
    !data.name ||
    !data.type ||
    !["admin", "staff"].includes(data.type) ||
    !data.expires
  ) {
    return null;
  }

  const date = new Date();

  if (new Date(data.expires).getTime() - date.getTime() <= 0) {
    return null;
  }

  return data;
}
