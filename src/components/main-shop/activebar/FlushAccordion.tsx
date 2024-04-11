import { useGetBrandsQuery, useGetCategoriesQuery, useGetColoresQuery, useGetSubCategoriesQuery } from '../../../api/apiSlice';
import AccordionItem from './AccordionItem';
import AccordionItemColores from './AccordionItemColores';
import AccordionItemSubCat from './AccordionItemSubCat';
import AccordionPriceRange from './AccordionPriceRange';
const FlushAccordion = () => {
  const {
    data: brands
  } = useGetBrandsQuery<any>({} as any);
  const {
    data: categories
  } = useGetCategoriesQuery<any>({} as any);
  const {
    data: subCategories
  } = useGetSubCategoriesQuery<any>({} as any);
  const {
    data: colores
  } = useGetColoresQuery<any>({} as any);

  return (
    <div className="divide-y divide-gray-200">
        <AccordionItem elements={brands} filterName="brands" title="Бренди"/>
        <AccordionItem elements={categories} filterName="categories" title="Категорії"/>
        <AccordionItemSubCat elements={subCategories} filterName="subCategories" title="Підкатегорії"/>
        <AccordionItemColores elements={colores} filterName="colores" title="Колір"/>
        <AccordionPriceRange title="Ціна"/>
    </div>
  );
};

export default FlushAccordion;
