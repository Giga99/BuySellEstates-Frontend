import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { EstatesService } from '../estates.service';
import { FeesService } from '../fees.service';
import { Estate } from '../models/estate';
import { Fee } from '../models/fee';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  rentFee: number;
  saleFee: number;

  constructor(
    private estatesService: EstatesService,
    private feesService: FeesService
  ) {
    this.feesService.getFees(1).subscribe((fee: Fee) => {
      if (fee) {
        this.rentFee = fee.rentFee;
        this.saleFee = fee.saleFee;
      }
    });
  }

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

  updateFees() {
    this.feesService.updateFees(1, this.rentFee, this.saleFee).subscribe((response) => {
      alert(response['message']);
    })
  }

  private countEstatesForPriceRange(estates: Array<Estate>, min: number, max: number): number {
    return estates.filter((estate) => { return estate.rentOrSale == 'sale' && estate.priceToBuy >= min && ((max != -1) ? estate.priceToBuy <= max : true) }).length
  }
}
