import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  listEmployee: Employee[] = [];
  test: number;

  constructor(public empService: EmployeeService) { }

  ngOnInit() {
    debugger
    this.empService.getEmployee().subscribe(data => {
      this.listEmployee = data;
      this.test = this.listEmployee[0].id;
      console.log(data);
    });
  }
  populateEmployee(selectedEmployee: Employee) {
    console.log(selectedEmployee);
    this.empService.employeeData = selectedEmployee;
  }
  delete(id: number) {
    if (confirm('are you really want to delete this records')) {
      this.empService.deleteEmployee(id).subscribe(data => {
        console.log('record deleted..');
        this.empService.getEmployee().subscribe(data => {
          this.listEmployee = data;

        });
        }, err => {
          console.log('record not delet');
        });
      }
  }
  

  }
