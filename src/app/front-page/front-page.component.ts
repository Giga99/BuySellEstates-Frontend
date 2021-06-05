import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  promotedEstates: Array<Estate>;

  constructor(private estatesService: EstatesService) { 
    this.estatesService.getPromotedEstates().subscribe((list: Array<Estate>) => {
      this.promotedEstates = list;
    })
  }

  ngOnInit(): void {
  }

}
