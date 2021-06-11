import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  constructor(private http: HttpClient) { }

  getPromotedEstates() {
    return this.http.get(`${Constants.URI}/estates/getPromotedEstates`);
  }

  searchEstatesByName(query: String) {
    const data = {
      searchQuery: query
    }
    return this.http.post(`${Constants.URI}/estates/searchAllEstatesByTitle`, data);
  }

  searchEstatesByCity(query: String) {
    const data = {
      cityQuery: query
    }
    return this.http.post(`${Constants.URI}/estates/searchAllEstatesByCity`, data);
  }

  searchEstatesByPrice(rentOrSale: String, min: Number, max: Number) {
    const data = {
      rentOrSale: rentOrSale,
      priceLowerLimit: min,
      priceHigherLimit: max
    }
    return this.http.post(`${Constants.URI}/estates/searchAllEstatesByPrice`, data);
  }

  getEstateById(id: Number) {
    const data = {
      id: id
    }
    return this.http.post(`${Constants.URI}/estates/getEstateById`, data);
  }
}
