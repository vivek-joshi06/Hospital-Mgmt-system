using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{
    public class DepartmentCreateDto
    {
        [Required, MaxLength(100)]
        public string DepartmentName { get; set; } = string.Empty;

        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }

    public class DepartmentUpdateDto
    {
        [Required, MaxLength(100)]
        public string DepartmentName { get; set; } = string.Empty;

        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        [Required]
        public int UserID { get; set; }
    }

    public class DepartmentGetByIdDto
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int UserID { get; set; }
    }

    public class DepartmentGetAllDto
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
    }
}