using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{
    public class DoctorGetByIdDto
    {
        public int DoctorID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Qualification { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int UserID { get; set; }
    }

    public class DoctorGetAllDto
    {
        public int DoctorID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Qualification { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
    }
    public class DoctorCreateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Qualification { get; set; } = string.Empty;

        [Required]
        public string Specialization { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }

    public class DoctorUpdateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Qualification { get; set; } = string.Empty;

        [Required]
        public string Specialization { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }
}
