import { Component, Input } from '@angular/core';
import { Event } from '../event.service';
import { CategoryService, Category } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: Event = new Event();
  // @Input() event: string= "";

  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.event);

    this.route.params.subscribe((params) => {
      this.categoryService.getCategoryById(params['id'], this.event.idcategory).subscribe({
        next: (data) => {
          console.warn(data)
          this.category = data;
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );



    // this.categoryService.getCategoryById(this.event.idcategory).subscribe({
    //   next: (data) => {
    //     console.warn(data)
    //     this.category = data;
    //   },
    //   error: (error) => {
    //     console.log('error');
    //     console.log(error);
    //   },
    // });
  }

  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }
}