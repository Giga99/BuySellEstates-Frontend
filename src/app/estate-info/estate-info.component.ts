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
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMessageComponent } from '../dialog-add-message/dialog-add-message.component';
import { BlocksService } from '../blocks.service';
import { Thread } from '../models/thread';

export class SendMessageDialogData {
  title: string;
}

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

  message: string;

  blockedUser: boolean;
  blockedByUser: boolean;

  constructor(
    private estatesService: EstatesService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private offersService: OffersService,
    private storage: StorageService,
    private snackbar: MatSnackBar,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private blocksService: BlocksService,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.username = this.storage.getUser().username;
    this.userType = this.storage.getUser().userType;

    this.estatesService.getEstateById(parseInt(id)).subscribe((estate: Estate) => {
      if (this.cookieService.check(this.username + "/" + id) || estate.ownerUsername == this.username) {
        this.estate = estate
        this.creditPrice = estate.priceToBuy * 120 / 100;

        this.blocksService.isBlocked(this.username, this.estate.ownerUsername).subscribe(response => {
          this.blockedUser = response['message'] == 'user blocked';
          this.blockedByUser = response['message'] == 'user is blocked';
        });
      } else {
        this.estatesService.updateViews(parseInt(id)).subscribe(response => {
          this.cookieService.set(this.username + "/" + id, "true", 3);
          this.estatesService.getEstateById(parseInt(id)).subscribe((estate2: Estate) => {
            this.estate = estate2
            this.creditPrice = estate.priceToBuy * 120 / 100;

            this.blocksService.isBlocked(this.username, this.estate.ownerUsername).subscribe(response => {
              this.blockedUser = response['message'] == 'user blocked';
              this.blockedByUser = response['message'] == 'user is blocked';
            });
          });
        })
      }
    });
  }

  sendOffer() {
    if (this.blockedUser) {
      this.snackbar.open('Korisnik je blokiran, prvo ga odblokirajte!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.blockedByUser) {
      this.snackbar.open('Blokirani ste od strane korisnika, ponuda se ne moze poslati!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.cashOrCredit == '' && this.estate.rentOrSale == 'sale') {
      this.snackbar.open('Izaberite nacin placanja!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if ((this.date.value['start'] == null || this.date.value['end'] == null) && this.estate.rentOrSale == 'rent') {
      this.snackbar.open('Izaberite datum od i datum do!', 'U redu', {
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
                this.messagesService.getThreadById(response2['id']).subscribe((thread: Thread) => {
                  this.messagesService.toggleActive(thread.id, this.username == thread.user1, true).subscribe(response4 => {
                    this.snackbar.open('Ponuda uspesno poslata', 'U redu', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });
                  });
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
                this.messagesService.getThreadById(response3['id']).subscribe((thread: Thread) => {
                  this.messagesService.toggleActive(thread.id, this.username == thread.user1, true).subscribe(response5 => {
                    this.snackbar.open('Ponuda uspesno poslata', 'U redu', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });
                  });
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

  sendMessage() {
    if (this.blockedUser) {
      this.snackbar.open('Korisnik je blokiran, prvo ga odblokirajte!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.blockedByUser) {
      this.snackbar.open('Blokirani ste od strane korisnika, poruke se ne mogu poslati!', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.dialog.open(DialogAddMessageComponent, {
        width: '50%',
        data: { title: this.estate.title, message: this.message }
      }).afterClosed().subscribe(result => {
        if (result != undefined) {
          this.messagesService.startThread(this.estate.id, this.estate.title, true, false, '', this.username, this.estate.ownerUsername, this.estate.ownerUsername, []).subscribe(response1 => {
            this.messagesService.sendMessage(response1['id'], result, this.username, new Date().toISOString()).subscribe(response2 => {
              if (response2['message'] == 'message sent') {
                this.messagesService.getThreadById(response1['id']).subscribe((thread: Thread) => {
                  this.messagesService.toggleActive(thread.id, this.username == thread.user1, true).subscribe(response3 => {
                    this.snackbar.open('Poruka uspesno poslata!', 'U redu', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });
                  });
                });
              } else {
                this.snackbar.open(response2['message'], 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            });
          });
        }
      });
    }
  }
}
