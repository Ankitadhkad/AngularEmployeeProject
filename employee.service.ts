import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  updateEployee() {
      throw new Error('Method not implemented.');
  }
 

  constructor( private myhttp: HttpClient) { }
  

  employeeUrl: string = 'https://localhost:7081/api/Employee';
  listEmployee: Employee[] = [];
  employeeData: Employee = new Employee();


  saveEmployee(employee: Employee): Observable<any>  {
    return this.myhttp.post(this.employeeUrl, this.employeeData).pipe(catchError(this.handleError));
  }
  updateEmployee(employeeData: Employee): Observable<any> {
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`, this.employeeData).pipe(catchError(this.handleError));
  }
  getEmployee(): Observable<Employee[]>
  {
    return this.myhttp.get<Employee[]>(this.employeeUrl);
  }
  deleteEmployee(Id: number) {
    return this.myhttp.delete(`${this.employeeUrl}/${Id}`);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
