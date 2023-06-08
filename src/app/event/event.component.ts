import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Event } from '../event.service';
import { CategoryService, Category } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.service';
import { EventService } from '../event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: Event = new Event();
  // @Input() event: string= "";
  @Input() user: User = new User();
  @Output() deleteEventEvent = new EventEmitter<boolean>();
  @Input() friend: boolean = false;


  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.warn('event init');
    console.log(this.event);

    this.categoryService.getCategoryById(this.user.iduser, this.event.idcategory).subscribe({
      next: (data) => {
        console.warn(data)
        this.category = data;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.category = new Category();
      },
    });

    // this.route.params.subscribe((params) => {
    //   this.categoryService.getCategoryById(params['id'], this.event.idcategory).subscribe({
    //     next: (data) => {
    //       console.warn(data)
    //       this.category = data;
    //     },
    //     error: (error) => {
    //       console.log('error');
    //       console.log(error);
    //     },
    //   });
    // }
    // );



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

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }

  deleteEvent() {
    this.eventService.deleteEventById(this.user.iduser, this.event.idevent).subscribe({
      next: (data) => {
        console.warn(data)
        console.warn("delete event")
        this.deleteEventEvent.emit(true);
      },
      error: (error) => {
        this.deleteEventEvent.emit(false);
      },
    });
  }
}
