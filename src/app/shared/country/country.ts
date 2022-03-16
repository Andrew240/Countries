export const FILTERS = {
    types: [
        {
            label: "Nombre",
            value: "name"
        },
        {
            label: "Nombre completo",
            value: "full_name"
        },
        {
            label: "Código",
            value: "code"
        },
        {
            label: "Lista de códigos",
            value: "code_list"
        },
        {
            label: "Tipo de moneda",
            value: "currency"
        },
        {
            label: "Lenguaje",
            value: "language"
        },
        {
            label: "Traducción",
            value: "translation"
        },
        {
            label: "Ciudad capital",
            value: "capital"
        },
        {
            label: "Región",
            value: "region"
        },
        {
            label: "Subregión",
            value: "subregion"
        },
        {
            label: "Gentilicios",
            value: "demonym"
        }
    ]
};

export class Country {
    name!: string;
    tld!: string;
    cca2!: string;
    ccn3!: string;
    cca3!: string;
    cioc!: string;
    independent!: boolean;
    status!: string;
    unMember!: boolean;
    currencies!: string;
    idd!: string;
    capital: Array<any> = [];
    altSpellings: Array<any> = [];
    region!: string;
    subregion!: string;
    languages!: string;
    translations!: string;
    latlng: Array<any> = [];
    landlocked!: boolean;
    borders: Array<any> = [];
    area!: number;
    demonyms!: string;
    flag!: string;
    maps!: string;
    population!: number;
    gini!: string;
    fifa!: string;
    car!: string;
    timezones: Array<any> = [];
    continents: Array<any> = [];
    flags!: string;
    coatOfArms!: string;
    startOfWeek!: string;
    capitalInfo!: any;
    postalCode!: string;
}
