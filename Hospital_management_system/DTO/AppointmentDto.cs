using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{

    public class AppointmentGetByIdDto
    {
        public int AppointmentID { get; set; }
        public int DoctorID { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public int PatientID { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }
        public int AppointmentStatus { get; set; }
        public string Description { get; set; } = string.Empty;
        public string SpecialRemarks { get; set; } = string.Empty;
        public int UserID { get; set; }
        public decimal? TotalConsultedAmount { get; set; }
    }

    public class AppointmentGetAllDto
    {
        public int AppointmentID { get; set; }
        public int DoctorID { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public int PatientID { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }
        public int AppointmentStatus { get; set; }
        public string Description { get; set; } = string.Empty;
        public string SpecialRemarks { get; set; } = string.Empty;
        public int UserID { get; set; }
        public decimal? TotalConsultedAmount { get; set; }
    
    
        
    }

    public class AppointmentCreateDto
    {
        [Required]
        public int DoctorID { get; set; }

        [Required]
        public int PatientID { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public int AppointmentStatus { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string SpecialRemarks { get; set; } = string.Empty;

        [Required]
        public int UserID { get; set; }

        public decimal? TotalConsultedAmount { get; set; }
    }

    public class AppointmentUpdateDto
    {
        [Required]
        public int DoctorID { get; set; }

        [Required]
        public int PatientID { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public int AppointmentStatus { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string SpecialRemarks { get; set; } = string.Empty;

        [Required]
        public int UserID { get; set; }

        public decimal? TotalConsultedAmount { get; set; }
    }
}
