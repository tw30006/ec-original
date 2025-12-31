import ring from "../../assets/images/ring-7.jpg";

export function ProductModal({ closeModal }) {
  return (
    <>
      <div className="fixed bg-black/70 inset-0"></div>
      <section className="md:w-[680px] xl:w-[900px] mx-auto bg-slate-800 border border-white rounded-md md:absolute md:inset-50">
        <div className="px-5 py-5 md:py-2 grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">商品名稱</legend>
              <input type="text" className="input" />
            </fieldset>
            <div className="flex flex-col md:flex-row gap-2">
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">原價</legend>
                <input type="text" className="input" />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">售價</legend>
                <input type="text" className="input" />
              </fieldset>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">分類</legend>
                <input type="text" className="input" />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-lg mb-1">單位</legend>
                <input type="text" className="input" />
              </fieldset>
            </div>
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">商品描述</legend>
              <textarea className="textarea h-24"></textarea>
            </fieldset>
            <div className="flex items-center gap-3">
              <legend className="text-lg mb-1">啟用</legend>
              <input
                type="checkbox"
                defaultChecked
                className="toggle toggle-warning"
              />
            </div>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="text-lg mb-1">檔案上傳</legend>
              <div className="flex items-center gap-3">
                <input type="file" className="file-input" />
                <button className="btn btn-outline btn-info">新增檔案</button>
              </div>
              <label className="label">Max size 2MB</label>
            </fieldset>
            <div>
              <h3 className="text-lg mb-2">已上傳圖片</h3>
              <div className="grid grid-cols-3 gap-2">
                <img src={ring} alt="" />
                <img src={ring} alt="" />
                <img src={ring} alt="" />
                <img src={ring} alt="" />
                <img src={ring} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-2">
          <button className="btn btn-soft" onClick={closeModal}>
            取消
          </button>
          <button className="btn btn-warning">儲存</button>
        </div>
      </section>
    </>
  );
}
