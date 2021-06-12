import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';
import { User } from '../models/User';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-estates',
  templateUrl: './user-estates.component.html',
  styleUrls: ['./user-estates.component.css']
})
export class UserEstatesComponent implements OnInit {

  private user: User;
  estates: Array<Estate>;

  constructor(
    private estatesService: EstatesService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.estatesService.getUserEstates(this.user.username).subscribe((estates: Array<Estate>) => {
      console.log(estates);
      this.estates = estates;
    })
  }

  navigateToInfo(id: Number) {
    this.router.navigate(['/estateInfo', id]);
  }
}
