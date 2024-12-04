export interface Category {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
}

interface ProductCare {
  type: string;
  content: string;
  product_care_id: number;
}

interface ProductColor {
  color_id: number;
  color_code: string;
  color_name: string;
}

interface ProductImage {
  image_id: number;
  image_url: string;
  preference: number;
}

interface SizeValue {
  id: number;
  type: string;
  value: string;
}

interface ProductSize {
  sku: string;
  sizes: SizeValue[];
  stock: number;
  size_id: number;
}

interface RegionalPrice {
  price: number;
  region_id: number;
  region_name: string;
  currency_type: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  brand_name: string;
  category_name: string;
  subcategory_name: string;
  product_care: ProductCare[];
  product_colors: ProductColor[];
  product_images: ProductImage[];
  product_more_info: any;
  product_sizes: ProductSize[];
  product_specifications: any;
  product_tags: any;
  regional_prices: RegionalPrice[];
}
