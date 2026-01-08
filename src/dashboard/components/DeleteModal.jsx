export function DeleteProduct({ closeModal,onHandleDeleteProduct }) {
  return (
    <>
      <div className="fixed bg-black/70 inset-0"></div>
      <div className="w-[300px] m-auto h-fit bg-slate-800 border border-white rounded-md fixed inset-0">
        <div className="px-5 py-4 flex flex-col gap-4">
          <p className="text-2xl text-white font-bold">確定刪除？</p>
          <div className="flex gap-2 justify-end">
            <button className="btn btn-soft" onClick={closeModal}>取消</button>
            <button className="btn btn-error" onClick={onHandleDeleteProduct}>刪除</button>
          </div>
        </div>  
      </div>
    </>
  );
}
