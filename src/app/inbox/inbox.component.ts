import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
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

  constructor(
    private storage: StorageService,
    private messagesService: MessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.username = this.storage.getUser().username;
    this.messagesService.getAllThreadsForUser(this.username).subscribe((threads: Array<Thread>) => {
      this.threads = threads;
    })
  }

  navigateToThreadInfo(id: number) {
    this.router.navigate(['threadInfo', id]);
  }
}
