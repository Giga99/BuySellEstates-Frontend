import { Component, OnInit } from '@angular/core';
import { FeesService } from '../fees.service';
import { Fee } from '../models/fee';
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
  allOffersRequests: Array<Offer>;
  agencyProfit = 0;
  fee: Fee;

  constructor(
    private offersService: OffersService,
    private feesService: FeesService,
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
    this.feesService.getFees(1).subscribe((fee: Fee) => {
      if (fee) {
        this.fee = fee;
        this.offersService.getAllAgreedOffers().subscribe((offers: Array<Offer>) => {
          this.allAgreedOffers = offers.filter((offer) => offer.dateFrom == "-1");
          offers.forEach((offer) => {
            this.agencyProfit += (offer.dateFrom != "-1") ? (this.getRentProfit(offer) * this.fee.rentFee / 100) : (offer.priceToPay * this.fee.saleFee / 100);
          });
          this.offersService.getAllAgencyAgreedOffers(this.storage.getUser().agency).subscribe((offers: Array<Offer>) => {
            offers.forEach((offer) => {
              this.agencyProfit += (offer.dateFrom == "-1") ? offer.priceToPay : this.getRentProfit(offer);
            });
          });
        });
      }
    });

    this.offersService.getAllOffersRequests().subscribe((offers: Array<Offer>) => {
      this.allOffersRequests = offers;
    });
  }

  answerOfferRequest(offerId: number, accepted: boolean) {
    this.offersService.answerOfferRequest(offerId, accepted).subscribe((response) => {
      if (response['message'] == 'offer request answered') alert("Uspesno odgovoreno na zahtev za ponudu!");
      window.location.reload();
    });
  }

  private getRentProfit(offer: Offer): number {
    let yearsTo = Number.parseInt(offer.dateTo.substring(0, 4));
    let monthsTo = Number.parseInt(offer.dateTo.substring(5, 7));
    let daysTo = Number.parseInt(offer.dateTo.substring(8));
    let yearsFrom = Number.parseInt(offer.dateFrom.substring(0, 4));
    let monthsFrom = Number.parseInt(offer.dateFrom.substring(5, 7));
    let daysFrom = Number.parseInt(offer.dateFrom.substring(8));

    return ((yearsTo - yearsFrom) * 12 + monthsTo - monthsFrom) * offer.priceToPay + (daysTo - daysFrom) * offer.priceToPay / 30;
  }
}
