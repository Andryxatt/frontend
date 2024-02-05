import { useParams } from "react-router-dom";
import { useGetBrandsQuery, useGetCategoriesQuery, useGetProductByIdQuery, useGetSizesQuery, useGetSybCategoriesQuery, useDeleteProductImageMutation, useUpdateSingleProductMutation, useGetDiscountsQuery } from "../../api/apiSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useMemo, useRef } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CustomInput from "../UI/CustomInput";
import { CustomTextarea } from "../UI/CustomTextarea";
type ProductEdit = {
    data: any,
    isLoading: boolean
}
const ProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const methods = useForm()
    const notifySuccess = () => toast("Товар оновлено!");
    const refQuantitySize = useRef<HTMLInputElement>(null)
    const refSelectedSize = useRef<any>(null)
    const refSelectCategory = useRef<any>(null)
    const [sizesProduct, setSizesProduct] = useState<any>([])
    const [editedSizes, setEditedSizes] = useState<any>([])
    const [images, setImages] = useState<any>()
    const { data: product, isLoading: isProductsLoading } = useGetProductByIdQuery<ProductEdit>(id);
    const { data: brands,
    } = useGetBrandsQuery(id, { refetchOnMountOrArgChange: true }) as any;
    // Assuming 'id' is a variable that you're passing to the hook
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery(null, { refetchOnMountOrArgChange: true }) as any;
    const { data: subCategories,
        isLoading: subCategoriesIsLoading,
    } = useGetSybCategoriesQuery(id, { refetchOnMountOrArgChange: true });

    const { data: sizes,
        isLoading: sizeIsLoading,
    } = useGetSizesQuery(id, { refetchOnMountOrArgChange: true });
    const { data: discounts,
    } = useGetDiscountsQuery(null, { refetchOnMountOrArgChange: true });

    const [deleteProductImage] = useDeleteProductImageMutation();
    const [updateSingleProduct] = useUpdateSingleProductMutation();
    const [currentCat, setCurrentCategory] = useState<any>(categories?.[0]?.id)
    const filteredSubCategories = useMemo(() => {
        const subs = subCategories?.filter((subCategory: any) => {
            return subCategory.category?.id == currentCat
        })
        return subs;
    }, [currentCat])
    const changeCategory = (e: any) => {
        setCurrentCategory(e.value)
    }

    const onSubmit = methods.handleSubmit((data: any) => {
        const { name, description, model, brandId, price, curencyPrice, discount } = data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('model', model);
        formData.append('brandId', brandId.value);
        formData.append('price', price);
        formData.append('curencyPrice', curencyPrice);
        formData.append('discountId', discount.value);
        formData.append('description', description);
        formData.append('status', "1");
        formData.append('genderId', "1");
        formData.append('seasoneId', "1");
        formData.append('subCategories', JSON.stringify(refSelectCategory.current.state.selectValue.map((value: any) => value.value)));
        formData.append('sizes', JSON.stringify([...sizesProduct, ...editedSizes.map((size: any) => { return { sizeId: size.size.id, quantity: size.quantity, sizeName: size.size.CM } })]));
        if (images !== undefined) {
            for (let i = 0; i < images.length; i++) {
                formData.append('files', images[i]);
            }
        }
        try {
            updateSingleProduct({data:formData, id: product?.id}).unwrap();
            notifySuccess();
        } catch (error) {
            console.log(error);
        }

    })
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
    const changeQuantitySizes = (e: any, size: any) => {
        const newSizes = product?.sizes.map((sizeProduct: any) => {
            if (sizeProduct?.size.id === size.size.id) {
                return { ...sizeProduct, quantity: e.target?.value }
            }
            else {
                return sizeProduct
            }
        })
        setEditedSizes([...newSizes])
    }

    return (
        <DashboardLayout>
            <FormProvider {...methods}>
                {!isProductsLoading && <form onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">
                    <div>
                        <CustomInput
                            label="Назва"
                            value={product?.name}
                            type="text"
                            id="name"
                            placeholder="Назва"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Мінімум 3 символів',
                                },
                            }}
                        />
                    </div>
                    <div>
                        <CustomInput
                            label="Модель"
                            value={product?.model}
                            type="text"
                            id="model"
                            placeholder="Модель"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Мінімум 3 символів',
                                },
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <CustomInput
                            label="Ціна закупки $"
                            value={product?.price}
                            type="text"
                            id="price"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
                            }}
                        />
                    </div>
                    <div>
                        <CustomInput
                            label="Курс $ до UAH"
                            value={product?.curencyPrice}
                            type="text"
                            id="curencyPrice"
                            placeholder="0"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле',
                                }
                            }}
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="discount">Знижка</label>
                        <Controller
                            name="discount"
                            defaultValue={{
                                label: product?.discount.percentage,
                                value: product?.discount.id,
                            }}
                            render={({ field }: any) => (
                                <Select
                                    {...field}
                                    options={
                                        discounts?.map((value: any) => ({
                                            label: value.percentage,
                                            value: value.id,
                                        }))
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="col-span-4">
                        <CustomTextarea
                            value={product?.description}
                            label="Опис"
                            id="description"
                            placeholder="Опис"
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Обовязкове поле'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Мінімум 10 символів'
                                }
                            }} />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="brand">Бренд</label>
                        <Controller
                            name="brandId"
                            defaultValue={{
                                label: product?.brand.name,
                                value: product?.brand.id,
                            }}
                            render={({ field }: any) => (
                                <Select
                                    {...field}
                                    options={
                                        brands?.map((value: any) => ({
                                            label: value.name,
                                            value: value.id,
                                        }))
                                    }
                                />
                            )}
                        />


                    </div>
                    <div className="col-span-2">
                        <label htmlFor="category">Категорія</label>
                        <Select
                            onChange={(e) => { changeCategory(e) }}
                            name="category"
                            isLoading={categoriesIsLoading}
                            defaultValue={{
                                label: product?.subCategories[0].category.name,
                                value: product?.subCategories[0].category.id
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
                        <label htmlFor="category">Підкатегорія</label>
                        <Select
                            isMulti
                            name="subCategories"
                            ref={refSelectCategory}
                            isLoading={subCategoriesIsLoading}
                            defaultValue={product?.subCategories?.map((value: any) => ({
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
                                product?.sizes.map((size: any) => {
                                    return <div key={size.id} className="col-span-1">
                                        <label htmlFor="discount">{size.size.CM}</label>
                                        <input onChange={(e) => changeQuantitySizes(e, size)} className="w-full border border-gray-300 rounded px-4 py-2" type="number" placeholder="quantity" defaultValue={size.quantity} />
                                    </div>
                                }
                                )
                            }
                            {sizesProduct?.map((size: any) => {
                                return <div key={size.sizeId}>
                                    <label htmlFor="size">{size.sizeName} - {size.quantity}</label>
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
                                product?.images.map((image: any) => {
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
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onSubmit} type="submit">Зберегти</button>
                    </div>
                </form>
                }
            </FormProvider>

        </DashboardLayout>
    )
}
export default ProductEdit;