import { Component, inject } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);
  author = 'Dharaneesh';

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
