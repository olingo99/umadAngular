import { Component } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { User } from '../user.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/*
Component used to display the list of categories of a user. Used in the event creation page
*/


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @Output() categoryChange = new EventEmitter<Category>();  //Event used to change the category displayed in the event creation page's template list component
  @Input() user: User = new User(); //User who owns the categories to display
  categories: Category[] = [];  //Categories to display
  active: boolean = false;  //Boolean used to know if the user is loaded

  resString: string = ''; //String used to display the result of the category creation

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  //Form used to create a new category
  categoryForm = this.formBuilder.group({
    Name: '',
  });

  ngOnInit(): void {
    this.getCategories();
  }

  //Function used to get the categories of the user
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

  //Function called when a category is clicked, emits the categoryChange event
  onCategoryClick(category: Category): void {
    this.categoryChange.emit(category);
  }

  //Function called when the create category button is clicked, creates a new category
  onSubmitNewCategory(): void {
    let cat = new Category();
    cat.iduser = this.user.iduser;
    cat.Name = this.categoryForm.value.Name!;

    if (cat.Name == '') { //Check if the category name is empty
      this.resString = 'Category name cannot be empty';
      return;
    }

    this.categoryService.addCategory(cat).subscribe({
      next: (data) => {
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
