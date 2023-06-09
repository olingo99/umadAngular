import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { EventTemplate,EventTemplateService } from '../event-template.service';
import {EventService } from '../event.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.css']
})
export class EventTemplateComponent {
  @Input() adjustVisible: boolean = false;                //Boolean used to know if the adjust button is visible
  @Input() template: EventTemplate = new EventTemplate(); //Template to display
  newTemplate: EventTemplate = new EventTemplate();      //object to hold the new template
  @Output() submitRes = new EventEmitter<string>();     //Event used to send the result string of the creation of a new template

  constructor(
    private formBuilder: FormBuilder,
    private eventTemplateService: EventTemplateService,
    private eventService: EventService
  ) { }
  
  ngOnInit(): void {
    this.onChanges();
  }

  //Form used to adjust the proposed weight of the template
  eventForm = this.formBuilder.group({
    Weight: this.template.ProposedWeight
  });

  //Form used to create a new template
  newEventForm = this.formBuilder.group({
    Name : '',
    Weight:''
  });

  //Function to set the color of the weight depending on its value
  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }

  //Function called when the user clicks on the adjust or add button
  onSubmit(id:string): void {
    if(id == "Add"){                                   //If the user clicked on the add button, call the sendEvent function with the new template
      this.newTemplate.Name = this.template.Name;
      this.newTemplate.ProposedWeight = +this.eventForm.value.Weight!;
      this.newTemplate.iduser = this.template.iduser;
      this.newTemplate.idcategory = this.template.idcategory;
      this.sendEvent(this.newTemplate);
    } 
    else{                                             //If the user clicked on the adjust button
      this.template.ProposedWeight = +this.eventForm.value.Weight!; //Set the proposed weight of the template to the value of the form
      this.eventTemplateService.updateEventTemplate(this.template).subscribe({  //Call the updateEventTemplate function of the eventTemplateService
        next: (data) => {
          this.submitRes.emit('success'); //Send the result of the update to the parent component
        },
        error: (error) => {
          this.submitRes.emit('error'); //Send the result of the update to the parent component
          console.log('error');
          console.log(error);
        }
      });
    }
  }


  //Function called when the user clicks on the add button of the new template form
  onSubmitNewTemplate(): void {
    this.newTemplate.Name = this.newEventForm.value.Name!;               //Set the name and the proposed weight of the new template to the values of the form
    this.newTemplate.ProposedWeight = +this.newEventForm.value.Weight!;
    this.newTemplate.iduser = this.template.iduser;
    this.newTemplate.idcategory = this.template.idcategory;

    if (this.newTemplate.Name == '') {  //Check if the name is not empty
      this.submitRes.emit('Category name cannot be empty');
      return;
    }
    if (this.newEventForm.value.Weight! == '') {  //Check if the weight are not empty
      this.submitRes.emit('Weight cannot be empty');
      return;
    }
    this.eventTemplateService.addEventTemplate(this.newTemplate).subscribe({  //Call the addEventTemplate function of the eventTemplateService
      next: (data) => {
        this.sendEvent(this.newTemplate); //Call the sendEvent function with the new template
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      }
    }); 
    this.newEventForm.setValue({     //clear form inputs 
      Name: '',
      Weight: ''
    });
  }


  //Function to add a new event to the database
  sendEvent(template: EventTemplate): void {
    this.eventService.addEvent(template).subscribe({
      next: (data) => {
        this.submitRes.emit('success');
      },
      error: (error) => {
        this.submitRes.emit('error');
        console.log('error');
        console.log(error);
      }
    });

  }


  onChanges(): void {
    this.eventForm.setValue({
      Weight: this.template.ProposedWeight  //Set the value of the form to the proposed weight of the template
  });
}
}
