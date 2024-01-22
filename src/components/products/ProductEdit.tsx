import { useParams } from "react-router-dom";
import { useGetBrandsQuery, useGetCategoriesQuery, useGetProductByIdQuery, useGetSizesQuery, useGetSybCategoriesQuery, useDeleteProductImageMutation, useUpdateProductMutation } from "../../api/apiSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useMemo, useRef } from "react";
import Select from "react-select";
const ProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const refQuantitySize = useRef<HTMLInputElement>(null)
    const refSelectedSize = useRef<any>(null)
    const refSelectCategory = useRef<any>(null)
    const [sizesProduct, setSizesProduct] = useState<any>([])
    const [editedSizes, setEditedSizes] = useState<any>([])
    const [images, setImages] = useState<any>()
    const { data: product,
        isLoading,
        isSuccess,
        isError,
        error } = useGetProductByIdQuery(id, { refetchOnMountOrArgChange: true });
    const { data: brands,
        isLoading: brandsIsLoading,
        isSuccess: brandsIsSuccess,
         } = useGetBrandsQuery(id, { refetchOnMountOrArgChange: true }) as any;
    // Assuming 'id' is a variable that you're passing to the hook
    const { data: categories, isLoading: categoriesIsLoading, isSuccess: categoriesIsSuccess } = useGetCategoriesQuery(id, { refetchOnMountOrArgChange: true }) as any;
    const { data: subCategories,
        isLoading: subCategoriesIsLoading,
        isSuccess: subCategoriesIsSuccess,
       } = useGetSybCategoriesQuery(id, { refetchOnMountOrArgChange: true });

    const { data: sizes,
        isLoading: sizeIsLoading,
         } = useGetSizesQuery(id, { refetchOnMountOrArgChange: true });

    const [deleteProductImage ] = useDeleteProductImageMutation();
    const [updateSingleProduct] = useUpdateProductMutation();
    const [currentCat, setCurrentCategory] = useState<any>(categories?.[0]?.id)
    const filteredSubCategories = useMemo(() => {
        const subs = subCategories?.filter((subCategory: any) => {
            return subCategory.category.id == currentCat
        })
        return subs;
    }, [currentCat])
    const changeCategory = (e: any) => {
        setCurrentCategory(e.value)
    }
    const updateProduct = async (event: any) => {
        event.preventDefault();
        const name = event.currentTarget.name.value;
        const model = event.currentTarget.model.value;
        const brandId = event.currentTarget.brand.value;
        const price = event.currentTarget.price.value;
        const curencyPrice = event.currentTarget.curencyPrice.value;
        const discount = event.currentTarget.discount.value;
        const description = event.currentTarget.description.value;
        console.log(name, model, brandId, price, curencyPrice, discount, description)
        console.log(sizesProduct)
        console.log(images)
        console.log(refSelectCategory.current.state.selectValue.map((value: any) => value.value));
        const formData = new FormData();
        formData.append('name', name);
        formData.append('model', model);
        formData.append('brandId', brandId);
        formData.append('price', price);
        formData.append('curencyPrice', curencyPrice);
        formData.append('discount', discount);
        formData.append('description', description);
        formData.append('subCategories', JSON.stringify(refSelectCategory.current.state.selectValue.map((value: any) => value.value)));
        formData.append('sizes', JSON.stringify([...sizesProduct, ...editedSizes.map((size: any) => {return {sizeId: size.size.id, quantity: size.quantity, sizeName: size.size.CM}})]));
        if(images!==undefined){
            for (let i = 0; i < images.length; i++) {
                formData.append('files', images[i]);
            }
        }
        
        updateSingleProduct({ id: id, data: formData }).unwrap()
    }
    const addSize = () => {
        setSizesProduct([...sizesProduct, {
            sizeId: refSelectedSize.current.state.selectValue[0].value,
            quantity: refQuantitySize?.current?.value,
            sizeName: refSelectedSize.current.state.selectValue[0].label
        }])
    }
    const uploadNewPhoto = (e: any) => {
        setImages(e.target.files)
    }
    const changeQuantitySizes = (e:any, size: any) => {
        console.log(size)
        console.log(e.target?.value)
        const newSizes = product.sizes.map((sizeProduct: any) => {
            console.log(sizeProduct)
            if (sizeProduct.size.id === size.size.id) {
                return { ...sizeProduct, quantity: e.target?.value }
            }
            else {
                return sizeProduct
            }
        })
        console.log(newSizes)
        setEditedSizes([...newSizes])
    }
    let content;
    if (isLoading) {
        content = <div>Loading...</div>
    }
    else if (isSuccess && brandsIsSuccess && categoriesIsSuccess && subCategoriesIsSuccess) {
        content = <div>
            <form className="grid grid-cols-4 gap-3" onSubmit={(e) => updateProduct(e)}>
                <div className="col-span-2">
                    <label htmlFor="name">Назва</label>
                    <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" id="name" placeholder="name" name="name" defaultValue={product.name} />
                </div>
                <div className="col-span-2">
                    <label htmlFor="model">Номер моделі</label>
                    <input className="w-full border border-gray-300 rounded px-4 py-2" type="text" placeholder="model" name="model" defaultValue={product.model} />
                </div>
                <div className="col-span-2">
                    <label htmlFor="price">Ціна закупк $</label>
                    <input className="w-full border border-gray-300 rounded px-4 py-2" type="number" placeholder="price" name="price" defaultValue={product.price} />
                </div>
                <div className="col-span-1">
                    <label htmlFor="curencyPrice">Курс $ до UAH</label>
                    <input className="w-full border border-gray-300 rounded px-4 py-2" type="number" placeholder="curencyPrice" name="curencyPrice" defaultValue={product.curencyPrice} />
                </div>
                <div className="col-span-1">
                    <label htmlFor="discount">Знижка у відстках</label>
                    <input className="w-full border border-gray-300 rounded px-4 py-2" type="number" placeholder="discount" name="discount" defaultValue={product.discount} />
                </div>
                <div className="col-span-4">
                    <label htmlFor="description">Опис товару</label>
                    <textarea className="w-full border border-gray-300 rounded px-4 py-2" placeholder="description" name="description" defaultValue={product.description} />
                </div>
                <div className="col-span-2">
                    <label htmlFor="discount">Бренд</label>
                    <Select
                        name="brand"
                        defaultValue={{   label: product.brand.name,
                            value: product.brand.id}}
                        isLoading={brandsIsLoading && isLoading}
                        options={brands?.map((value: any) => ({
                            label: value.name,
                            value: value.id,
                        }))}
                        className="w-full"
                        classNamePrefix="select"
                    />

                </div>
                <div className="col-span-2">
                    <label htmlFor="discount">Категорія</label>
                    <Select
                        onChange={(e) => { changeCategory(e) }}
                        name="category"
                        isLoading={categoriesIsLoading}
                        defaultValue={{
                            label: product.subCategories[0].category.name,
                            value: product.subCategories[0].category.id
                        }}
                        options={categories?.map((value: any) => ({
                            label: value.name,
                            value: value.id,
                        }))}
                        className="w-full"
                        classNamePrefix="select"
                    />
                </div>
                <div className="col-span-3">
                    <Select
                        isMulti
                        name="subCategories"
                        ref={refSelectCategory}
                        isLoading={subCategoriesIsLoading}
                        defaultValue={product.subCategories?.map((value: any) => ({
                            label: value.name,
                            value: value.id,
                        }))}
                        options={filteredSubCategories?.map((value: any) => ({
                            label: value.name,
                            value: value.id,
                        }))}
                        className="lg:w-1/2 w-full"
                        classNamePrefix="select"
                    />
                </div>
                <div className="col-span-4 flex flex-row border-2 p-2 justify-between">
                    <h3>Розміри</h3>
                    <div className="flex flex-row">
                   
                    {
                        product.sizes.map((size: any) => {
                            return <div key={size.id} className="col-span-1">
                                <label htmlFor="discount">{size.size.CM}</label>
                                <input onChange={(e)=>changeQuantitySizes(e, size)} className="w-full border border-gray-300 rounded px-4 py-2" type="number" placeholder="quantity" defaultValue={size.quantity} />
                            </div>
                        }
                        )
                    }
                    {sizesProduct.map((size: any) => {
                        return <div key={size.sizeId}>
                            <label htmlFor="discount">{size.sizeName} - {size.quantity}</label>
                        </div>
                    })
                    }
                     </div>
                    <div className="col-span-4 flex flex-row justify-between">
                       
                        <Select
                            name="sizes"
                            ref={refSelectedSize}
                            isLoading={sizeIsLoading}
                            options={sizes?.map((value: any) => ({
                                label: value.CM,
                                value: value.id,
                            }))}
                            className="col-span-2 mb-3 h-full"
                            classNamePrefix="select"
                        />
                        <div>
                        <input ref={refQuantitySize} type='number' className='rounded-md border-2' id='quantity' name='quantity' />
                        </div>
                        <div>
                            <button type='button' className='rounded-md bg-green-300 col-span-4 p-1' onClick={addSize}>Додати розмір</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border-2 p-2">
                    <h3>Фото</h3>
                    <div className="flex flex-row">
                        {
                            product.images.map((image: any) => {
                                return <div key={image.id}>
                                    <img className="w-[150px]" src={`${import.meta.env.VITE_API_URL}${image?.imagePath}`} />
                                    <button type="button" onClick={() => deleteProductImage(image.id).unwrap()}>Видалити</button>
                                </div>
                            })
                        }
                    </div>
                    <input onChange={(e) => uploadNewPhoto(e)} type="file" multiple />
                    <div className="flex flex-row">
                        {
                            images?.length > 0 && Array.from(images).map((image: any, index: number) => {
                                return <div key={index}><img className="w-[150px]" src={URL.createObjectURL(image)} /><button>видалити</button></div>
                            }
                            )
                        }
                    </div>
                </div>
                <div className="col-span-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Зберегти</button>
                </div>
            </form>
        </div>
    }
    else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return (
        <>
            <DashboardLayout>
                {content}
            </DashboardLayout>
        </>
    )
}
export default ProductEdit;