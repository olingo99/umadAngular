import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
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
      }
    });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }


  onSubmitRes(res:string): void {
    this.resString = res;
  }

}
