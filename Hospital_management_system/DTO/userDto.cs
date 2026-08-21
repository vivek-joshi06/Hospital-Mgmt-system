using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{
    // For POST api/User
    public class UserCreateDto
    {
        [Required]
        [StringLength(50)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }

    // For PUT api/User/{id}
    public class UserUpdateDto
    {
        [Required]
        [StringLength(50)]
        public string UserName { get; set; } = string.Empty;

        // Optional on update: only send this when the caller actually wants
        // to change the password. Requiring it on every edit forces the
        // client to resend/re-validate a password for unrelated changes
        // (e.g. toggling IsActive).
        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }

    // For POST api/User/login
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;
    }

    // For POST api/User/register
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        // Optional profile fields
        public string? Name { get; set; }
        public string? Qualification { get; set; }
        public string? Specialization { get; set; }
        public int? DepartmentID { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
    }

    public class UserGetAllDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    public class UserGetByIdDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

}