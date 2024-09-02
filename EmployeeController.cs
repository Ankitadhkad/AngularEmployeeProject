using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc.Infrastructure;

using WebApiCoreLecture.Server.Model;



namespace WebApiCoreLecture.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody] ViewModels.EmployeeRequest employeeRequest)
        {
            var employee = new Employee
            {
                Name = employeeRequest.Name,
                Email = employeeRequest.Email,
                Phone = employeeRequest.Phone,
                Address = employeeRequest.Address,
                Department = employeeRequest.Department,

            };


            await _employeeRepository.AddEmployeeAsync(employeeRequest);
            return Ok();
        }

        [HttpGet]

        public async Task<ActionResult> GetEmployeeList()
        {
            var employeeList = await _employeeRepository.GetAllEmployeesAsync();
            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeById([FromRoute] int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee([FromRoute] int id, [FromBody] ViewModels.EmployeeRequest employeeRequest)
        {
            await _employeeRepository.UpdateEmployeeAsync(id, employeeRequest);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            await _employeeRepository.DeleteEmployeeAsync(id);
            return Ok();
        }

    }
}