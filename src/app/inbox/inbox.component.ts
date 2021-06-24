import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogAddMessageComponent } from '../dialog-add-message/dialog-add-message.component';
import { DialogNewMessageComponent } from '../dialog-new-message/dialog-new-message.component';
import { EstatesService } from '../estates.service';
import { MessagesService } from '../messages.service';
import { Estate } from '../models/estate';
import { Thread } from '../models/thread';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  username: string;
  threads: Array<Thread>;
  showRedDot = [];

  constructor(
    private storage: StorageService,
    private messagesService: MessagesService,
    private router: Router,
    private dialog1: MatDialog,
    private dialog2: MatDialog,
    private estatesService: EstatesService,
    private snackbar: MatSnackBar

  ) { }

  ngOnInit(): void {
    let user = this.storage.getUser()
    this.username = user.userType == 'agent' ? user.agency : user.username;
    this.messagesService.getAllThreadsForUser(this.username).subscribe((threads: Array<Thread>) => {
      this.threads = threads;

      threads.forEach((thread) => {
        this.showRedDot.push(!thread.read && thread.messages[thread.messages.length - 1].sender != this.username)
      });
    })
  }

  navigateToThreadInfo(id: number) {
    this.router.navigate(['threadInfo', id]);
  }

  sendNewMessage() {
    this.dialog1.open(DialogNewMessageComponent, {
      width: '50%'
    }).afterClosed().subscribe(result => {
      if (result != undefined) {
        this.estatesService.getEstateById(result).subscribe((estate: Estate) => {
          this.dialog2.open(DialogAddMessageComponent, {
            width: '50%',
            data: { title: estate.title }
          }).afterClosed().subscribe(result => {
            if (result != undefined) {
              this.messagesService.startThread(estate.id, estate.title, true, false, '', this.username, estate.ownerUsername, estate.ownerUsername, []).subscribe(response1 => {
                this.messagesService.sendMessage(response1['id'], result, this.username, new Date().toISOString()).subscribe(response2 => {
                  if (response2['message'] == 'message sent') {
                    this.snackbar.open('Poruka uspesno poslata!', 'U redu', {
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                    });
                    window.location.reload();
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
        });
      }
    })
  }
}
