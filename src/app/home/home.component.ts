import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  products: any[] = [];
  searchText: string = '';
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  goToManagePage() {
    this.router.navigate(['/manage']);
  }
}
