import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { FilesService } from '../files.service';
import { Estate } from '../models/estate';
import { User } from '../models/User';
import { StorageService } from '../storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-estate',
  templateUrl: './add-estate.component.html',
  styleUrls: ['./add-estate.component.css']
})
export class AddEstateComponent implements OnInit {

  addEstateForm: FormGroup;
  submited = false;
  ownerUsername: string;
  furnished = false;
  multipleImages: File[];
  gallery = [];
  user: User;

  constructor(
    private estatesService: EstatesService,
    private router: Router,
    private storage: StorageService,
    private filesService: FilesService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.user = this.storage.getUser()
    this.ownerUsername = this.user.userType == 'agent' ? this.user.agency : this.user.username;

    this.addEstateForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      municipality: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      priceToBuy: new FormControl(null, [Validators.required]),
      priceToRent: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      squareFootage: new FormControl(null, [Validators.required]),
      rentOrSale: new FormControl(null, [Validators.required]),
      numberOfFloors: new FormControl(null, [Validators.required]),
      floorNumber: new FormControl(null, [Validators.required]),
      numberOfRooms: new FormControl(null, [Validators.required])
    });
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      this.gallery = [];
      for (let i = 0; i < this.multipleImages.length; i++) {
        this.gallery.push("../../assets/estates/" + this.multipleImages[i].name);
      }
    }
  }

  addEstate() {
    let title = this.addEstateForm.get('title').value;
    let municipality = this.addEstateForm.get('municipality').value;
    let city = this.addEstateForm.get('city').value;
    let address = this.addEstateForm.get('address').value;
    let rentOrSale = this.addEstateForm.get('rentOrSale').value;
    this.addEstateForm.get('priceToBuy').setValue((rentOrSale == "rent") ? -1 : this.addEstateForm.get('priceToBuy').value);
    this.addEstateForm.get('priceToRent').setValue((rentOrSale == "sale") ? -1 : this.addEstateForm.get('priceToRent').value);
    let priceToBuy = this.addEstateForm.get('priceToBuy').value;
    let priceToRent = this.addEstateForm.get('priceToRent').value;
    let type = this.addEstateForm.get('type').value;
    let squareFootage = this.addEstateForm.get('squareFootage').value;
    let numberOfFloors = this.addEstateForm.get('numberOfFloors').value;
    this.addEstateForm.get('floorNumber').setValue((type == "Kuca") ? -1 : this.addEstateForm.get('floorNumber').value);
    let floorNumber = this.addEstateForm.get('floorNumber').value;
    let numberOfRooms = this.addEstateForm.get('numberOfRooms').value;
    this.submited = true;

    if (this.gallery.length < 3 && this.gallery.length > 0) {
      this.snackbar.open('Potrebne su najmanje tri slike nekretnine', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.addEstateForm.valid) {
      this.filesService.uploadMultipleFiles(this.multipleImages).subscribe((response) => {
        const estate = new Estate(
          title,
          this.ownerUsername,
          municipality,
          city,
          address,
          priceToBuy,
          priceToRent,
          type,
          squareFootage,
          rentOrSale,
          numberOfFloors,
          floorNumber,
          numberOfRooms,
          this.furnished,
          this.gallery
        );

        this.estatesService.addEstate(estate).subscribe(response => {
          if (response['message'] == 'estate added') {
            if (this.user.userType == 'agent') {
              this.estatesService.answerEstateAdding(response['id'], true).subscribe(response => {
                if(response['message'] == 'estate updated') {
                  this.location.back();
                }
              });
            } else this.location.back();
          }
        });
      });
    }
  }
}
