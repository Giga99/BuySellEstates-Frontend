export class Estate {
    id: number;
    title: string;
    ownerUsername: string;
    municipality: string;
    city: string;
    address: string;
    priceToBuy: number;
    priceToRent: number;
    type: string;
    squareFootage: number;
    rentOrSale: string;
    numberOfFloors: number;
    floorNumber: number;
    numberOfRooms: string;
    furnished: boolean;
    views: number;
    gallery: Array<String>;
    promoted: boolean;
    reviewed: boolean;
    approved: boolean;

    constructor(title, ownerUsername, municipality, city, address, priceToBuy, priceToRent, type, squareFootage, rentOrSale, numberOfFloors, floorNumber, numberOfRooms, furnished, gallery) {
        this.title = title;
        this.ownerUsername = ownerUsername;
        this.municipality = municipality;
        this.city = city;
        this.address = address;
        this.priceToBuy = priceToBuy;
        this.priceToRent = priceToRent;
        this.type = type;
        this.squareFootage = squareFootage;
        this.rentOrSale = rentOrSale;
        this.numberOfFloors = numberOfFloors;
        this.floorNumber = floorNumber;
        this.numberOfRooms = numberOfRooms;
        this.furnished = furnished;
        this.gallery = gallery;
        this.promoted = false;
        this.reviewed = false;
        this.approved = false;
    }
}