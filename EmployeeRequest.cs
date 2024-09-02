namespace WebApiCoreLecture.Server.ViewModels
{
    public class EmployeeRequest

    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Department { get; set; }
        public int Id { get; internal set; }
    }
}
