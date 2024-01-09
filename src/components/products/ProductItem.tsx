import { useState } from "react";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../api/apiSlice";
import { Link } from "react-router-dom";
const ProductItem = ({ product }: { product: any }) => {
    const onFileChange = (fileChangeEvent: any) => {
        setFile(fileChangeEvent.target.files[0]);
    }
   
    const [file, setFile] = useState(null) as any;
    const [name, setName] = useState(product.name);
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [isEdit, setIsEdit] = useState(false);
    const update = async (product: any) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('name', product.name);
        formData.append('id', product.id);
        if (file !== null) {
            formData.append('file', file, file.name);
            await updateProduct({ id: product.id, formData }).unwrap()
        }
        else {
            await updateProduct({ id: product.id, formData }).unwrap()
        }
    }
    return (
        <div className="my-[2em] p-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>{product.id}</div>
            <div>
                <p>{product.name}</p>
            </div>
            <div>
                <p>{product.model}</p>
            </div>
            <div>
                <p>{product.brand.name}</p>
            </div>
            <div>
                {
                    product.subCategories?.map((subCategory: any) => {
                        return <p key={subCategory.name}>{subCategory.name}</p>
                    })
                }
            </div>
            <div>
                {
                    product.sizes?.map((sizeProduct: any) => {
                        return <p key={sizeProduct.id}>{sizeProduct.size.CM}-{sizeProduct.quantity}</p>
                    })
                }
            </div>
            <div>
                {
                   
                 <img className="w-[50px]" src={`${import.meta.env.VITE_LOCALHOST_URL}${product?.images[0]?.imagePath}`}/>
                
                }
            </div>
            <div>
                 <Link className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-2" to={`/dashboard/products/${product?.id}`}>Edit</Link>
                 <button onClick={() => deleteProduct(product.id).then(() => {
                    alert("deleted");
                })} className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    )
}
export default ProductItem;