using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using HMS_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public UserController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            var userList = _context.Users.ToList();
            return Ok(new ApiResponse<IEnumerable<UserGetAllDto>>
            {
                Success = true,
                Message = "Users Retrieved Successfully",
                Data = userList.Select(u => new UserGetAllDto
                {
                    UserID = u.UserID,
                    UserName = u.UserName,
                    Email = u.Email,
                    MobileNo = u.MobileNo,
                    Role = u.Role,
                    IsActive = u.IsActive
                })
            });
        }

        // GET: api/User/1
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

            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User not found"
                });
            }

            return Ok(new ApiResponse<UserGetByIdDto>
            {
                Success = true,
                Message = "User Retrieved Successfully",
                Data = new UserGetByIdDto
                {
                    UserID = user.UserID,
                    UserName = user.UserName,
                    Email = user.Email,
                    MobileNo = user.MobileNo,
                    Role = user.Role,
                    IsActive = user.IsActive
                }
            });
        }

        // POST: api/User
        [HttpPost]
        public IActionResult AddUser([FromBody] UserCreateDto dto)
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

                var user = new User
                {
                    UserName = dto.UserName,
                    Password = dto.Password,
                    Email = dto.Email,
                    MobileNo = dto.MobileNo,
                    Role = dto.Role,
                    IsActive = dto.IsActive,
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(new ApiResponse<User>
                {
                    Success = true,
                    Message = "User added successfully.",
                    Data = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding user",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/User/1
        [HttpPut("{id:int}")]
        public IActionResult UpdateUser(int id, [FromBody] UserUpdateDto dto)
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

                var existingUser = _context.Users.Find(id);

                if (existingUser == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User not found."
                    });
                }

                existingUser.UserName = dto.UserName;
                existingUser.Password = string.IsNullOrEmpty(dto.Password) ? existingUser.Password : dto.Password;
                existingUser.Email = dto.Email;
                existingUser.MobileNo = dto.MobileNo;
                existingUser.IsActive = dto.IsActive;
                existingUser.Role = dto.Role;
                existingUser.Modified = DateTime.Now;

                _context.SaveChanges();

                return Ok(new ApiResponse<User>
                {
                    Success = true,
                    Message = "User Updated Successfully",
                    Data = existingUser
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating user",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // DELETE: api/User/1
        [HttpDelete("{id:int}")]
        public IActionResult DeleteUser(int id)
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

                var user = _context.Users.Find(id);

                if (user == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User not found."
                    });
                }

                _context.Users.Remove(user);
                _context.SaveChanges();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "User deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting user",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // POST: api/User/login
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid request body"
                    });
                }

                var user = _context.Users.FirstOrDefault(u =>
                    (u.UserName.ToLower() == dto.UserName.ToLower() || u.Email.ToLower() == dto.UserName.ToLower()) &&
                    u.Password == dto.Password &&
                    (string.IsNullOrEmpty(dto.Role) || u.Role.ToLower() == dto.Role.ToLower()));

                if (user == null)
                {
                    return Unauthorized(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid username, password, or role."
                    });
                }

                if (!user.IsActive)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Account is inactive."
                    });
                }

                var token = _tokenService.GenerateToken(user);

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Login successful.",
                    Data = new LoginResponseDto
                    {
                        Token = token,
                        UserID = user.UserID,
                        UserName = user.UserName,
                        Email = user.Email,
                        Role = user.Role
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred during login",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // POST: api/User/register
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid request body"
                    });
                }

                // Check if username or email already exists
                var duplicate = _context.Users.Any(u =>
                    u.UserName.ToLower() == dto.UserName.ToLower() ||
                    u.Email.ToLower() == dto.Email.ToLower());

                if (duplicate)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Username or Email already exists."
                    });
                }

                using var transaction = _context.Database.BeginTransaction();
                try
                {
                    var user = new User
                    {
                        UserName = dto.UserName,
                        Password = dto.Password,
                        Email = dto.Email,
                        MobileNo = dto.MobileNo,
                        IsActive = true,
                        Role = dto.Role,
                        Created = DateTime.Now,
                        Modified = DateTime.Now
                    };

                    _context.Users.Add(user);
                    _context.SaveChanges();

                    if (dto.Role == "Doctor")
                    {
                        var doctor = new Doctor
                        {
                            Name = dto.Name ?? $"Dr. {dto.UserName}",
                            Phone = dto.MobileNo,
                            Email = dto.Email,
                            Qualification = dto.Qualification ?? "MBBS",
                            Specialization = dto.Specialization ?? "General Physician",
                            IsActive = true,
                            Created = DateTime.Now,
                            Modified = DateTime.Now,
                            UserID = user.UserID
                        };
                        _context.Doctors.Add(doctor);
                        _context.SaveChanges();

                        if (dto.DepartmentID.HasValue)
                        {
                            var docDept = new DoctorDepartment
                            {
                                DoctorID = doctor.DoctorID,
                                DepartmentID = dto.DepartmentID.Value,
                                Created = DateTime.Now,
                                Modified = DateTime.Now,
                                UserID = 1
                            };
                            _context.DoctorDepartments.Add(docDept);
                        }
                    }
                    else if (dto.Role == "Patient")
                    {
                        var patient = new Patient
                        {
                            Name = dto.Name ?? dto.UserName,
                            DateOfBirth = dto.DateOfBirth ?? DateTime.Now.AddYears(-30),
                            Gender = dto.Gender ?? "Other",
                            Email = dto.Email,
                            Phone = dto.MobileNo,
                            Address = dto.Address ?? "N/A",
                            City = dto.City ?? "N/A",
                            State = "1",
                            IsActive = true,
                            Created = DateTime.Now,
                            Modified = DateTime.Now,
                            UserID = user.UserID
                        };
                        _context.Patients.Add(patient);
                    }

                    _context.SaveChanges();
                    transaction.Commit();

                    return Ok(new ApiResponse<User>
                    {
                        Success = true,
                        Message = "Registration successful.",
                        Data = user
                    });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new ApiResponse<object>
                    {
                        Success = false,
                        Message = $"Registration failed: {ex.Message}",
                        Errors = new List<string> { ex.Message }
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred during registration",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("dropdown")]
        public IActionResult GetUsersDropdown()
        {
            var users = _context.Users
                .Select(u => new { u.UserID, u.UserName })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Users retrieved successfully.",
                Data = users
            });
        }
    }
}
