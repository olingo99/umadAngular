import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { User} from '../user.service';
import { EventTemplate, EventTemplateService } from '../event-template.service';
import { Category } from '../category.service';
import { AuthTokenService } from '../auth-token.service';

/*
Component used to display the list of templates of a user, and to add new templates. Used in the event creation page.
*/


@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent {

  @Input() category: Category = new Category(); //category of the events to display while it stays the default category, it means the user has not selected a category yet
  @Input() user: User = new User();             //user to whom the templates belong

  @Output() refrechEvent = new EventEmitter<boolean>(); //used to refresh the parent component after a template is added, displaying the new template in the list

  eventTemplates: EventTemplate[] = []; //list of templates to display
  active: boolean = false;            //used to wait for the data to be loaded before displaying the component
  newTemplate: EventTemplate = new EventTemplate(); //template to add
  resString: string = ''; //used to display the result of the template creation

  adjustVisible: boolean = false; //used to display the adjust button only if the connected user is the owner of the templates

  constructor(
    private eventTemplateService: EventTemplateService,
    private authTokenService: AuthTokenService
  ) { }


  ngOnInit(): void {

    this.adjustVisible = +this.authTokenService.getConnectedUser() == this.user.iduser; //check if the connected user is the owner of the templates

    this.newTemplate.idcategory = this.category.idcategory; //set the category of the new template
    this.newTemplate.iduser = this.user.iduser;            //set the owner of the new template
    this.eventTemplateService.getEventTemplatesByUserId(this.user.iduser).subscribe({   //get all the templates of the user
      next: (data) => {
        this.eventTemplates = data; //set the list of templates
        this.active = true;        //display the component
      },
      error: (error) => {
        this.active = true;
      }
    });
  }

  //called if one the Input() is changed
  ngOnChanges(): void {
    this.ngOnInit();
  }


  //called when the user click on the add button in the template creation form
  onSubmitRes(res:string): void {
    this.resString = res;      //set the result string to display
    this.refrechEvent.emit(true); //refresh the parent component
  }

}
