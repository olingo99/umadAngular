import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { EventTemplate } from '../event-template.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.css']
})
export class EventTemplateComponent {

  @Input() template: EventTemplate = new EventTemplate();
  newTemplate: EventTemplate = new EventTemplate();


  constructor(
    private formBuilder: FormBuilder
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

  onSubmit(): void {
    console.warn('submitted');
    console.warn(this.eventForm.value);
  }

  onSubmitNewTemplate(): void {
    this.newTemplate.Name = this.newEventForm.value.Name!;
    this.newTemplate.ProposedWeight = +this.newEventForm.value.Weight!;
    this.newTemplate.iduser = this.template.iduser;
    this.newTemplate.idcategory = this.template.idcategory;

    console.warn('submitted');
    console.warn(this.newTemplate);
  }

  onChanges(): void {
    this.eventForm.setValue({
      Weight: this.template.ProposedWeight
  });
}
}
