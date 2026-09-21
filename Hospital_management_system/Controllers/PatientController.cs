using FluentValidation;
using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IValidator<PatientCreateDto> _createValidator;

        public PatientController(AppDbContext context, IValidator<PatientCreateDto> createValidator)
        {
            _context = context;
            _createValidator = createValidator;
        }

        // GET: api/Patient
        [HttpGet]
        public IActionResult Get()
        {
            var patientList = _context.Patients.ToList();
            return Ok(patientList);
        }

        // GET: api/Patient/1
        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var patient = _context.Patients.Find(id);

            if (patient == null)
            {
                return NotFound("Patient not found");
            }

            return Ok(patient);
        }

        // POST: api/Patient
        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] PatientCreateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Invalid JSON");
                }

                var result = await _createValidator.ValidateAsync(dto);

                if (!result.IsValid)
                {
                    return BadRequest(result.Errors.Select(x => x.ErrorMessage));
                }

                var patient = new Patient
                {
                    Name = dto.Name,
                    DateOfBirth = dto.DateOfBirth,
                    Gender = dto.Gender,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    Address = dto.Address,
                    City = dto.City,
                    State = dto.State,
                    IsActive = dto.IsActive,
                    UserID = dto.UserID,
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                };

                _context.Patients.Add(patient);
                _context.SaveChanges();

                return Ok(new ApiResponse<Patient>
                {
                    Success = true,
                    Message = "Patient Added Successfully",
                    Data = patient
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding student",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/Patient/1
        [HttpPut("{id:int}")]
        public IActionResult UpdatePatient(int id, [FromBody] PatientUpdateDto dto)
        {
            try
            {

            if (dto == null)
            {
                return BadRequest("Invalid JSON");
            }

            var existingPatient = _context.Patients.Find(id);

            if (existingPatient == null)
            {
                return NotFound("Patient not found.");
            }

            existingPatient.Name = dto.Name;
            existingPatient.DateOfBirth = dto.DateOfBirth;
            existingPatient.Gender = dto.Gender;
            existingPatient.Email = dto.Email;
            existingPatient.Phone = dto.Phone;
            existingPatient.Address = dto.Address;
            existingPatient.City = dto.City;
            existingPatient.State = dto.State;
            existingPatient.IsActive = dto.IsActive;
            existingPatient.UserID = dto.UserID;
            existingPatient.Modified = DateTime.Now;

            _context.SaveChanges();

            return Ok(new ApiResponse<Patient>
            {
                Success = true,
                Message = "Patient Updated Successfully",
                Data = existingPatient
            });
            }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = "Error occurred while updating patient",
                Errors = new List<string> { ex.Message }
            });
        }
    }

        // DELETE: api/Patient/1
        [HttpDelete("{id:int}")]
        public IActionResult DeletePatient(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Invalid ID");
                }

                var patient = _context.Patients.Find(id);

                if (patient == null)
                {
                    return NotFound("Patient not found.");
                }

                _context.Patients.Remove(patient);
                _context.SaveChanges();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Patient Deleted Successfully",
                    Data = patient
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting patient",
                    Errors = new List<string> { ex.Message }
                });
            }
        }
        
        [HttpGet("dropdown")]
        public IActionResult GetPatientsDropdown()
        {
            var patients = _context.Patients
                .Select(p => new { p.UserID, p.Name })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Patients retrieved successfully.",
                Data = patients
            });
        }
    }
}