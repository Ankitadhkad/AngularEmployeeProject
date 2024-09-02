import { Component, OnInit} from '@angular/core';

import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../shared/employee.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  toast: any;
  ngForm: any;
  Employee: Employee[];

  constructor(public empService: EmployeeService) { }




  ngOnInit(): void {
  }
  submit(form: NgForm) {
    console.log('Event is working.');

    if (this.empService.employeeData.id == 0) {
      this.insertEmployee(form);
    } else {
      this.updateEmployee(form);
    }
  }

  insertEmployee(form: NgForm) {
    this.empService.saveEmployee(this.empService.employeeData).subscribe({
      next: (data) => {
        this.resetForm(form);
        this.refreshData();
        this.showSuccessToast('Success', 'Record Saved');
      },
      error: (err) => {
        console.error('Error occurred while saving employee:', err);
      }
    });
  }

  updateEmployee(form: NgForm) {
    this.empService.updateEmployee(this.empService.employeeData).subscribe({
      next: (data) => {
        this.resetForm(form);
        this.refreshData();
        this.showWarningToast('Success', 'Record Updated');
      },
      error: (err) => {
        console.error('Error occurred while updating employee:', err);
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm(); // Reset the form to its initial state
    this.empService.employeeData = new Employee(); // Reset employee data
    this.hideShowSlide(); // Presuming this is a method for additional UI changes
  }

  refreshData() {
    this.empService.getEmployee().subscribe({
      next: (res) => {
        this.empService.listEmployee = res;
      },
      error: (err) => {
        console.error('Error occurred while fetching employees:', err);
      }
    });
  }

  showSuccessToast(title: string, message: string) {
    if (this.toast && typeof this.toast.success === 'function') {
      this.toast.success(title, message);
    } else {
      console.warn('Toast service is not defined or not a function.');
    }
  }

  showWarningToast(title: string, message: string) {
    if (this.toast && typeof this.toast.warning === 'function') {
      this.toast.warning(title, message);
    } else {
      console.warn('Toast service is not defined or not a function.');
    }
  }

  hideShowSlide() {
    // Implementation of hideShowSlide, if it exists
  }
}
