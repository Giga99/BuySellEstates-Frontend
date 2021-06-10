import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  promotedEstates: Array<Estate>;
  searchedEstates: Array<Estate>;
  searchType: String = null;
  nameSearch: String;
  citySearch: String;
  priceSearchType: String;
  maxSalePrice: Number = 0;
  maxRentPrice: Number = 0;
  searchSalePrice: Number;
  searchRentPrice: Number;

  constructor(private estatesService: EstatesService) { 
    this.estatesService.getPromotedEstates().subscribe((list: Array<Estate>) => {
      this.promotedEstates = list;
    })

    this.estatesService.searchEstatesByName("").subscribe((list: Array<Estate>) => {
      this.searchedEstates = list
      list.forEach((estate) => {
        if(estate.priceToBuy > this.maxSalePrice) this.maxSalePrice = estate.priceToBuy
        if(estate.priceToRent > this.maxRentPrice) this.maxRentPrice = estate.priceToRent
      })
    })
  }

  ngOnInit(): void {
  }

  search() {
    if(this.searchType == "name") {
      this.estatesService.searchEstatesByName(this.nameSearch).subscribe((list: Array<Estate>) => {
        this.searchedEstates = list;
      })
    } else if(this.searchType == "city") {
      this.estatesService.searchEstatesByCity(this.citySearch).subscribe((list: Array<Estate>) => {
        this.searchedEstates = list;
      })
    } else {
      if(this.priceSearchType == "sale") {
        this.estatesService.searchEstatesByPrice(this.priceSearchType, 0, this.searchSalePrice).subscribe((list: Array<Estate>) => {
          this.searchedEstates = list;
        })
      } else {
        this.estatesService.searchEstatesByPrice(this.priceSearchType, 0, this.searchRentPrice).subscribe((list: Array<Estate>) => {
          this.searchedEstates = list;
        })
      }
    }
  }
}
