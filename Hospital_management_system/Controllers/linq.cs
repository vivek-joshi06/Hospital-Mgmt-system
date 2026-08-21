using HMS_Backend.Data;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HMS_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CountController(AppDbContext context)
        {
            _context = context;
        }

        //1. GET api/count/total
        [HttpGet("total")]
        public async Task<ActionResult<int>> GetTotalPatients()
        {
            var totalPatients = await _context.Patients.CountAsync();
            Console.WriteLine($"Total Patients: {totalPatients}");
            return Ok(totalPatients);
        }

        //2. Display the total number of doctors guiding department
        [HttpGet("doctors")]
       
        public async Task<ActionResult<int>> GetTotalDoctors()
        {
            var totalDoctors = await _context.Doctors.CountAsync();
            Console.WriteLine($"Total Doctors: {totalDoctors}");
            return Ok(totalDoctors);
        }

        //3.Display the total number of departments available in the system.
        [HttpGet("departments")]
        public async Task<ActionResult<int>> GetTotalDepartments()
        {
            var totalDepartments = await _context.Departments.CountAsync();
            Console.WriteLine($"Total Departments: {totalDepartments}");
            return Ok(totalDepartments);
        }

        //4. Show how many patients belong to each department category.
        [HttpGet("patients-by-department")]
        public async Task<ActionResult<int>> GetPatientCountByDepartment()
        {
            //SELECT  Branch, COUNT(*) AS TotalStudents FROM Students GROUP BY Branch;

            var result = _context.Patients
                .GroupBy(p => p.PatientID)
                .Select(g => new
                {
                    DepartmentId = g.Key,
                    PatientCount = g.Count()
                });

            foreach (var item in result)
            {
                Console.WriteLine($"{item.DepartmentId} : {item.PatientCount}");
            }
            return Ok(result);
        }

        // 5. Show status wise task doctor
        [HttpGet("doctors-by-status")]
        public async Task<ActionResult<int>> GetDoctorCountByStatus()
        {
            //SELECT  Branch, COUNT(*) AS TotalStudents FROM Students GROUP BY Branch;

            var result = _context.Doctors
                .GroupBy(p => p.DoctorID)
                .Select(g => new
                {
                    Status = g.Key,
                    DoctorCount = g.Count()
                });

            foreach (var item in result)
            {
                Console.WriteLine($"{item.Status} : {item.DoctorCount}");
            }
            return Ok(result);
        }

        //6.Show how many appointments are assigned to each doctor member.

        [HttpGet("appointments-by-doctor")] 
        public async Task<ActionResult<int>> GetAppointmentCountByDoctor()
        {
            //SELECT  Branch, COUNT(*) AS TotalStudents FROM Students GROUP BY Branch;
            var result = _context.Appointments
                .GroupBy(p => p.DoctorID)
                .Select(g => new
                {
                    DoctorId = g.Key,
                    AppointmentCount = g.Count()
                });
            foreach (var item in result)
            {
                Console.WriteLine($"{item.DoctorId} : {item.AppointmentCount}");
            }
            return Ok(result);
        }

        //7.Show how many appointments have been assigned to each patient.
        [HttpGet("appointments-by-patient")]
        public async Task<ActionResult<int>> GetAppointmentCountByPatient()
        {
            var result = _context.Appointments
                .GroupBy(p => p.PatientID)
                .Select(g => new
                {
                    PatientId = g.Key,
                    AppointmentCount = g.Count()
                });
            foreach (var item in result)
            {
                Console.WriteLine($"{item.PatientId} : {item.AppointmentCount}");
            }
            return Ok(result);
        }

        // 10. Appointments whose date has passed but are NOT completed
        [HttpGet("appointments-overdue-incomplete")]
        public async Task<ActionResult> GetOverdueIncompleteAppointments()
        {
            var result = await _context.Appointments
                .Include(a => a.Status)
                .Include(a => a.Doctor)
                .Include(a => a.Patient)
                .Where(a => a.AppointmentDate < DateTime.Now
                            && a.Status != null
                            && a.Status.StatusName != "Completed")
                .Select(a => new
                {
                    a.AppointmentID,
                    a.AppointmentDate,
                    DoctorName = a.Doctor!.Name,
                    PatientName = a.Patient!.Name,
                    StatusName = a.Status!.StatusName
                })
                .ToListAsync();

            return Ok(result);
        }

        // 13 / 25. Month-wise completed appointment count
        [HttpGet("appointments-completed-by-month")]
        public async Task<ActionResult> GetCompletedAppointmentsByMonth()
        {
            var result = await _context.Appointments
                .Include(a => a.Status)
                .Where(a => a.Status != null && a.Status.StatusName == "Completed")
                .GroupBy(a => new { a.AppointmentDate.Year, a.AppointmentDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    CompletedCount = g.Count()
                })
                .OrderBy(x => x.Year).ThenBy(x => x.Month)
                .ToListAsync();

            return Ok(result);
        }

        // 18. Appointments due within the next 7 days
        [HttpGet("appointments-due-next-7-days")]
        public async Task<ActionResult> GetAppointmentsDueNext7Days()
        {
            var today = DateTime.Now.Date;
            var sevenDaysOut = today.AddDays(7);

            var result = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.Patient)
                .Include(a => a.Status)
                .Where(a => a.AppointmentDate.Date >= today && a.AppointmentDate.Date <= sevenDaysOut)
                .OrderBy(a => a.AppointmentDate)
                .Select(a => new
                {
                    a.AppointmentID,
                    a.AppointmentDate,
                    DoctorName = a.Doctor!.Name,
                    PatientName = a.Patient!.Name,
                    StatusName = a.Status!.StatusName
                })
                .ToListAsync();

            return Ok(result);
        }

        // 14. Role-wise active user count
        [HttpGet("users-active-by-role")]
        public async Task<ActionResult> GetActiveUserCountByRole()
        {
            var result = await _context.Users
                .Where(u => u.IsActive)
                .GroupBy(u => u.Role)
                .Select(g => new
                {
                    Role = g.Key,
                    ActiveUserCount = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        // 15. Each role with the users assigned to it
        [HttpGet("users-by-role")]
        public async Task<ActionResult> GetUsersGroupedByRole()
        {
            var result = await _context.Users
                .GroupBy(u => u.Role)
                .Select(g => new
                {
                    Role = g.Key,
                    Users = g.Select(u => new
                    {
                        u.UserID,
                        u.UserName,
                        u.Email,
                        u.IsActive
                    }).ToList()
                })
                .ToListAsync();

            return Ok(result);
        }

        // 16. Roles having more than 10 users
        [HttpGet("roles-over-10-users")]
        public async Task<ActionResult> GetRolesWithMoreThan10Users()
        {
            var result = await _context.Users
                .GroupBy(u => u.Role)
                .Where(g => g.Count() > 10)
                .Select(g => new
                {
                    Role = g.Key,
                    UserCount = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        // 17. Role statistics (total / active / inactive per role)
        [HttpGet("role-statistics")]
        public async Task<ActionResult> GetRoleStatistics()
        {
            var result = await _context.Users
                .GroupBy(u => u.Role)
                .Select(g => new
                {
                    Role = g.Key,
                    TotalUsers = g.Count(),
                    ActiveUsers = g.Count(u => u.IsActive),
                    InactiveUsers = g.Count(u => !u.IsActive)
                })
                .ToListAsync();

            return Ok(result);
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

        //LINQ Joins

        // =====================================================
        // 1. INNER JOIN
        // Doctor -> DoctorDepartment -> Department
        // Only doctors that ARE assigned to a department show up
        // =====================================================

        // Manual Join() version
        [HttpGet("doctors-departments-inner-manual")]
        public async Task<ActionResult> GetDoctorsWithDepartmentsInnerManual()
        {
            var result = await _context.DoctorDepartments
                .Join(
                    _context.Doctors,                     // Right table
                    dd => dd.DoctorID,                     // FK on join table
                    doctor => doctor.DoctorID,             // PK on Doctor
                    (dd, doctor) => new { dd, doctor })
                .Join(
                    _context.Departments,                  // Right table
                    x => x.dd.DepartmentID,
                    dept => dept.DepartmentID,
                    (x, dept) => new
                    {
                        DoctorId = x.doctor.DoctorID,
                        DoctorName = x.doctor.Name,
                        Specialization = x.doctor.Specialization,
                        DepartmentId = dept.DepartmentID,
                        DepartmentName = dept.DepartmentName
                    })
                .ToListAsync();

            return Ok(result);
        }

        // Equivalent using Include() + Select() (preferred — EF generates the JOIN for you)
        [HttpGet("doctors-departments-inner")]
        public async Task<ActionResult> GetDoctorsWithDepartmentsInner()
        {
            var result = await _context.DoctorDepartments
                .Include(dd => dd.Doctor)
                .Include(dd => dd.Department)
                .Select(dd => new
                {
                    DoctorId = dd.Doctor!.DoctorID,
                    DoctorName = dd.Doctor.Name,
                    Specialization = dd.Doctor.Specialization,
                    DepartmentId = dd.Department!.DepartmentID,
                    DepartmentName = dd.Department.DepartmentName
                })
                .ToListAsync();

            return Ok(result);
        }

        // =====================================================
        // 2. LEFT OUTER JOIN
        // All Doctors, even those NOT yet assigned to any department
        // =====================================================
        [HttpGet("doctors-departments-left")]
        public async Task<ActionResult> GetDoctorsWithDepartmentsLeft()
        {
            var result = await _context.Doctors
                .GroupJoin(
                    _context.DoctorDepartments,
                    doctor => doctor.DoctorID,
                    dd => dd.DoctorID,
                    (doctor, ddGroup) => new { doctor, ddGroup })
                .SelectMany(
                    x => x.ddGroup.DefaultIfEmpty(),      // <-- makes it a LEFT JOIN
                    (x, dd) => new
                    {
                        DoctorId = x.doctor.DoctorID,
                        DoctorName = x.doctor.Name,
                        DepartmentName = dd != null && dd.Department != null
                            ? dd.Department.DepartmentName
                            : "Not Assigned"
                    })
                .ToListAsync();

            return Ok(result);
        }

        // =====================================================
        // 3. RIGHT OUTER JOIN
        // All Departments, even those with NO doctors assigned yet
        // (swap the root entity to Department, same trick as Right Join)
        // =====================================================
        [HttpGet("doctors-departments-right")]
        public async Task<ActionResult> GetDoctorsWithDepartmentsRight()
        {
            var result = await _context.Departments
                .GroupJoin(
                    _context.DoctorDepartments,
                    dept => dept.DepartmentID,
                    dd => dd.DepartmentID,
                    (dept, ddGroup) => new { dept, ddGroup })
                .SelectMany(
                    x => x.ddGroup.DefaultIfEmpty(),      // <-- makes it a RIGHT JOIN (from Department's view)
                    (x, dd) => new
                    {
                        DepartmentId = x.dept.DepartmentID,
                        DepartmentName = x.dept.DepartmentName,
                        DoctorName = dd != null && dd.Doctor != null
                            ? dd.Doctor.Name
                            : "No Doctor Assigned"
                    })
                .ToListAsync();

            return Ok(result);
        }


    }
}