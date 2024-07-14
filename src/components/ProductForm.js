import classes from "./ProductForm.module.css";
import { useState, useContext } from "react";
import { Context } from "../store/context";
import { useNavigate } from "react-router-dom";

function ProductForm({ type = "Add", data }) {
  const [images, setImages] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePickFiles = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrMsg("");
      setSubmitting(true);
      if (type === "Add" && (images.length === 0 || images.length > 4)) {
        return setErrMsg("Images không thể trống, chọn tối đa 4.");
      }
      const fd = new FormData(e.target);
      fd.append("images", images);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/product${
          type === "Edit" ? `/${data._id}` : ""
        }`,
        {
          method: type === "Edit" ? "PUT" : "POST",
          body: fd,
          credentials: "include",
        }
      );
    } catch (err) {}
  };

  console.log(images);
  return (
    <div className={`card ${classes.containerProduct}`}>
      <h3>{type} Product</h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            placeholder="Enter Product Name"
            id="name"
            name="name"
            defaultValue={""}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            placeholder="Enter Category"
            id="category"
            name="category"
            defaultValue={""}
            required
          />
        </div>
        <div>
          <label>Short Description</label>
          <textarea
            placeholder="Enter Short Description"
            id="shortDesc"
            name="shortDesc"
            defaultValue={""}
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="longDesc">Long Description</label>
          <textarea
            placeholder="Enter Long Description, ngăn cách các dòng bằng ký tự  /n/"
            id="longDesc"
            name="longDesc"
            defaultValue={""}
            rows={12}
            required
            onChange={(e) => {
              console.log(e.target.value.trim());
            }}
          />
        </div>
        <div className={classes.files}>
          <label>Upload images (4 images)</label>
          <input
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
