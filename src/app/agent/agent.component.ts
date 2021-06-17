import { Component, OnInit } from '@angular/core';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';
import * as c3 from 'c3';
import { Primitive } from 'c3';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  allEstates: Array<Estate>;

  constructor(private estatesService: EstatesService) { }

  ngOnInit(): void {
    this.estatesService.searchEstatesByName('').subscribe((estates: Array<Estate>) => {
      c3.generate({
        bindto: '#chart1',
        data: {
          x: 'x',
          columns: [
            ['x', '0-25000', '25001-50000', '50001-75000', '75001-100000', '100000+'],
            ['Broj nekretnina', this.countEstatesForPriceRange(estates, 0, 25000), this.countEstatesForPriceRange(estates, 25001, 50000), this.countEstatesForPriceRange(estates, 50001, 75000), this.countEstatesForPriceRange(estates, 75000, 100000), this.countEstatesForPriceRange(estates, 100001, -1)],
          ],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category'
          }
        }
      });

      let cols = [];
      let cities = estates.map((estate) => estate.city).filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      cities.forEach((city, index) => {
        cols.push([city, estates.filter((estate) => estate.city == city).length])
      });

      c3.generate({
        bindto: '#chart2',
        data: {
          columns: cols,
          type: 'bar',
        }
      });

      c3.generate({
        bindto: '#chart3',
        data: {
          x: 'x',
          columns: [
            ['x', 'Prodaja', 'Iznajmljivanje'],
            ['Stan', estates.filter((estate) => { return estate.rentOrSale == 'sale' && estate.type == 'Stan' }).length, estates.filter((estate) => { return estate.rentOrSale == 'rent' && estate.type == 'Stan' }).length],
            ['Kuca', estates.filter((estate) => { return estate.rentOrSale == 'sale' && estate.type == 'Kuca' }).length, estates.filter((estate) => { return estate.rentOrSale == 'rent' && estate.type == 'Kuca' }).length]
          ],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category'
          }
        }
      });
    });
  }

  private countEstatesForPriceRange(estates: Array<Estate>, min: number, max: number): number {
    return estates.filter((estate) => { return estate.rentOrSale == 'sale' && estate.priceToBuy >= min && ((max != -1) ? estate.priceToBuy <= max : true) }).length
  }
}
