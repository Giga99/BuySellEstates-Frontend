import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { OffersService } from '../offers.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-all-agreed-offers',
  templateUrl: './all-agreed-offers.component.html',
  styleUrls: ['./all-agreed-offers.component.css']
})
export class AllAgreedOffersComponent implements OnInit {

  allAgreedOffers: Array<Offer>;
  agencyProfit = 0;

  constructor(private offersService: OffersService, private storage: StorageService) { }

  ngOnInit(): void {
    this.offersService.getAllAgreedOffers().subscribe((offers: Array<Offer>) => {
      this.allAgreedOffers = offers;
    });

    this.offersService.getAllAgencyAgreedOffers(this.storage.getUser().agency).subscribe((offers: Array<Offer>) => {
      offers.forEach((offer) => {
        this.agencyProfit += (offer.dateFrom == "-1") ? offer.priceToPay : this.getRentProfit(offer);
      });
    });
  }

  private getRentProfit(offer: Offer): number {
    let yearsTo = Number.parseInt(offer.dateTo.substring(0, 4));
    let monthsTo = Number.parseInt(offer.dateTo.substring(5, 7));
    let daysTo = Number.parseInt(offer.dateTo.substring(8));
    let yearsFrom = Number.parseInt(offer.dateFrom.substring(0, 4));
    let monthsFrom = Number.parseInt(offer.dateFrom.substring(5, 7));
    let daysFrom = Number.parseInt(offer.dateFrom.substring(8));

    return ((yearsTo-yearsFrom)*12+monthsTo-monthsFrom)*offer.priceToPay + (daysTo-daysFrom)*offer.priceToPay/30;
  }
}
