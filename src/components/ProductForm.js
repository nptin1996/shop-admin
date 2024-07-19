import classes from "./ProductForm.module.css";
import { useState, useContext } from "react";
import { Context } from "../store/context";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../function";

function ProductForm({ type = "Add", data }) {
  const [images, setImages] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { logout } = useContext(Context);
  const navigate = useNavigate();
  const handlePickFiles = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSubmitting(true);
    try {
      if (type === "Add" && (images.length === 0 || images.length > 4)) {
        return setErrMsg("Images không thể trống, chọn tối đa 4.");
      }
      const fd = new FormData(e.target);
      images.forEach((i) => fd.append("images", i));
      const res = await fetch(
        getUrl(`product${type === "Edit" ? `/${data._id}` : ""}`),
        {
          method: type === "Edit" ? "PUT" : "POST",
          body: fd,
          credentials: "include",
        }
      );

      if (res.ok) return navigate("/product");
      if (res.status === 401 || res.status === 403) {
        logout();
        alert("Đăng nhập và thử lại!");
        return navigate("/login");
      }
      const dataR = await res.json();
      if (dataR.message) {
        return setErrMsg(dataR.message);
      }
      throw new Error();
    } catch (err) {
      setErrMsg("Create product failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`card ${classes.containerProduct}`}>
      <h3>{type} Product</h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            placeholder="Enter Product Name"
            id="name"
            name="name"
            defaultValue={type === "Edit" ? data.name : ""}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            placeholder="Enter Category"
            id="category"
            name="category"
            defaultValue={type === "Edit" ? data.category : ""}
            required
          />
        </div>
        <div>
          <label htmlFor="shortDesc">Short Description</label>
          <textarea
            placeholder="Enter Short Description"
            id="shortDesc"
            name="shortDesc"
            defaultValue={type === "Edit" ? data.shortDesc : ""}
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="longDesc">Long Description</label>
          <textarea
            placeholder="Enter Long Description, ngăn cách bằng Enter xuống dòng"
            id="longDesc"
            name="longDesc"
            defaultValue={type === "Edit" ? data.longDesc : ""}
            rows={12}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            placeholder="Enter Price"
            type="number"
            id="price"
            name="price"
            defaultValue={type === "Edit" ? data.price : ""}
            min={1}
            step={1}
            required
          />
        </div>
        <div>
          <label htmlFor="count">Count</label>
          <input
            placeholder="Enter Count"
            type="number"
            id="count"
            name="count"
            defaultValue={type === "Edit" ? data.count : ""}
            min={0}
            step={1}
            required
          />
        </div>

        <div className={classes.files}>
          <label htmlFor="file">Upload images (4 images)</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePickFiles}
          />
        </div>

        <div>
          <button className="btn">Submit</button>
          {errMsg && <span className={classes.err}>{errMsg}</span>}
        </div>
        {submitting && <div className={`loader ${classes.loader}`} />}
      </form>
    </div>
  );
}

export default ProductForm;
