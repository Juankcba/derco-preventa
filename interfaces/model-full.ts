import { Image, Price, Version } from "./version-full";

export interface ModelResponse {
    id: number;
    name: string;
    slug: string;
    order: number;
    published: number;
    inCES: number;
    inPresale: number;
    inPresalePublicoCerrado: number;
    inPresaleDc: number;
    modelResponseBrandID: number;
    remoteID: number;
    carClassDercoID: null;
    featured: number;
    isCatalog: number;
    title: null;
    description: string;
    imageModelURL: string;
    logoURL: string;
    specsSheetURL: string;
    specsSheetVersionsCAURL: null;
    carClass: string[];
    videos: Video[];
    video: Video;
    showDownloadSpecsSheetVersionsCA: boolean;
    showDownloadSpecsSheet: boolean;
    galleries: Galleries;
    colors: Color[];
    features: null;
    allFeatures: any[];
    bannerImage: BannerImage;
    gallery: string[];
    versions: Version[];
    table: Table[];
    brandID: number;
    defaultVersion: DefaultVersion;
    tour3DURL: string;
    tour3DOrder: string;
    tour3DVersion: string;
    tour3DDescription: string;
    tour3DImage: string;
    brand: Brand;
}

export interface BannerImage {
    mobile: string;
    desktop: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    order: number;
}

export interface Color {
    type: string;
    name: string;
    hexadecimal2: string;
    hexadecimal1: string;
    price: null;
    imageSrc: string;
}

export interface DefaultVersion {
    id: number;
    name: string;
    slug: string;
    title: string;
    description: string;
    code: string;
    published: number;
    default: number;
    defaultVersionModelID: number;
    deletedAt: null;
    createdAt: Date;
    updatedAt: Date;
    order: null;
    remoteID: number;
    minPrice: number;
    imageURL: string;
    showPriceWithoutIva: boolean;
    pricesCount: number;
    convertedMinPrice: number;
    isSpecialSaleBrand: boolean;
    includeInReserve: boolean;
    specialSalePercentage: number;
    isPatentFree: boolean;
    isSpecialSale: boolean;
    showOnSpecsTable: boolean;
    cyberCampaign: boolean;
    isDeferredSale: boolean;
    extras: Extras;
    image: Image;
    modelID: number;
    transmission: string;
    fuel: string;
    model: ModelFull;
}

export interface Extras {
    stock: null;
    numMonthlyFees: null;
    cae: null;
    monthlyFees: null;
    ctc: null;
    vfmg: null;
    pie: null;
}



export interface ModelFull {
    id: number;
    name: string;
    slug: string;
    order: number;
    versionsSortingType?: string;
    published: number;
    inCES: number;
    inPresale: number;
    inPresalePublicoCerrado: number;
    inPresaleDc: number;
    modelBrandID: number;
    remoteID: number;
    carClassDercoID: null;
    featured: number;
    isCatalog: number;
    deletedAt?: null;
    createdAt?: Date;
    updatedAt?: Date;
    brandID?: number;
    carClass?: string[];
    brandName?: string;
}

export interface Galleries {
    banners: string[];
    bannersmobile: string[];
    internal: string[];
    external: string[];
    colors: string[];
}

export interface Table {
    categoryType: CategoryType;
    categoryID: number;
    categoryName: string;
    rows: Row[];
}

export enum CategoryType {
    Spec = "spec",
}

export interface Row {
    columns: Column[];
}

export interface Column {
    value: null | string;
    versionID?: number | null;
}





export interface Specs {
    categories: Category[];
}

export interface Category {
    id: number;
    name: string;
    categorySpecs: CategorySpec[];
}

export interface CategorySpec {
    versionID: number;
    specID: number;
    specName: string;
    value: string;
    isFeatured: boolean;
}

export interface Video {
    name: string;
    description: string;
    url: string;
    cover: string;
}
