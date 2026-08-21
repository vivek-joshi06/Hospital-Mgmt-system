using HMS_Backend.Common;
using HMS_Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DahbardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DahbardController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Dahbard
        [HttpGet]
        public IActionResult GetDahbardData()
        {
            var dahbardData = new
            {
                TotalDoctors = _context.Doctors.Count(),
                TotalPatients = _context.Patients.Count(),
                TotalAppointments = _context.Appointments.Count(),
                TotalDepartments = _context.Departments.Count()
            };

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Dashboard data retrieved successfully.",
                Data = dahbardData
            });
        }
    }
}
