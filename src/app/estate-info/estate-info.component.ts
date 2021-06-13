import { Component, OnInit } from '@angular/core';
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
      this.offersService.sendOffer(this.estate.id, this.estate.ownerUsername, this.username, -1, -1).subscribe((response1) => {
        this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe((response2) => {
          this.messagesService.sendMessageOffer(response2['id'], 'Korisnik: ' + this.username + ' zeli da kupi nekretninu: ' + this.estate.title, this.username, new Date().toISOString().substring(0, 10), -1, -1, response1['offerId']).subscribe((response3) => {
            alert(response3);
          });
        });
      });
    } else {

    }
  }
}
