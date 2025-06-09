import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PrincipalServiceService } from '../../service/principal-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalListComponent } from '../approval-list/approval-list.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: string | null = null;
  courses: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private service: PrincipalServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      instructor: ['', Validators.required],
      modules: this.fb.array([]),  // Replace material with modules
      category: [''],
      duration: [''],
      rating: ['']
    });

    this.loadCourses();

    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.service.getCourse(this.courseId).subscribe(data => {
        this.courseForm.patchValue(data);
        if (data.modules && Array.isArray(data.modules)) {
          this.setModules(data.modules);
        }
      }, err => {
        console.error('Error loading course:', err);
      });
    }
  }

  get modules(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  setModules(modules: any[]) {
    const moduleFGs = modules.map(module => this.fb.group({
      title: [module.title, Validators.required],
      description: [module.description, Validators.required]
    }));
    const moduleFormArray = this.fb.array(moduleFGs);
    this.courseForm.setControl('modules', moduleFormArray);
  }

  addModule() {
    this.modules.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  loadCourses(): void {
    this.service.getCourses().subscribe(data => {
      this.courses = data;
    }, err => {
      console.error('Error fetching courses:', err);
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.courseId) {
      this.service.updateCourse(this.courseId, this.courseForm.value).subscribe(() => {
        alert('Course updated successfully');
        this.loadCourses();
      }, err => {
        console.error('Error updating course:', err);
      });
    } else {
      this.service.addCourse(this.courseForm.value).subscribe(() => {
        alert('Course added successfully');
        this.loadCourses();
        this.courseForm.reset();
        this.modules.clear();  // reset modules as well
      }, err => {
        console.error('Error adding course:', err);
      });
    }
  }

  deleteCourse(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.service.deleteCourse(id).subscribe(() => {
        alert('Course deleted successfully');
        this.loadCourses();
      }, err => {
        console.error('Error deleting course:', err);
      });
    }
  }

  openDialog() {
    this.dialog.open(ApprovalListComponent, {
      width: '570px',
      height: '630px',
      panelClass: 'custom-dialog'
    });
  }
}
