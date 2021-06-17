import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  checkEstateAvailability(estateId, dateFrom, dateTo) {
    const data = {
      estateId: estateId,
      dateFrom: dateFrom,
      dateTo: dateTo
    }

    return this.http.post(`${Constants.URI}/offers/checkEstateAvailability`, data);
  }

  sendOffer(estateId, estateName, estateOwner, bidder, dateFrom, dateTo, priceToPay) {
    const data = {
      estateId: estateId,
      estateName: estateName,
      estateOwner: estateOwner,
      bidder: bidder,
      dateFrom: dateFrom,
      dateTo: dateTo,
      priceToPay: priceToPay
    }

    return this.http.post(`${Constants.URI}/offers/sendOffer`, data);
  }

  answerEstateOffer(id, accepted, estateId, isAgent: Boolean) {
    const data = {
      id: id,
      accepted: accepted,
      estateId: estateId
    }

    if (isAgent) return this.http.post(`${Constants.URI}/offers/answerEstateOfferAgent`, data);
    else return this.http.post(`${Constants.URI}/offers/answerEstateOffer`, data);
  }

  isOfferActive(offerId) {
    const data = {
      offerId: offerId
    };

    return this.http.post(`${Constants.URI}/offers/isOfferActive`, data);
  }

  getAllAgreedOffers() {
    return this.http.get(`${Constants.URI}/offers/getAllAgreedOffers`);
  }

  getAllAgencyAgreedOffers(agency) {
    const data = {
      agency: agency
    };

    return this.http.post(`${Constants.URI}/offers/getAllAgencyAgreedOffers`, data);
  }
  
  getAllOffersRequests() {
    return this.http.get(`${Constants.URI}/offers/getAllOffersRequests`);
  }
  
  answerOfferRequest(id, accepted) {
    const data = {
      id: id,
      accepted: accepted
    }

    return this.http.post(`${Constants.URI}/offers/answerOfferRequest`, data);
  }
}
