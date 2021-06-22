import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-agent-all-estates',
  templateUrl: './agent-all-estates.component.html',
  styleUrls: ['./agent-all-estates.component.css']
})
export class AgentAllEstatesComponent implements OnInit {

  allEstates: Array<Estate>;
  username: string;

  constructor(
    private estatesService: EstatesService,
    private router: Router,
    private storage: StorageService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let user = this.storage.getUser()
    this.username = user.userType == 'agent' ? user.agency : user.username;
    this.estatesService.searchEstatesByName("").subscribe((list: Array<Estate>) => {
      this.allEstates = list;
    });
  }

  promoteEstate(estateId: number, promoted: boolean) {
    this.estatesService.togglePromotedEstate(estateId, promoted).subscribe((response) => {
      this.snackbar.open(response['message'], 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      window.location.reload();
    });
  }

  navigateToInfo(id: Number) {
    this.router.navigate(['estateInfo', id]);
  }

  navigateToEdit(id: Number) {
    this.router.navigate(['editEstate', id]);
  }
}
