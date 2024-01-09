const PreviewImage = ({ images, removeImage }:any) => {
    const files = [...images]
    return (
        <div className="flex flex-row">
            {Array.isArray(files)
        ? files?.map((image:any, index:any) => {
                return (
                    <div key={index} className="m-2">
                        <img className="w-[6em] h-[6em]" src={URL.createObjectURL(image)} alt="" />
                        <button type="button" onClick={removeImage(index)}>Remove</button>
                    </div>
                )}
            ) : null}
            
        </div>
    )
}
export default PreviewImage