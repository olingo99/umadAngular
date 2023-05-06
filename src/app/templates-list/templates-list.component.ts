import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { User} from '../user.service';
import { EventTemplate, EventTemplateService } from '../event-template.service';
import { Event } from '../event.service';
import { Category } from '../category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent {

  @Input() category: Category = new Category();
  @Input() user: User = new User();

  @Output() refrechEvent = new EventEmitter<boolean>();

  eventTemplates: EventTemplate[] = [];
  active: boolean = false;
  newTemplate: EventTemplate = new EventTemplate();
  resString: string = '';

  constructor(
    private eventTemplateService: EventTemplateService
  ) { }


  ngOnInit(): void {
    this.newTemplate.idcategory = this.category.idcategory;
    this.newTemplate.iduser = this.user.iduser;
    this.eventTemplateService.getEventTemplatesByUserId(this.user.iduser).subscribe({
      next: (data) => {
        console.warn('templatelist')
        console.warn(data);
        this.eventTemplates = data;
        this.active = true;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.active = true;
      }
    });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }


  onSubmitRes(res:string): void {
    // this.ngOnInit();
    this.resString = res;
    this.refrechEvent.emit(true);
  }

}
