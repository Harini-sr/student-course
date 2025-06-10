import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipalServiceService } from '../../service/principal-service.service';

@Component({
  selector: 'app-edit-instructor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {
  instructorForm!: FormGroup;
  id!: string;
  selectedInstructor: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: PrincipalServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve instructor ID from the URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    // Initialize the form before making API call
    this.instructorForm = this.fb.group({
      instructorId: [''],
      name: [''],
      email: [''],
      department: [''],
      coursesTaken: ['']
    });

    // Fetch instructor details and populate form
    this.service.getInstructorById(this.id).subscribe((data) => {
      if (data) {
        this.selectedInstructor = data;
        this.instructorForm.patchValue({
          instructorId: data.instructorId,
          name: data.name,
          email: data.email,
          department: data.department,
          coursesTaken: data.coursesTaken.join(', ') // Converts array to string for easy editing
        });
      }
    });
  }

  onSubmit() {
    if (this.instructorForm.valid) {
      const updatedData = {
        ...this.instructorForm.value,
        coursesTaken: this.instructorForm.value.coursesTaken
          .split(',')
          .map((course: string) => course.trim()) // Convert back to array
      };

      this.service.updateInstructor(this.id, updatedData).subscribe(() => {
        alert('Instructor updated successfully!');
        this.router.navigate(['/instructors']);
      });
    }
  }
}
