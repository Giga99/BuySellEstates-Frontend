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
}
