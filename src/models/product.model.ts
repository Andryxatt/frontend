import { Brand } from "./brand.model";
import { Color } from "./color.model";
import { Discount } from "./discount.model";
import { Feature } from "./feature.model";
import { Gender } from "./gender.model";
import { Season } from "./seasone.model";
import { SubCategory } from "./sub-category.model";

export interface Product {
    id: number;
    name: string;
    model: string;
    brandId: number | Brand;
    qrCode?: string;
    subCategories: SubCategory[];
    sizesProduct: number[];
    images: string[];
    price: number;
    discount: number | Discount;
    curencyPrice: number;
    roles: string[];
    description: string;
    features: number[] | Feature[];
    colores: Color[];
    gender: Gender | number;
    seasone: number | Season;
    status: string;
}
export interface ProductInformation {
    id: string;
    name: string;
    model: string;
    brand: Brand;
    qrCode?: string;
    subCategories: SubCategory[];
    sizes: any[];
    images: any[];
    price: number;
    discount: Discount;
    curencyPrice: number;
    roles: string[];
    description: string;
    features: Feature[];
    colores: Color[];
    gender: Gender;
    seasone: Season;
    status: string;
}