export interface Brand {
    id: number;
    name: string;
    description: string;
    iconPath?: string;
    categoryId: number;
}
export interface NewBrand extends Omit<Brand, 'id'> {}
export interface BrandFormData {
    name: string;
    description: string;
    iconPath?: string;
    file: File; // Assuming fileAdded is of type File
}