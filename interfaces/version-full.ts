export interface VersionResponse {

    versions: Version[]
}

export interface Version {
    [x: string]: any;
    SpecialSaleImage: null;
    benefits: any[];
    cae: null | string;
    code: string;
    convertedMinPrice: number;
    created_at: Date;
    ctc: null | string;
    cyberCampaign: boolean;
    default: number;
    deleted_at: null;
    description: null | string;
    extra: null | string;
    extras: { [key: string]: null | string };
    factor_impuesto_verde: null;
    fuel?: Fuel;
    id: number;
    image: Image;
    include_in_reserve: boolean;
    isDeferredSale: boolean;
    isPatentFree: boolean;
    isSpecialSale: boolean;
    isSpecialSaleBrand: boolean;
    minPrice: number;
    model: Model;
    modelId: number;
    model_id: number;
    monthlyFees: null | string;
    name: string;
    numMonthlyFees: null | string;
    order: number | null;
    pie: null | string;
    prices: Price[];
    prices_count: number;
    published: number;
    remote_id: number;
    seoTitle: null | string;
    showOnSpecsTable: boolean;
    showPriceWithoutIva: boolean;
    slug: string;
    specialSalePercentage: string;
    stock: null | string;
    title: null | string;
    transmission?: Transmission;
    updated_at: Date;
    vfmg: null | string;
}

export enum Fuel {
    Diesel = "diesel",
    Gasolina = "gasolina",
}

export interface Image {
    url: string;
}

export interface Model {
    brandId: number;
    brandName: BrandName;
    brand_id: number;
    carClass: CarClass[];
    carClassDerco: null;
    car_class_derco_id: null;
    classesDerco: any[];
    id: number;
    in_ces: number;
    in_presale: number;
    in_presale_dc: number;
    in_presale_publico_cerrado: number;
    is_catalog: number;
    name: string;
    order: number;
    published: number;
    remote_id: number;
    slug: string;
}

export enum BrandName {
    Changan = "Changan",
    GreatWall = "Great Wall",
    Haval = "Haval",
    Jac = "JAC",
    Mazda = "Mazda",
    Renault = "Renault",
    Suzuki = "Suzuki",
}

export enum CarClass {
    Camioneta = "Camioneta",
    Citycar = "Citycar",
    Comercial = "Comercial",
    Deportivo = "Deportivo",
    Hatchback = "Hatchback",
    Híbrido = "Híbrido",
    PickUp = "Pick Up",
    Sedán = "Sedán",
    Suv = "SUV",
    Van = "Van",
    Eléctrico = "Eléctrico",
}

export interface Price {
    conversionRate: string;
    convertedValue: number;
    diff: number;
    formattedName: FormattedName;
    name: Name;
    type: Type;
    value: number;
}

export enum FormattedName {
    BonoFinanciamiento = "Bono financiamiento",
    BonoMarca = "Bono marca",
    PrecioLista = "Precio lista",
}

export enum Name {
    BonoFinanciamiento = "Bono Financiamiento",
    BonoMarca = "Bono Marca",
    PrecioLista = "Precio Lista",
}

export enum Type {
    ConBonoAmicar = "con-bono-amicar",
    ConBonoMarca = "con-bono-marca",
    PrecioLista = "precio-lista",
}

export enum Transmission {
    Automatica = "automatica",
    Manual = "manual",
}
