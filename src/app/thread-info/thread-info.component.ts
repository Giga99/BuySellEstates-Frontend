import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread-info',
  templateUrl: './thread-info.component.html',
  styleUrls: ['./thread-info.component.css']
})
export class ThreadInfoComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.id = this.route.snapshot.paramMap.get('id');
    })
  }
}
