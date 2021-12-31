import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ipagination } from './models/pagination';
import { Iproduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Store';


  constructor()
  { }

  ngOnInit(): void {
    // this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: Ipagination) => {
    //   this.products = response.data;
    // }, error => {
    //   console.log(error);
    // });
  }
}


  
