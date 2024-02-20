import AccordionItem from './AccordionItem';
const FlushAccordion = ({ filters, isLoaded }:any) => {
  return (
    <div className="divide-y divide-gray-200">
        <AccordionItem elements={filters} isLoaded={isLoaded} filterName="brand" title="Бренди"/>
        <AccordionItem elements={filters} isLoaded={isLoaded} filterName="subCategories" title="Категорії"/>
        
    </div>
  );
};

export default FlushAccordion;
