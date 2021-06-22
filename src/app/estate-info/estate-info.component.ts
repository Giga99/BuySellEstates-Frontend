import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EstatesService } from '../estates.service';
import { MessagesService } from '../messages.service';
import { Estate } from '../models/estate';
import { OffersService } from '../offers.service';
import { StorageService } from '../storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  UPDATE_VIEWS = "updateViews";

  estate: Estate;
  cashOrCredit = '';
  creditPrice: number;
  username: string;
  userType: string;
  date = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  date2: string;

  constructor(
    private estatesService: EstatesService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private offersService: OffersService,
    private storage: StorageService,
    private snackbar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    console.log(this.cookieService.check(this.UPDATE_VIEWS));
    if (this.cookieService.check(this.UPDATE_VIEWS)) {
      this.estatesService.getEstateById(parseInt(id)).subscribe((estate: Estate) => {
        this.estate = estate
        this.creditPrice = estate.priceToBuy * 120 / 100;
      });
    } else {
      this.estatesService.updateViews(parseInt(id)).subscribe(response => {
        this.cookieService.set(this.UPDATE_VIEWS, "true", 3);
        console.log(this.cookieService.check(this.UPDATE_VIEWS));
        this.estatesService.getEstateById(parseInt(id)).subscribe((estate: Estate) => {
          this.estate = estate
          this.creditPrice = estate.priceToBuy * 120 / 100;
        });
      })
    }
    this.username = this.storage.getUser().username;
    this.userType = this.storage.getUser().userType;
  }

  sendOffer() {
    if (this.cashOrCredit == '') {
      this.snackbar.open('Izaberite nacin placanja!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.estate.rentOrSale == 'sale') {
      this.offersService.isEstateSold(this.estate.id).subscribe((isSold: boolean) => {
        if (isSold) {
          this.snackbar.open('Nekretnina je prodata!', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.offersService.sendOffer(this.estate.id, this.estate.title, this.estate.ownerUsername, this.username, -1, -1, this.cashOrCredit == 'cash' ? this.estate.priceToBuy : this.creditPrice).subscribe((response1) => {
            this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe((response2) => {
              this.messagesService.sendMessageOffer(response2['id'], 'Korisnik: ' + this.username + ' zeli da kupi nekretninu: ' + this.estate.title, this.username, new Date().toISOString(), -1, -1, response1['offerId']).subscribe((response3) => {
                this.snackbar.open('Ponuda uspesno poslata', 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              });
            });
          });
        }
      });
    } else {
      let dateFrom = this.date.value['start'].toISOString().substring(0, 10);
      let dateTo = this.date.value['end'].toISOString().substring(0, 10);
      this.offersService.checkEstateAvailability(this.estate.id, dateFrom, dateTo).subscribe((response1) => {
        if (response1['message'] == "estate is available") {
          this.offersService.sendOffer(this.estate.id, this.estate.title, this.estate.ownerUsername, this.username, dateFrom, dateTo, this.estate.priceToRent).subscribe((response2) => {
            this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe((response3) => {
              this.messagesService.sendMessageOffer(response3['id'], 'Korisnik: ' + this.username + ' zeli da iznajmi vasu nekretninu: ' + this.estate.title + ' u periodu od ' + dateFrom + ' do ' + dateTo, this.username, new Date().toISOString(), dateFrom, dateTo, response2['offerId']).subscribe((response4) => {
                this.snackbar.open('Ponuda uspesno poslata', 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              });
            });
          });
        } else {
          this.snackbar.open('Nekretnina je zauzeta u tom periodu!', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
