using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Department
        [HttpGet]
        public IActionResult Get()
        {
            var departmentList = _context.Departments.ToList();
            return Ok(new ApiResponse<List<DepartmentGetAllDto>>
            {
                Success = true,
                Message = "Departments Retrieved Successfully",
                Data = departmentList.Select(d => new DepartmentGetAllDto
                {
                    DepartmentID = d.DepartmentID,
                    DepartmentName = d.DepartmentName,
                    Description = d.Description,
                    IsActive = d.IsActive,
                    UserID = d.UserID
                }).ToList()
            });
        }
        
        // GET: api/Department/1
        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var department = _context.Departments.Find(id);

            if (department == null)
            {
                return NotFound("Department not found");
            }

            return Ok(new ApiResponse<DepartmentGetByIdDto>
            {
                Success = true,
                Message = "Department Retrieved Successfully",
                Data = new DepartmentGetByIdDto
                {
                    DepartmentID = department.DepartmentID,
                    DepartmentName = department.DepartmentName,
                    Description = department.Description,
                    IsActive = department.IsActive,
                    UserID = department.UserID
                }
            });
        }

        // POST: api/Department
        [HttpPost]
        public IActionResult AddDepartment([FromBody] DepartmentCreateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Invalid JSON");
                }

                var department = new Department
                {
                    DepartmentName = dto.DepartmentName,
                    Description = dto.Description,
                    IsActive = dto.IsActive,
                    UserID = dto.UserID,
                    Created = DateTime.Now
                };

                _context.Departments.Add(department);
                _context.SaveChanges();

                return Ok(new ApiResponse<Department>
                {
                    Success = true,
                    Message = "Department added successfully.",
                    Data = department
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding department",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/Department/1
        [HttpPut("{id:int}")]
        public IActionResult UpdateDepartment(int id, [FromBody] DepartmentUpdateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Invalid JSON");
                }

                var existingDepartment = _context.Departments.Find(id);

                if (existingDepartment == null)
                {
                    return NotFound("Department not found.");
                }

                existingDepartment.DepartmentName = dto.DepartmentName;
                existingDepartment.Description = dto.Description;
                existingDepartment.IsActive = dto.IsActive;
                existingDepartment.UserID = dto.UserID;

                _context.SaveChanges();

                return Ok(new ApiResponse<Department>
                {
                    Success = true,
                    Message = "Department Updated Successfully",
                    Data = existingDepartment
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating department",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // DELETE: api/Department/1
        [HttpDelete("{id:int}")]
        public IActionResult DeleteDepartment(int id)
        {
            try { 
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var department = _context.Departments.Find(id);

            if (department == null)
            {
                return NotFound("Department not found.");
            }

            _context.Departments.Remove(department);
            _context.SaveChanges();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Department Deleted Successfully",
                    Data = department
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting student",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("dropdown")]
        public IActionResult GetDepartmentsDropdown()
        {
            var departments = _context.Departments
                .Where(d => d.IsActive)
                .Select(d => new { d.UserID, d.DepartmentName })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Departments retrieved successfully.",
                Data = departments
            });
        }

    }
}
