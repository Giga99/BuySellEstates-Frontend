import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocksService } from '../blocks.service';
import { MessagesService } from '../messages.service';
import { Thread } from '../models/thread';
import { OffersService } from '../offers.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-thread-info',
  templateUrl: './thread-info.component.html',
  styleUrls: ['./thread-info.component.css']
})
export class ThreadInfoComponent implements OnInit {

  id: string;
  isAgent: boolean;
  thread: Thread;
  username: string;
  activeOffers = Array<boolean>();
  blockedUser: boolean;
  blockedByUser: boolean;

  message = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private storage: StorageService,
    private offersService: OffersService,
    private snackbar: MatSnackBar,
    private blocksService: BlocksService
  ) {
    let user = this.storage.getUser();
    this.isAgent = user.userType == 'agent';
    this.username = this.isAgent ? user.agency : user.username;
    this.id = this.route.snapshot.paramMap.get('id');
    this.messagesService.getThreadById(this.id).subscribe((thread: Thread) => {
      this.thread = thread;
      if (!thread.read && thread.messages[thread.messages.length - 1].sender != this.username) {
        this.messagesService.readMessage(this.id).subscribe((response) => {
        });
      }

      thread.messages.forEach((message) => {
        this.offersService.isOfferActive(message.offerId).subscribe((response) => {
          this.activeOffers.push(response['message'] == 'active offer exists');
        });
      });

      this.blocksService.isBlocked(this.username, this.username != this.thread.user1 ? this.thread.user1 : this.thread.user2).subscribe(response => {
        this.blockedUser = response['message'] == 'user blocked';
        this.blockedByUser = response['message'] == 'user is blocked';
      });
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.messagesService.getThreadById(this.id).subscribe((thread: Thread) => {
        this.thread = thread;
        if (!thread.read && thread.messages[thread.messages.length - 1].sender != this.username) {
          this.messagesService.readMessage(this.id).subscribe((response) => {
          });
        }
      });
    });
  }

  goToEstateInfo() {
    this.router.navigate(['estateInfo', this.thread.estateId]);
  }

  answerOffer(offerId: number, answer: boolean) {
    this.offersService.answerEstateOffer(offerId, answer, this.thread.estateId, this.isAgent).subscribe((response) => {
      if (response['message'] == 'offer answered') {
        if (answer == true) {
          this.snackbar.open("Ponuda prihvacena!", 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        else {
          this.snackbar.open("Ponuda odbijena!", 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        window.location.reload();
      }
      else {
        this.snackbar.open(response['message'], 'U redu', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  sendMessage() {
    if (this.message != "") {
      if (!this.thread.active) {
        this.messagesService.toggleActive(this.thread.id, true).subscribe(response1 => {
          this.messagesService.sendMessage(this.thread.id, this.message, this.username, new Date().toISOString()).subscribe(response2 => {
            this.message = "";
            if (response2['message'] == 'message sent') {
              this.messagesService.getThreadById(this.thread.id).subscribe((thread: Thread) => {
                this.thread = thread;
              });
            }
          });
        })
      } else {
        this.messagesService.sendMessage(this.thread.id, this.message, this.username, new Date().toISOString()).subscribe(response => {
          this.message = "";
          if (response['message'] == 'message sent') {
            this.messagesService.getThreadById(this.thread.id).subscribe((thread: Thread) => {
              this.thread = thread;
            });
          }
        });
      }
    }
  }

  blockUnblockUser() {
    let usernameToBlock = this.username != this.thread.user1 ? this.thread.user1 : this.thread.user2
    this.blocksService.blockUnblockUser(this.username, usernameToBlock).subscribe(response1 => {
      if (response1['message'] == 'user blocked') {
        this.messagesService.getAllThreadsForUser(this.username).subscribe((threads: Array<Thread>) => {
          threads.forEach(thread => {
            if (thread.user1 == usernameToBlock || thread.user2 == usernameToBlock) {
              this.messagesService.toggleActive(thread.id, false).subscribe(response => {
              });
            }
          });
          window.location.reload();
        });
      } else window.location.reload();
    });
  }
}
