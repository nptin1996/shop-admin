import { useLoaderData, json } from "react-router-dom";
import { fetchData } from "../function";
import ProductForm from "../components/ProductForm";

function EditProduct() {
  const data = useLoaderData();
  return <ProductForm type="Edit" data={data} />;
}

export default EditProduct;

export async function loader({ params }) {
  try {
    const productId = params.productId;
    const res = await fetchData(`product/${productId}?mode=admin`, "GET", null);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch {
    throw json({ message: "Tải sản phẩm không thành công" });
  }
}
