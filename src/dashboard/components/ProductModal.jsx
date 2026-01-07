import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
export function ProductModal({
  closeModal,
  decodedToken,
  onAddProduct,
  onEditProduct,
  selectedProduct,
}) {
  const emptyValues = {
    "category": "",
    "content": "",
    "description": "",
    "id": "",
    "is_enabled": "",
    "origin_price": "",
    "price": "",
    "title": "",
    "unit": "",
    "num": 1,
    "imageUrl": "",
    "imagesUrl": [],
  };
  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const apiUrl = import.meta.env.VITE_APP;
  const apiPath = import.meta.env.VITE_APP_PATH;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleAddProduct = (data) => {
    onAddProduct(data);
  };

  const handleEditProduct = (data) => {
    onEditProduct(selectedProduct.id, data);
  };

  const handleIsNewProduct = (data) => {
    if (selectedProduct) {
      return handleEditProduct(data);
    } else {
      return handleAddProduct(data);
    }
  };

  const handleUpload = (e) => {
    fileRef.current = e.target.files[0];
  };

  const fetchImage = async () => {
    const formData = new FormData();
    formData.append("file-to-upload", fileRef.current);

    try {
      const res = await fetch(`${apiUrl}/api/${apiPath}/admin/upload`, {
        method: "POST",
        headers: {
          Authorization: decodedToken,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success === true) {
        setImageUrl(data.imageUrl);
        // 將圖片 URL 設定到表單欄位中
        setValue("imagesUrl", data.imagesUrl);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 當 selectedProduct 改變時，重置表單
  useEffect(() => {
    if (selectedProduct) {
      // 編輯模式：設置選中產品的資料
      reset({
        ...selectedProduct,
        is_enabled: Number(selectedProduct.is_enabled),
      });
      // 設定圖片 URL
      setImageUrl(selectedProduct.imageUrl || null);
    } else {
      // 新增模式：重置為空值
      reset(emptyValues);
      setImageUrl(null);
    }
  }, [selectedProduct, reset]);
  return (
    <>
      <div className="fixed bg-black/70 inset-0"></div>
      <section className="md:w-[680px] xl:w-[900px] mx-auto bg-slate-800 border border-white rounded-md md:absolute md:inset-50">
        <div className="px-5 py-5 md:py-2 grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">商品名稱</legend>
              <input
                {...register("title", {
                  required: "商品名稱為必填",
                  minLength: { value: 2, message: "至少 2 個字" },
                  maxLength: { value: 30, message: "最多 30 個字" },
                })}
                type="text"
                className="input"
                name="title"
              />
              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </fieldset>
            <div className="flex flex-col md:flex-row gap-2">
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">原價</legend>
                <input
                  {...register("origin_price", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    min: { value: 0, message: "原價不得小於 0" },
                    validate: (value) =>
                      value === undefined || Number.isFinite(value)
                        ? true
                        : "請輸入數字",
                  })}
                  type="number"
                  className="input"
                  name="origin_price"
                />
                {errors.origin_price && (
                  <p className="text-sm text-red-400">
                    {errors.origin_price.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">售價</legend>
                <input
                  {...register("price", {
                    required: "售價為必填",
                    setValueAs: (v) => (v === "" ? NaN : Number(v)),
                    min: { value: 1, message: "售價需大於 0" },
                    validate: (value) =>
                      Number.isFinite(value) ? true : "請輸入數字",
                  })}
                  type="number"
                  className="input"
                  name="price"
                />
                {errors.price && (
                  <p className="text-sm text-red-400">{errors.price.message}</p>
                )}
              </fieldset>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">分類</legend>
                <input
                  {...register("category", {
                    required: "分類為必填",
                    maxLength: { value: 20, message: "最多 20 個字" },
                  })}
                  type="text"
                  className="input"
                  name="category"
                />
                {errors.category && (
                  <p className="text-sm text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">單位</legend>
                <input
                  {...register("unit", {
                    required: "單位為必填",
                    maxLength: { value: 10, message: "最多 10 個字" },
                  })}
                  type="text"
                  className="input"
                  name="unit"
                />
                {errors.unit && (
                  <p className="text-sm text-red-400">{errors.unit.message}</p>
                )}
              </fieldset>
            </div>
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">商品描述</legend>
              <textarea
                {...register("description", {
                  maxLength: { value: 80, message: "最多 80 個字" },
                })}
                className="textarea h-24"
                maxLength="80"
              ></textarea>
              {errors.description && (
                <p className="text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </fieldset>
            <div className="flex items-center gap-3">
              <legend className="text-lg mb-1">啟用</legend>
              <input
                {...register("is_enabled")}
                type="checkbox"
                className="toggle toggle-warning"
              />
            </div>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">檔案上傳</legend>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => handleUpload(e)}
                />
                <button
                  className="btn btn-outline btn-info"
                  onClick={fetchImage}
                >
                  新增檔案
                </button>
              </div>
              <label className="label">Max size 3MB</label>
            </fieldset>
            <div>
              <h3 className="text-lg mb-2">已上傳圖片</h3>
              <div className="grid grid-cols-3 gap-2">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="產品圖片" 
                    className="w-full h-auto object-cover rounded"
                  />
                )}
              </div>
              <input type="hidden" {...register("imageUrl")} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-2">
          <button className="btn btn-soft" onClick={closeModal}>
            取消
          </button>
          <button
            className="btn btn-warning"
            onClick={handleSubmit(handleIsNewProduct)}
          >
            儲存
          </button>
        </div>
      </section>
    </>
  );
}
