import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { FilesService } from '../files.service';
import { Estate } from '../models/estate';
import { User } from '../models/User';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-add-estate',
  templateUrl: './add-estate.component.html',
  styleUrls: ['./add-estate.component.css']
})
export class AddEstateComponent implements OnInit {

  title: string;
  ownerUsername: string;
  municipality: string;
  city: string;
  address: string;
  priceToBuy = 0;
  priceToRent = 0;
  type: string;
  squareFootage: number;
  rentOrSale: string;
  numberOfFloors: number;
  floorNumber = 0;
  numberOfRooms: string;
  furnished = false;
  multipleImages: File[];
  gallery = [];

  constructor(
    private estatesService: EstatesService,
    private router: Router,
    private storage: StorageService,
    private filesService: FilesService
  ) {
  }

  ngOnInit(): void {
    let user = this.storage.getUser()
    this.ownerUsername = user.userType == 'agent' ? user.agency : user.username;
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      console.log(this.multipleImages);
      for(let i = 0; i < this.multipleImages.length; i++) {
        this.gallery.push("../../assets/estates/" + this.multipleImages[i].name);
      }
    }
  }

  addEstate() {
    this.filesService.uploadMultipleFiles(this.multipleImages).subscribe((response) => {
      console.log(response);
      if (this.rentOrSale == "rent") this.priceToBuy = -1;
      if (this.rentOrSale == "sale") this.priceToRent = -1;
      if (this.type == "Kuca") this.floorNumber = -1;
      const estate = new Estate(
        this.title,
        this.ownerUsername,
        this.municipality,
        this.city,
        this.address,
        this.priceToBuy,
        this.priceToRent,
        this.type,
        this.squareFootage,
        this.rentOrSale,
        this.numberOfFloors,
        this.floorNumber,
        this.numberOfRooms,
        this.furnished,
        this.gallery
      );

      this.estatesService.addEstate(estate).subscribe(response => {
        if (response['message'] == 'estate added') {
          this.router.navigate(['..']);
        }
      });
    });
  }
}
