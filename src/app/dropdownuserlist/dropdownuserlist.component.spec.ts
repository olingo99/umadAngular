import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownuserlistComponent } from './dropdownuserlist.component';

describe('DropdownuserlistComponent', () => {
  let component: DropdownuserlistComponent;
  let fixture: ComponentFixture<DropdownuserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownuserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
