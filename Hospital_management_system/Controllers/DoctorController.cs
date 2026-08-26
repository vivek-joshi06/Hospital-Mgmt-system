using FluentValidation;
using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {

        private readonly IValidator<DoctorCreateDto> _validator;
        private readonly AppDbContext _context;
        public DoctorController(IValidator<DoctorCreateDto> validator,AppDbContext context)
        {
            _context = context;
            _validator = validator;
        }

        // GET: api/Doctor
        [HttpGet]
        public IActionResult Get()
        {
            var doctorList = _context.Doctors.ToList();
            return Ok(new ApiResponse<IEnumerable<DoctorGetByIdDto>>
            {
                Success = true,
                Message = "Doctors Retrieved Successfully",
                Data = doctorList.Select(d => new DoctorGetByIdDto
                {
                    DoctorID = d.DoctorID,
                    Name = d.Name,
                    Phone = d.Phone,
                    Email = d.Email,
                    Qualification = d.Qualification,
                    Specialization = d.Specialization,
                    IsActive = d.IsActive,
                    UserID = d.UserID
                })
            });
        }

        // GET: api/Doctor/1
        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var doctor = _context.Doctors.Find(id);

            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            return Ok(new ApiResponse<DoctorGetByIdDto>
            {
                Success = true,
                Message = "Doctor Retrieved Successfully",
                Data = new DoctorGetByIdDto
                {
                    DoctorID = doctor.DoctorID,
                    Name = doctor.Name,
                    Phone = doctor.Phone,
                    Email = doctor.Email,
                    Qualification = doctor.Qualification,
                    Specialization = doctor.Specialization,
                    IsActive = doctor.IsActive,
                    UserID = doctor.UserID
                }
            });
        }

        // POST: api/Doctor
        [HttpPost]
        public async Task<IActionResult> AddDoctorAsync([FromBody] DoctorCreateDto dto)
        {
            try {
                var result = await _validator.ValidateAsync(dto);

                if (!result.IsValid)
                {
                    return BadRequest(result.Errors.Select(x => x.ErrorMessage));
                }

                if (dto == null)
                {
                return BadRequest("Invalid JSON");
                }

            var userExists = _context.Users.Any(u => u.UserID == dto.UserID);
            if (!userExists)
            {
                return BadRequest($"User with UserID {dto.UserID} does not exist.");
            }

            var doctor = new Doctor
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
                Qualification = dto.Qualification,
                Specialization = dto.Specialization,
                IsActive = dto.IsActive,
                UserID = dto.UserID,
                Created = DateTime.Now,
                Modified = DateTime.Now
            };

            _context.Doctors.Add(doctor);
            _context.SaveChanges();

                return Ok(new ApiResponse<Doctor>
                {
                    Success = true,
                    Message = "Doctor added successfully.",
                    Data = doctor
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding Doctor",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/Doctor/1
        [HttpPut("{id:int}")]
        public IActionResult UpdateDoctor(int id, [FromBody] DoctorUpdateDto dto)
        {
            try { 
            if (dto == null)
            {
                return BadRequest("Invalid JSON");
            }

            var existingDoctor = _context.Doctors.Find(id);

            if (existingDoctor == null)
            {
                return NotFound("Doctor not found.");
            }

            existingDoctor.Name = dto.Name;
            existingDoctor.Phone = dto.Phone;
            existingDoctor.Email = dto.Email;
            existingDoctor.Qualification = dto.Qualification;
            existingDoctor.Specialization = dto.Specialization;
            existingDoctor.IsActive = dto.IsActive;
            existingDoctor.UserID = dto.UserID;
            existingDoctor.Modified = DateTime.Now;

            _context.SaveChanges();

            return Ok(new ApiResponse<Doctor>
            {
                Success = true,
                Message = "Doctor Updated Successfully",
                Data = existingDoctor
            });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating doctor",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // DELETE: api/Doctor/1
        [HttpDelete("{id:int}")]
        public IActionResult DeleteDoctor(int id)
        {
            try { 
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var doctor = _context.Doctors.Find(id);

            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            _context.Doctors.Remove(doctor);
            _context.SaveChanges();

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Doctor deleted successfully."
            });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting doctor",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("dropdown")]
        public IActionResult GetDoctorsDropdown()
        {
            var doctors = _context.Doctors
                .Select(d => new { d.UserID, d.Name })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Doctors retrieved successfully.",
                Data = doctors
            });
        }
    }
}
