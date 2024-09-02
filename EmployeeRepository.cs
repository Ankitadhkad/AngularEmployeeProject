using WebApiCoreLecture.Server.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using WebApiCoreLecture.Server.ViewModels;

namespace WebApiCoreLecture.Server.Model
{
    public class EmployeeRepository
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeRepository(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        public async Task AddEmployeeAsync(EmployeeRequest employeeRequest)
        {
            var employee = new Employee
            {
                Name = employeeRequest.Name,
                Email = employeeRequest.Email,
                Phone = employeeRequest.Phone,
                Address = employeeRequest.Address,
                Department = employeeRequest.Department,

            };
            await _employeeContext.Employees.AddAsync(employee);
            await _employeeContext.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _employeeContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeeContext.Employees.FindAsync(id);
        }

        public async Task UpdateEmployeeAsync(int id, EmployeeRequest employeeRequest)
        {
            var employee = await _employeeContext.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }

            employee.Name = employeeRequest.Name;
            employee.Email = employeeRequest.Email;
            employee.Phone = employeeRequest.Phone;
            employee.Address = employeeRequest.Address;
            employee.Department = employeeRequest.Department;


            await _employeeContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            try {
                var employee = await _employeeContext.Employees.FindAsync(id);
                if (employee == null)
                {
                    throw new Exception("Employee not found");
                }
                _employeeContext.Employees.Remove(employee);
                await _employeeContext.SaveChangesAsync();
            }
            catch(Exception ex) {
                throw new NotImplementedException(ex.Message);
            }
            
            
        }

        public async Task<Employee> GetEmployeeByEmailAsync(string email)
        {
            return await _employeeContext.Employees.FirstOrDefaultAsync(e => e.Email == email);


        }

        

        internal Task AddEmployeeAsync(Employee model)
        {
            throw new NotImplementedException();
        }

        //internal Task DeleteEmployeeAsnyc(int id)
        //{
        //    throw new NotImplementedException();
        //}
    }
}