import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-dialog-new-message',
  templateUrl: './dialog-new-message.component.html',
  styleUrls: ['./dialog-new-message.component.css']
})
export class DialogNewMessageComponent implements OnInit {

  estateId: string;
  estates: Array<Estate>;

  constructor(
    private estatesService: EstatesService
  ) { }

  ngOnInit(): void {
    this.estatesService.searchEstatesByName("").subscribe((estates: Array<Estate>) => {
      this.estates = estates;
    });
  }

}
