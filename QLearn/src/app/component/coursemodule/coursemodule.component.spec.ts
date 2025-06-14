import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleComponent } from './coursemodule.component';

describe('CoursemoduleComponent', () => {
  let component: CourseModuleComponent;
  let fixture: ComponentFixture<CourseModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
