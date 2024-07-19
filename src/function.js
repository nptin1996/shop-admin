// hàm format Price
export function formatPrice(price) {
  let priceString = String(price);
  let formattedPrice = [];
  let count = 0;
  for (let i = priceString.length - 1; i >= 0; i--) {
    formattedPrice.unshift(priceString[i]);
    count++;
    if (count % 3 === 0 && i !== 0) {
      formattedPrice.unshift(".");
    }
  }
  // Kết hợp các phần tử của mảng thành một chuỗi
  return formattedPrice.join("");
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

export function getUrl(pathUrl) {
  const url = new URL(`${process.env.REACT_APP_API_URL}/${pathUrl}`);
  return url;
}

export async function fetchData(pathUrl, method, body) {
  const url = getUrl(pathUrl);
  return await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" || method === "DELETE" ? null : JSON.stringify(body),
    credentials: "include",
  });
}
