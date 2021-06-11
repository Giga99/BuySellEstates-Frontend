import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-estate-info',
  templateUrl: './estate-info.component.html',
  styleUrls: ['./estate-info.component.css']
})
export class EstateInfoComponent implements OnInit {

  estate: Estate;

  constructor(private estatesService: EstatesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.estatesService.getEstateById(parseInt(id)).subscribe((estate: Estate) => {
      this.estate = estate
    })
  }

}
