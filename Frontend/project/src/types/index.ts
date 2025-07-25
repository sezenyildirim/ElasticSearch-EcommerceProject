export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string; 
  width:string;
  storage: string;
  color: string;
  features: string[] | string | Record<string, any>;
  description: string;
  specs: {
    display: string;
    processor: string;
    camera: string;
    battery: string;
    os: string;
  };
  rating: number;
  reviews: number;
  inStock: boolean; 
}

export interface CartItem {
  phone: Phone;
  selectedStorage: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  storage: number[];
  features: string[];
  ratings : number[];
}