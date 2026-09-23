using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{
    public class UserGetAllDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class UserGetByIdDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class UserCreateDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    public class UserUpdateDto
    {
        public string UserName { get; set; } = string.Empty;
        public string? Password { get; set; }
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class LoginDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class UserLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        // Doctor specific properties
        public string? Name { get; set; }
        public string? Qualification { get; set; }
        public string? Specialization { get; set; }
        public int? DepartmentID { get; set; }

        // Patient specific properties
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
    }

    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}