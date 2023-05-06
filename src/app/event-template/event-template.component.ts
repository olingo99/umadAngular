import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { EventTemplate,EventTemplateService } from '../event-template.service';
import { Event, EventService } from '../event.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.css']
})
export class EventTemplateComponent {

  @Input() template: EventTemplate = new EventTemplate();
  newTemplate: EventTemplate = new EventTemplate();
  @Output() submitRes = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private eventTemplateService: EventTemplateService,
    private eventService: EventService
  ) { }
  
  ngOnInit(): void {
    this.onChanges();
  }

  eventForm = this.formBuilder.group({
    Weight: this.template.ProposedWeight
  });

  newEventForm = this.formBuilder.group({
    Name : '',
    Weight:''
  });

  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }

  onSubmit(id:string): void {
    console.warn('submitted');
    console.warn(this.eventForm.value);
    if(id == "Add"){
      this.newTemplate.Name = this.template.Name;
      this.newTemplate.ProposedWeight = +this.eventForm.value.Weight!;
      this.newTemplate.iduser = this.template.iduser;
      this.newTemplate.idcategory = this.template.idcategory;
      this.sendEvent(this.newTemplate);
    }
    else{
      this.template.ProposedWeight = +this.eventForm.value.Weight!;
      this.eventTemplateService.updateEventTemplate(this.template).subscribe({
        next: (data) => {
          console.warn('updateEventTemplate');
          console.warn(data);
          this.submitRes.emit('success');
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        }
      });
      // this.submitRes.emit('Adjusted proposed wieght');
    }

  }

  onSubmitNewTemplate(): void {
    this.newTemplate.Name = this.newEventForm.value.Name!;
    this.newTemplate.ProposedWeight = +this.newEventForm.value.Weight!;
    this.newTemplate.iduser = this.template.iduser;
    this.newTemplate.idcategory = this.template.idcategory;

    console.warn('submitted');
    console.warn(this.newTemplate);

    this.eventTemplateService.addEventTemplate(this.newTemplate).subscribe({
      next: (data) => {
        console.warn('addEventTemplate');
        console.warn(data);
        this.sendEvent(this.newTemplate);
        // this.submitRes.emit('success');
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      }
    }); 
    //clear form inputs 
    this.newEventForm.setValue({
      Name: '',
      Weight: ''
    });
  }

  sendEvent(template: EventTemplate): void {
    this.eventService.addEvent(template).subscribe({
      next: (data) => {
        console.warn('addEvent');
        console.warn(data);
        this.submitRes.emit('success');
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      }
    });

  }

  onChanges(): void {
    this.eventForm.setValue({
      Weight: this.template.ProposedWeight
  });
}
}
