import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient) { }

  getFees(id) {
    const data = {
      id: id
    }

    return this.http.post(`${Constants.URI}/fees/getFees`, data);
  }

  updateFees(id, rentFee, saleFee) {
    const data = {
      id: id,
      rentFee: rentFee,
      saleFee: saleFee
    }

    return this.http.post(`${Constants.URI}/fees/updateFees`, data);
  }
}
