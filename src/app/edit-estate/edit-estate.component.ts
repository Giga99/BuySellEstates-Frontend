import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit {

  id: string;
  title: string;
  municipality: string;
  city: string;
  address: string;
  priceToBuy = 0;
  priceToRent = 0;
  squareFootage: number;
  rentOrSale: string;
  numberOfFloors: number;
  floorNumber = 0;
  numberOfRooms: string;
  furnished = false;
  type: string;

  constructor(
    private estatesService: EstatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.estatesService.getEstateById(parseInt(this.id)).subscribe((estate: Estate) => {
      this.title = estate.title;
      this.municipality = estate.municipality;
      this.city = estate.city;
      this.address = estate.address;
      this.priceToBuy = estate.priceToBuy;
      this.priceToRent = estate.priceToRent;
      this.squareFootage = estate.squareFootage;
      this.rentOrSale = estate.rentOrSale;
      this.numberOfFloors = estate.numberOfFloors;
      this.floorNumber = estate.floorNumber;
      this.numberOfRooms = estate.numberOfRooms;
      this.furnished = estate.furnished;
      this.type = estate.type;
    })
  }

  editEstate() {
    this.estatesService.editEstate(
      this.id, 
      this.title, 
      this.municipality, 
      this.city, 
      this.address, 
      this.priceToBuy, 
      this.priceToRent, 
      this.squareFootage, 
      this.rentOrSale, 
      this.numberOfFloors, 
      this.floorNumber, 
      this.numberOfRooms, 
      this.furnished
    ).subscribe(response => {
      if (response['message'] == 'estate updated') {
        this.router.navigate(['..']);
      }
    });
  }
}
