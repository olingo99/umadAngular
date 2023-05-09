import { Component } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { User } from '../user.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  resString: string = '';

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  categoryForm = this.formBuilder.group({
    Name: '',
  });

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

  onSubmitNewCategory(): void {
    let cat = new Category();
    cat.iduser = this.user.iduser;
    cat.Name = this.categoryForm.value.Name!;
    console.warn('new category');
    console.warn(cat);
    this.categoryService.addCategory(cat).subscribe({
      next: (data) => {
        console.warn('category added');
        this.resString = 'Category added';
        this.ngOnInit();
        this.categoryForm.setValue({Name:''})
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.resString = 'Error adding category';
      }
    });
  }

}
