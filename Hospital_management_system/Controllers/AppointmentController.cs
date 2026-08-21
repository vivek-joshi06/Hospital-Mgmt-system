using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointment
        [HttpGet]
        public IActionResult Get()
        {
            var appointmentList = _context.Appointments.ToList();
            return Ok(new ApiResponse<IEnumerable<AppointmentGetAllDto>>
            {
                Success = true,
                Message = "Appointments Retrieved Successfully",
                Data = appointmentList.Select(a => new AppointmentGetAllDto
                {
                    AppointmentID = a.AppointmentID,
                    DoctorID = a.DoctorID,
                    PatientID = a.PatientID,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentStatus = a.AppointmentStatus,
                    Description = a.Description,
                    SpecialRemarks = a.SpecialRemarks,
                    UserID = a.UserID,
                    TotalConsultedAmount = a.TotalConsultedAmount
                })
            });
        }

        // GET: api/Appointment/1
        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Invalid ID"
                });
            }

            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Appointment not found"
                });
            }

            return Ok(new ApiResponse<AppointmentGetByIdDto>
            {
                Success = true,
                Message = "Appointment Retrieved Successfully",
                Data = new AppointmentGetByIdDto
                {
                    AppointmentID = appointment.AppointmentID,
                    DoctorID = appointment.DoctorID,
                    PatientID = appointment.PatientID,
                    AppointmentDate = appointment.AppointmentDate,
                    AppointmentStatus = appointment.AppointmentStatus,
                    Description = appointment.Description,
                    SpecialRemarks = appointment.SpecialRemarks,
                    UserID = appointment.UserID,
                    TotalConsultedAmount = appointment.TotalConsultedAmount
                }
            });
        }

        // POST: api/Appointment
        [HttpPost]
        public IActionResult AddAppointment([FromBody] AppointmentCreateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid JSON"
                    });
                }

                var appointment = new Appointment
                {
                    DoctorID = dto.DoctorID,
                    PatientID = dto.PatientID,
                    AppointmentDate = dto.AppointmentDate,
                    AppointmentStatus = dto.AppointmentStatus,
                    Description = dto.Description,
                    SpecialRemarks = dto.SpecialRemarks,
                    UserID = dto.UserID,
                    TotalConsultedAmount = dto.TotalConsultedAmount,
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                };

                _context.Appointments.Add(appointment);
                _context.SaveChanges();

                return Ok(new ApiResponse<Appointment>
                {
                    Success = true,
                    Message = "Appointment added successfully.",
                    Data = appointment
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding appointment",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/Appointment/1
        [HttpPut("{id:int}")]
        public IActionResult UpdateAppointment(int id, [FromBody] AppointmentUpdateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid JSON"
                    });
                }

                var existingAppointment = _context.Appointments.Find(id);

                if (existingAppointment == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Appointment not found."
                    });
                }

                existingAppointment.DoctorID = dto.DoctorID;
                existingAppointment.PatientID = dto.PatientID;
                existingAppointment.AppointmentDate = dto.AppointmentDate;
                existingAppointment.AppointmentStatus = dto.AppointmentStatus;
                existingAppointment.Description = dto.Description;
                existingAppointment.SpecialRemarks = dto.SpecialRemarks;
                existingAppointment.UserID = dto.UserID;
                existingAppointment.TotalConsultedAmount = dto.TotalConsultedAmount;
                existingAppointment.Modified = DateTime.Now;

                _context.SaveChanges();

                return Ok(new ApiResponse<Appointment>
                {
                    Success = true,
                    Message = "Appointment Updated Successfully",
                    Data = existingAppointment
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating appointment",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // DELETE: api/Appointment/1
        [HttpDelete("{id:int}")]
        public IActionResult DeleteAppointment(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid ID"
                    });
                }

                var appointment = _context.Appointments.Find(id);

                if (appointment == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Appointment not found."
                    });
                }

                _context.Appointments.Remove(appointment);
                _context.SaveChanges();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Appointment deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting appointment",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("dropdown")]
        public IActionResult GetAppointmentsDropdown()
        {
            var appointments = _context.Appointments
                .Select(a => new { a.DoctorID, a.Description })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Appointments retrieved successfully.",
                Data = appointments
            });
        }
    }
}
