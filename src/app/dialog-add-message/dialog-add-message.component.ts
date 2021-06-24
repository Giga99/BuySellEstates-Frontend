import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendMessageDialogData } from '../estate-info/estate-info.component';

@Component({
  selector: 'app-dialog-add-message',
  templateUrl: './dialog-add-message.component.html',
  styleUrls: ['./dialog-add-message.component.css']
})
export class DialogAddMessageComponent implements OnInit {

  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SendMessageDialogData) { }

  ngOnInit(): void {
  }

}
