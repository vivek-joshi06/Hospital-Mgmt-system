using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{

    public class PatientGetByIdDto
    {
        public int PatientID { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class PatientGetAllDto
    {
        public int PatientID { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public int PatientCount { get; set; }
    }

    public class PatientCreateDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }

    public class PatientUpdateDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }
}
