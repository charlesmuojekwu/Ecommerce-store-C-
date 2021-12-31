import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Iproduct; // used to accept property from parent component

  constructor() { }

  ngOnInit(): void {
  }

}
