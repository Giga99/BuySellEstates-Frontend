export class Offer {
    id: number;
    estateId: number;
    estateName: string;
    estateOwner: string;
    bidder: string;
    dateFrom: string;
    dateTo: string;
    priceToPay: number;
    reviewedByOwner: boolean;
    acceptedByOwner: boolean;
}