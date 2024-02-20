/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from 'react'
import {
    useGetCategoriesQuery,
    useGetColoresQuery,
    useGetSizesQuery,
    useGetSybCategoriesQuery,
    useNewProductMutation,
    useGetDiscountsQuery,
    useGetGendersQuery,
    useGetFeaturesQuery,
    useGetSeasonesQuery
} from '../../api/apiSlice'
import { useGetBrandsQuery } from '../../api/apiSlice'
import PreviewImage from './PreviewImage'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import styles from './ProductNew.module.sass'
import Select from 'react-select';
import CustomInput from '../UI/CustomInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomSelect } from '../UI/CustomSelect';
import { CustomTextarea } from '../UI/CustomTextarea';
const statuses = [
    { name: "Новий" },
    { name: "В наявності" },
    { name: "Закінчився" },
    { name: "Видалений" },
    { name: "Відсутній" },
    { name: "Відновлено" }
]

type SelectOption = {
    label: string,
    value: string
}
type SelectSizeOption = {
    sizeId: string,
    quantity: number,
}
type SelectFeatureOption = {
    featureId: string,
    description: string,
}
const ProductNew = () => {
    const methods = useForm()
    const [isSizesOpen, setIsSizesOpen] = useState<boolean>(true)
    const [isFeatureOpen, setIsFeaturesOpen] = useState<boolean>(true)
    const refQuantitySize = useRef<any>(null)
    const refFeatureDescription = useRef<any>(null)
    const refFeature = useRef<any>(null)
    const refSelectedSize = useRef<any>(null)
    const subCategoriesRef = useRef<any>(null)
    const [addNewProduct] = useNewProductMutation()
    const { data: brands,
        isLoading: isLoadingBrands,
    } = useGetBrandsQuery(null, { refetchOnMountOrArgChange: true }) as any
    const { data: genders,
        isLoading: isLoadingGenders,
    } = useGetGendersQuery(null, { refetchOnMountOrArgChange: true }) as any
    const { data: seasones,
        isLoading: isLoadingSeasones,
    } = useGetSeasonesQuery(null, { refetchOnMountOrArgChange: true }) as any
    const { data: features,
        isLoading: isLoadingFeatures,
    } = useGetFeaturesQuery(null, { refetchOnMountOrArgChange: true }) as any
    const { data: discounts,
        isLoading: isLoadingDiscounts,
    } = useGetDiscountsQuery(null, { refetchOnMountOrArgChange: true }) as any
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const { data: sizes, isLoading: sizeIsLoading,
    } = useGetSizesQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const { data: subCategories,
        isLoading: isLoadingSubCategories,
    } = useGetSybCategoriesQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const {
        data: colores,
        isLoading: isLoadingColores,
    } = useGetColoresQuery(undefined, { refetchOnMountOrArgChange: true }) as any
    const [images, setImages] = useState<any>()
    const [sizesProduct, setSizesProduct] = useState<any>([])
    const [featuresProduct, setFeaturesProduct] = useState<any>([])
    const [currentCat, setCurrentCategory] = useState<any>(categories?.[0].id)
    const onFileChange = (e: any) => {
        setImages(e.target.files)
    }
    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
        const { name, model, brandId, price, curencyPrice, discountId, description, gender, seasone, status, colores, subCategories } = data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('model', model);
        formData.append('brandId', brandId.value);
        formData.append('price', price);
        formData.append('curencyPrice', curencyPrice);
        formData.append('discount', discountId.value);
        formData.append('description', description);
        formData.append('genderId', gender.value);
        formData.append('seasoneId', seasone.value);
        formData.append('status', status.value);
        formData.append('colores', JSON.stringify(colores.map((colore: SelectOption) => colore.value)));
        formData.append('features', JSON.stringify(featuresProduct?.map((feature: SelectFeatureOption) => {
            return { featureId: feature.featureId, description: feature.description }
        })));
        formData.append('subCategories', JSON.stringify(subCategories?.map((subCat: SelectOption) => subCat.value)));
        if (images !== undefined) {
            for (let i = 0; i < images.length; i++) {
                formData.append('files', images[i]);
            }
        }
        formData.append('sizes', JSON.stringify(sizesProduct.map((size: SelectSizeOption) => {
            return { sizeId: size.sizeId, quantity: size.quantity }
        })));
        try {
            addNewProduct(formData).unwrap()
        }
        catch (err) {
            console.log(err)
        }

    })

    const removeImage = (index: number) => {
        return () => {
            const newImages = [...images]
            newImages.splice(index, 1)
            setImages(newImages)
        }
    }
    const removeSize = (size: any) => {
        return () => {
            const newSizes = [...sizesProduct]
            const index = newSizes.indexOf(size)
            newSizes.splice(index, 1)
            setSizesProduct(newSizes)
        }
    }
    const filteredSubCategories = useMemo(() => {
        const subs = subCategories?.filter((subCategory: any) => {
            return subCategory.category.id == currentCat
        })
        return subs;
    }, [currentCat])
    const changeCategory = (e: any) => {
        if (subCategoriesRef.current.state.selectValue.length !== 0) {
            //clear ref
            subCategoriesRef.current.clearValue()
        }
        setCurrentCategory(e.value)

    }
    const addSize = () => {
        if (refSelectedSize.current.state.selectValue.length === 0 || refQuantitySize.current.value === "") {
            return
        }
        if (sizesProduct.find((size: any) => size.sizeId === refSelectedSize.current.state.selectValue[0].value)) {
            const newSizes = [...sizesProduct]
            const index = newSizes.findIndex((size: any) => size.sizeId === refSelectedSize.current.state.selectValue[0].value)
            newSizes[index].quantity += +refQuantitySize.current.value
            setSizesProduct(newSizes)
        }
        else {
            const sizeId = refSelectedSize.current.state.selectValue[0].value
            const sizeName = refSelectedSize.current.state.selectValue[0].label
            const quantity = +refQuantitySize.current.value
            setSizesProduct([...sizesProduct, {
                sizeId,
                quantity,
                sizeName
            }])
        }

    }
    const addDescrtiptionFeature = () => {

        if (refFeature.current.state.selectValue.length === 0 || refFeatureDescription.current.value === "") {
            return
        }
        if (featuresProduct.find((feature: any) => feature.featureId === refFeature.current.state.selectValue[0].value)) {
            const newFeatures = [...featuresProduct]
            const index = newFeatures.findIndex((feature: any) => feature.featureId === refFeature.current.state.selectValue[0].value)
            newFeatures[index].description = refFeatureDescription.current.value
            setFeaturesProduct(newFeatures)
        }
        else {
            const featureId = refFeature.current.state.selectValue[0].value
            const featureName = refFeature.current.state.selectValue[0].label
            const description = refFeatureDescription.current.value
            setFeaturesProduct([...featuresProduct, {
                featureId,
                description,
                featureName
            }])
        }

    }
    const removeFeature = (feature: any) => {
        const newFeatures = [...featuresProduct]
        const index = newFeatures.indexOf(feature)
        newFeatures.splice(index, 1)
        setFeaturesProduct(newFeatures)

    }

    return (
        <FormProvider {...methods}>
            <form
                className="p-5 rounded-md shadow-lg bg-yellow-200 grid grid-cols-1 gap-2 md:grid-cols-4"
                onSubmit={e => e.preventDefault()}
                noValidate
                autoComplete="off"
            >
                <h1 className="font-bold mb-4 col-span-1 md:col-span-4">Додати новий товар</h1>
                <CustomInput
                    label="Назва"
                    type="text"
                    id="name"
                    placeholder="Назва"
                    validation={{
                        required: {
                            value: true,
                            message: 'Обовязкове поле',
                        },
                        minLength: {
                            value: 6,
                            message: 'Мінімум 6 символів',
                        },
                    }}
                />
                <CustomInput
                    label="Номер моделі"
                    type="text"
                    id="model"
                    placeholder="Номер моделі"
                    validation={{
                        required: {
                            value: true,
                            message: 'Обовязкове поле'
                        },
                        minLength: {
                            value: 4,
                            message: 'Мінімум 4 символів'
                        }
                    }}
                />

                {isLoadingBrands ? null : <CustomSelect placeholder="Бренд" label="Бренд" id="brandId" options={brands?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingBrands} control={methods.control} />}

                {isLoadingColores ? null : <CustomSelect placeholder="Колір" label="Колір" id="colores" isMulti={true} options={colores?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingColores} control={methods.control} />}
                <CustomInput
                    label="Ціна закупки"
                    type="text"
                    id="price"
                    placeholder="Ціна закупки 0.0"
                    validation={{
                        required: {
                            value: true,
                            message: 'Обовязкове поле'
                        },
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: 'Невірний формат ціни'
                        }
                    }}
                />

                <CustomInput
                    label="Курс при закупці"
                    type="text"
                    id="curencyPrice"
                    placeholder="Курс при закупці 0.0"
                    validation={{
                        required: {
                            value: true,
                            message: 'Обовязкове поле'
                        },
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: 'Невірний формат ціни'
                        }
                    }}
                />

                {isLoadingDiscounts ? null : <CustomSelect placeholder="Знижка" label="Знижка" id="discountId" options={discounts?.map((value: any) => ({
                    label: value.percentage,
                    value: value.id,
                }))} isLoading={isLoadingDiscounts} control={methods.control} />}

                {isLoadingGenders ? null : <CustomSelect placeholder="Стать" label="Стать" id="gender" options={genders?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingGenders} control={methods.control} />}

                {isLoadingSeasones ? null : <CustomSelect placeholder="Сезон" label="Сезон" id="seasone" options={seasones?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingSeasones} control={methods.control} />}

                {isLoadingCategories ? null : <CustomSelect onChangeValue={changeCategory} placeholder="Категорія" label="Категорія" id="category" options={categories?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingCategories} control={methods.control} />}

                {isLoadingSubCategories ? null : <CustomSelect refSelect={subCategoriesRef} onChange={null} isMulti={true} placeholder="Під категорія" label="Підкатегорія" id="subCategories" options={filteredSubCategories?.map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }))} isLoading={isLoadingSubCategories} control={methods.control} />}
                <CustomSelect placeholder="Статус" label="Статус" id="status" options={statuses.map((value: any) => ({
                    label: value.name,
                    value: value.name,
                }))} isLoading={false} control={methods.control} />
                <CustomTextarea label="Опис" id="description" placeholder="Опис" validation={{
                    required: {
                        value: true,
                        message: 'Обовязкове поле'
                    },
                    minLength: {
                        value: 10,
                        message: 'Мінімум 10 символів'
                    }
                }} />
                <div className="mb-2 flex flex-row col-span-1 md:col-span-4">
                    {/* <label className="mb-2" htmlFor="image"></label> */}
                    <div>
                        <label className="block mb-2" htmlFor="multiple_files">Фото</label>
                        <input
                            className="h-auto p-2 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type="file"
                            id="images"
                            name={images}
                            onChange={(e) => onFileChange(e)}
                            multiple />
                    </div>

                    {
                        images ?
                            <div><PreviewImage removeImage={removeImage} images={images} /></div> : null
                    }
                </div>
                <IconContext.Provider value={{ size: '1.5em', className: "global-class-name" }}>
                    <h2 className='col-span-1 md:col-span-4'>Додати Розміри</h2>
                    <span className='border-t-4 border-white relative col-span-1 md:col-span-4 mt-4 mb-4'>
                        <button type='button' onClick={() => setIsSizesOpen(curr => curr = !curr)} className='absolute left-[50%] top-[-14px]'>{isSizesOpen ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}</button>
                    </span>
                </IconContext.Provider>
                <div className={`${isSizesOpen ? "hidden" : "flex"} mb-2 flex-row col-span-1 md:col-span-4 border-2 border-[#bebebe] p-2 ${styles.animatedDiv}`}>
                    <div className='flex flex-col border-r-4 border-black pr-6 pb-3'>
                        <div className='mb-2'>
                            <label htmlFor='sizes'>Розмір</label>
                            <Select
                                ref={refSelectedSize}
                                name="sizes"
                                isLoading={sizeIsLoading}
                                options={sizes?.map((value: any) => ({
                                    label: value.CM,
                                    value: value.id,
                                }))}
                                className="rounded-sm text-sm"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className='mb-2 flex flex-col'>
                            <label htmlFor='quantity'>Кількість</label>
                            <input type='number' className='rounded-sm p-2 text-sm' id='quantity' name='quantity' ref={refQuantitySize} />
                        </div>

                        <button type='button' onClick={addSize} className='bg-[#87410F] hover:bg-[#ab6530] text-[#EAEAEA] px-2 py-3 rounded-[5px] '>Додати розмір</button>
                    </div>
                    <div className='flex flex-row ml-5'>
                        {
                            sizesProduct?.map((size: any, index: number) => {
                                return (
                                    <div key={index} className='flex flex-col rounded-md shadow-lg p-2 mr-2 justify-between items-center bg-gray-800 text-white'>
                                        <p>{size.sizeName}</p>
                                        <p>{size.quantity}</p>
                                        <button type='button' onClick={removeSize(size)} className='hover:bg-[#ab6530] self-end bg-[#87410F] border-2 border-[#bebebe] text-[#EAEAEA] p-[4px] rounded-[5px] '>Видалити</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <IconContext.Provider value={{ size: '1.5em', className: "global-class-name" }}>
                    <h2 className='col-span-1 md:col-span-4'>Додати Характеристики</h2>
                    <span className='border-t-4 border-white relative col-span-1 md:col-span-4 mt-4 mb-4'>
                        <button type='button' onClick={() => setIsFeaturesOpen(curr => curr = !curr)} className='absolute left-[50%] top-[-12px]'>{isFeatureOpen ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}</button>
                    </span>
                    <div className={`${isFeatureOpen ? "hidden" : "flex"} mb-2 flex-row col-span-1 md:col-span-4 border-2 border-[#bebebe] p-2 ${styles.animatedDiv}`}>
                        <div className='flex flex-col border-r-4 border-black pr-6 pb-3'>
                            <div className='mb-2'>
                                <label htmlFor='features'>Характеристика</label>
                                <Select
                                    ref={refFeature}
                                    name="features"
                                    isLoading={isLoadingFeatures}
                                    options={features?.map((value: any) => ({
                                        label: value.name,
                                        value: value.id,
                                    }))}
                                    className="rounded-sm text-sm"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className='mb-2 flex flex-col'>
                                <label htmlFor='featureDesc'>Кількість</label>
                                <textarea className='rounded-sm p-2 text-sm' id='featureDesc' name='featureDesc' ref={refFeatureDescription}></textarea>
                            </div>

                            <button type='button' onClick={addDescrtiptionFeature} className='bg-[#87410F] hover:bg-[#ab6530] text-[#EAEAEA] px-2 py-3 rounded-[5px] '>Додати Характеристику</button>
                        </div>
                        <div className='flex flex-row ml-5'>
                            {
                                featuresProduct?.map((feature: any, index: number) => {
                                    return (
                                        <div key={index} className='flex flex-col rounded-md shadow-lg p-2 mr-2 justify-between items-center bg-gray-800 text-white'>
                                            <p>{feature.name}</p>
                                            <p>{feature.description}</p>
                                            <button onClick={() => removeFeature(feature)} className='hover:bg-[#ab6530] self-end bg-[#87410F] border-2 border-[#bebebe] text-[#EAEAEA] p-[4px] rounded-[5px] '>Видалити</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </IconContext.Provider>
                <div className="mb-2 flex flex-col col-span-1 md:col-span-4">
                    <button className="bg-[#87410F] hover:bg-[#ab6530] text-[#EAEAEA] self-end px-4 py-3 rounded-md" onClick={onSubmit} type="submit">Create</button>
                </div>
            </form>
        </FormProvider>

    );
}
export default ProductNew;