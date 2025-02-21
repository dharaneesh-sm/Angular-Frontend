import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})

export class ProductComponent implements OnInit {
  private router = inject(Router);
  products: any[] = [];
  searchText: string = '';
  // newProduct = { name: '', description: '', price: 0, category: '' };
  // editingProduct: any = null;
  index = '';

  Products: FormGroup;
  selectProduct: any = null;
  constructor(private FB: FormBuilder, private productService: ProductService) {
    this.Products = this.FB.group({
      name: [''],
      description: [''],
      price: [''],
      category: ['']
    })
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSumbit() {
    if (this.selectProduct) {
      const Details = this.Products.value;
      console.log(Details);
      
      if (Details.name && Details.price) {
        this.productService.updateProduct(Details,this.selectProduct._id).subscribe(() => {
          this.loadProducts();
          this.Products.reset();
          this.selectProduct=null;
        });
      }
    }
    else {
      const Details = this.Products.value;
      if (Details.name && Details.price) {
        this.productService.addProduct(Details).subscribe((product) => {
          this.Products.reset();
          this.loadProducts();
        });
      }
    }
  }

  updateProduct(product: any) {
    this.selectProduct = product;
    this.Products.patchValue(product);
  }

  deleteProduct(id: string) {
    if (confirm("Do you want to Delete the Product")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter((p) => p._id !== id);
      },
        error => {
          console.error('Error Deleting the Message', error);
        })
    }
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  // addProduct() {
  //   if (this.newProduct.name && this.newProduct.price) {
  //     this.productService.addProduct(this.newProduct).subscribe((product) => {
  //       this.products.push(product);
  //       this.newProduct = { name: '', description: '', price: 0, category: '' };
  //       this.loadProducts();
  //     });
  //   }
  // }

  // deleteProduct(id: string) {
  //   this.productService.deleteProduct(id).subscribe(() => {
  //     this.products = this.products.filter((p) => p._id !== id);
  //   });
  // }

  // startEditing(product: any) {
  //   this.editingProduct = { ...product };
  // }

  // updateProduct() {
  //   if (this.editingProduct) {
  //     this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
  //       this.loadProducts(); 
  //       this.editingProduct = null;
  //     });
  //   }
  // }

}

