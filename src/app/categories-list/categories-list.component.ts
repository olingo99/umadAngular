import { Component } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { User } from '../user.service';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {

  @Output() categoryChange = new EventEmitter<Category>();
  @Input() user: User = new User();
  categories: Category[] = [];
  active: boolean = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategoriesByUserId(this.user.iduser).subscribe({
      next: (data) => {
        this.categories = data;

      },
      error: (error) => {
        console.log('error');
        console.log(error);
      },
    });
  }

  onCategoryClick(category: Category): void {
    console.warn('category clicked');
    console.warn(category);
    this.categoryChange.emit(category);
  }

}
