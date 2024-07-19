import MainTable from "../components/MainTable";
import { json, useLoaderData, useNavigate, redirect } from "react-router-dom";
import {
  fetchData,
  getUrl,
  formatPrice,
  getLocalStorageUser,
} from "../function";
const Product = () => {
  const products = useLoaderData();
  const navigate = useNavigate();
  return (
    <MainTable
      head={["ID", "Name", "Price", "Image", "Category", "Count", "Edit"]}
      title="Products"
      action={true}
      fnAction={() => navigate("add")}
    >
      {products.map((product) => {
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
              <button className="btn btn-green">Update</button>
              <button className="btn btn-red">Delete</button>
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
