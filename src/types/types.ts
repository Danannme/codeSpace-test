export interface User {
    id: string;
    name: string;
}

export interface Review {
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Meta {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
}

export interface Product {
    mockId: number;
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    thumbnail: string;
    images: string[];
}

export interface Category {
    name: string;
    icon: React.ReactNode;
}

export interface LoaderData {
    user: User;
    cart: Cart[];
    products: {
        limit: number;
        products: Product[];
        skip: number;
        total: number;
    };
    wishlist: Product[];
}

export interface Cart {
    mockId: number;
    id: string;
    userId: string;
    product: Product;
    selected: boolean;
    quantity: number;
}
