import MainTable from "../components/MainTable";
import { useState, useContext } from "react";
import { Context } from "../store/context";
import { json, useLoaderData, useNavigate, redirect } from "react-router-dom";
import {
  fetchData,
  getUrl,
  formatPrice,
  getLocalStorageUser,
} from "../function";

const Product = () => {
  const products = useLoaderData();
  const [prodList, setProdList] = useState(products || []);
  const { logout } = useContext(Context);

  const navigate = useNavigate();
  const handleDelete = async (productId) => {
    try {
      if (window.confirm("Bạn có muốn xóa sản phẩm?")) {
        const res = await fetchData(`product/${productId}`, "DELETE", null);
        if (res.ok) {
          setProdList((state) => state.filter((p) => p._id !== productId));
          return alert("DELETE SUCCESS!");
        }
        if (res.status === 401 || res.status === 403) {
          logout();
          return navigate("/login");
        }
        const data = await res.json();
        if (data.message) return alert(data.message);
        throw new Error();
      } else {
        return;
      }
    } catch {
      alert("Không thể xóa sản phảm lúc này");
    }
  };
  return (
    <MainTable
      head={["ID", "Name", "Price", "Image", "Category", "Count", "Edit"]}
      title="Products"
      action={true}
      fnAction={() => navigate("add")}
    >
      {prodList.map((product) => {
        return (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{formatPrice(product.price)}</td>
            <td>
              <img src={getUrl(product.images[0])} alt={product.name} />
            </td>
            <td>{product.category}</td>
            <td>{product.count}</td>
            <td>
              <button
                className="btn btn-green"
                onClick={() => navigate(`edit/${product._id}`)}
              >
                Update
              </button>
              <button
                className="btn btn-red"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </MainTable>
  );
};

export default Product;

export async function loader() {
  const user = getLocalStorageUser();
  if (user.type !== "admin") return redirect("/");
  try {
    const res = await fetchData("product?mode=admin", "GET", null);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch {
    throw json({ message: "Tải dữ liệu không thành công!" }, { status: 222 });
  }
}
