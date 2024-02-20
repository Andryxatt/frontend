import AccordionItem from './AccordionItem';
const FlushAccordion = ({ filters }:any) => {
  return (
    <div className="divide-y divide-gray-200">
        <AccordionItem elements={filters} filterName="brand" title="Бренди"/>
        <AccordionItem elements={filters} filterName="subCategories" title="Категорії"/>
        
    </div>
  );
};

export default FlushAccordion;
