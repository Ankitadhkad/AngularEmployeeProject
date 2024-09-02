import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/employee.service';
import { Employee } from './shared/employee.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) { }




    ngOnInit(): void {
      //this.employeeService.getEmployee().subscribe(
      //  (data: Employee[]) => {
      //    this.employees = data;
      //  },
      //  (error) => {
      //    console.error('Error fetching employee data', error);
      //    this.errorMessage = 'There was an error fetching the employee data. Please try again later.';
      //  }
      //);
    }
    }



