using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{
    public class DoctorDepartmentGetByIdDto
    {
        public int DoctorDepartmentID { get; set; }
        public int DoctorID { get; set; }
        public int DepartmentID { get; set; }
        public int UserID { get; set; }
    }

    public class DoctorDepartmentGetAllDto
    {
        public int DoctorDepartmentID { get; set; }
        public int DoctorID { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
    } 
    
    public class DoctorDepartmentUpdateDto {
        [Required]
        public int DoctorID { get; set; }
        [Required]
        public int DepartmentID { get; set; }
        [Required]
        public int UserID { get; set; }
    } 
    
    public class DoctorDepartmentCreateDto
    {
        [Required]
        public int DoctorID { get; set; }

        [Required]
        public int DepartmentID { get; set; }

        [Required]
        public int UserID { get; set; }
    }
}
