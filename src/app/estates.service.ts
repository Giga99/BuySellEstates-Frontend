import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estate } from './models/estate';
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

  getUserEstates(username: String) {
    const data = {
      ownerUsername: username
    }
    return this.http.post(`${Constants.URI}/estates/getUserEstates`, data);
  }

  addEstate(estate: Estate) {
    const data = {
      title: estate.title,
      ownerUsername: estate.ownerUsername,
      municipality: estate.municipality,
      city: estate.city,
      address: estate.address,
      priceToBuy: estate.priceToBuy,
      priceToRent: estate.priceToRent,
      type: estate.type,
      squareFootage: estate.squareFootage,
      rentOrSale: estate.rentOrSale,
      numberOfFloors: estate.numberOfFloors,
      floorNumber: estate.floorNumber,
      numberOfRooms: estate.numberOfRooms,
      furnished: estate.furnished,
      gallery: estate.gallery,
      promoted: estate.promoted,
      reviewed: estate.reviewed,
      approved: estate.approved,
    }
    return this.http.post(`${Constants.URI}/estates/addEstate`, data);
  }

  editEstate(id, title, municipality, city, address, priceToBuy, priceToRent, squareFootage, rentOrSale, numberOfFloors, floorNumber, numberOfRooms, furnished) {
    const data = {
      id: id,
      title: title,
      municipality: municipality,
      city: city,
      address: address,
      priceToBuy: priceToBuy,
      priceToRent: priceToRent,
      squareFootage: squareFootage,
      rentOrSale: rentOrSale,
      numberOfFloors: numberOfFloors,
      floorNumber: floorNumber,
      numberOfRooms: numberOfRooms,
      furnished: furnished
    }
    return this.http.post(`${Constants.URI}/estates/editEstate`, data);
  }

  answerEstateAdding(id, approved) {
    const data = {
      id: id,
      approved: approved
    }
    return this.http.post(`${Constants.URI}/estates/answerEstateAdding`, data);
  }
  
  getAddedEstates() {
    return this.http.get(`${Constants.URI}/estates/getAddedEstates`);
  }

  togglePromotedEstate(id, promoted) {
    const data = {
      id: id,
      promoted: promoted
    }
    return this.http.post(`${Constants.URI}/estates/togglePromotedEstate`, data);
  }

  updateViews(id) {
    const data = {
      id: id
    }
    return this.http.post(`${Constants.URI}/estates/updateViews`, data);
  }
}
