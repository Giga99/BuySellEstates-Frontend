import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EstatesService } from '../estates.service';
import { MessagesService } from '../messages.service';
import { Estate } from '../models/estate';
import { OffersService } from '../offers.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  estate: Estate;
  cashOrCredit = '';
  creditPrice: number;
  username: string;
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
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.estatesService.getEstateById(parseInt(id)).subscribe((estate: Estate) => {
      this.estate = estate
      this.creditPrice = estate.priceToBuy * 120 / 100;
    });
    this.username = this.storage.getUser().username;
  }

  sendOffer() {
    if (this.estate.rentOrSale == 'sale') {
      this.offersService.sendOffer(this.estate.id, this.estate.title, this.estate.ownerUsername, this.username, -1, -1, this.cashOrCredit == 'cash' ? this.estate.priceToBuy : this.creditPrice).subscribe((response1) => {
        this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe((response2) => {
          this.messagesService.sendMessageOffer(response2['id'], 'Korisnik: ' + this.username + ' zeli da kupi nekretninu: ' + this.estate.title, this.username, new Date().toISOString(), -1, -1, response1['offerId']).subscribe((response3) => {
            alert("Ponuda uspesno poslata");
          });
        });
      });
    } else {
      let dateFrom = this.date.value['start'].toISOString().substring(0, 10);
      let dateTo = this.date.value['end'].toISOString().substring(0, 10);
      this.offersService.checkEstateAvailability(this.estate.id, dateFrom, dateTo).subscribe((response1) => {
        if(response1['message'] == "estate is available") {
          this.offersService.sendOffer(this.estate.id, this.estate.title, this.estate.ownerUsername, this.username, dateFrom, dateTo, this.estate.priceToRent).subscribe((response2) => {
            this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe((response3) => {
              this.messagesService.sendMessageOffer(response3['id'], 'Korisnik: ' + this.username + ' zeli da iznajmi vasu nekretninu: ' + this.estate.title + ' u periodu od ' + dateFrom + ' do ' + dateTo, this.username, new Date().toISOString(), dateFrom, dateTo, response2['offerId']).subscribe((response4) => {
                alert("Ponuda uspesno poslata");
              });
            });
          });
        } else {
          alert("Nekretnina je zauzeta u tom periodu!");
        }
      });
    }
  }
}
