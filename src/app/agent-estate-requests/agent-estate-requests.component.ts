import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-agent-estate-requests',
  templateUrl: './agent-estate-requests.component.html',
  styleUrls: ['./agent-estate-requests.component.css']
})
export class AgentEstateRequestsComponent implements OnInit {

  addedEstates: Array<Estate>;

  constructor(
    private estatesService: EstatesService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.estatesService.getAddedEstates().subscribe((list: Array<Estate>) => {
      this.addedEstates = list;
    });
  }

  answerEstateAdding(estateId, answer) {
    this.estatesService.answerEstateAdding(estateId, answer).subscribe((response) => {
      console.log(response['message']);
      this.router.navigate(['agentEstateRequests']);
    });
  }
  
  navigateToInfo(id: Number) {
    this.router.navigate(['estateInfo', id]);
  }
}
