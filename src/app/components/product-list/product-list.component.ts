import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  _pageTitle: string;
  products: IProduct[];
  showImage: boolean = false;
  filteredProduct: IProduct[];
  _listFilter: string;
  errorMessage: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProduct = this.products;
      },
      error: err => this.errorMessage = err
    });
    this._pageTitle = this.pageTitle;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value
    this.filteredProduct = this.listFilter ?
      this.performFilter(this.listFilter) :
      this.products;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    )
  }

  onRatingClick(event) {
    this.pageTitle = this._pageTitle;
    this.pageTitle = `${this.pageTitle} ${event}`;
  }

}
