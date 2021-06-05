export class Estate {
    id: number;
    title: string;
    ownerUsername: string;
    municipality: string;
    city: string;
    priceToBuy: number;
    priceToRent: number;
    type: string;
    squareFootage: number;
    rentOrSale: string;
    numberOfFloors: number;
    floorNumber: number;
    numberOfRooms: string;
    furnished: boolean;
    gallery: Array<String>;
    promoted: boolean;
}