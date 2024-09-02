using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;

namespace WebApiCoreLecture.Server.Model
{
    public class EmployeeContext: DbContext
    {

        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }

    }
}
