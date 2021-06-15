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

  sendOffer(estateId, estateOwner, bidder, dateFrom, dateTo) {
    const data = {
      estateId: estateId,
      estateOwner: estateOwner,
      bidder: bidder,
      dateFrom: dateFrom,
      dateTo: dateTo
    }

    return this.http.post(`${Constants.URI}/offers/sendOffer`, data);
  }

  answerEstateOffer(id, accepted, estateId) {
    const data = {
      id: id,
      accepted: accepted,
      estateId: estateId
    }

    return this.http.post(`${Constants.URI}/offers/answerEstateOffer`, data);
  }

  isOfferActive(offerId) {
    const data = {
      offerId: offerId
    };

    return this.http.post(`${Constants.URI}/offers/isOfferActive`, data);
  }
}
