import { async } from '@angular/core/testing';
import { ProductService } from './product.service';
import { IProduct } from './IProduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];


  constructor(private productService: ProductService) {
  }

  roundsToNearestInteger(): void {
    for (const object of this.products) {
      object.starRating = (Math.round(object.starRating)
      );
    }
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  async ngOnInit()  {
    this.products = await this.productService.getProducts();
    this.filteredProducts = this.products;
    this.roundsToNearestInteger();
  }
}
