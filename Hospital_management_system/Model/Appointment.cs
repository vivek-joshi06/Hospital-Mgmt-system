using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentID { get; set; }

        [Required]
        public int DoctorID { get; set; }

        [Required]
        public int PatientID { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public int AppointmentStatus { get; set; }

        [Required]
        public String Description { get; set; } = string.Empty;

        [Required]
        public String SpecialRemarks { get; set; } = string.Empty;

        [Required]
        public DateTime Created { get; set; } = DateTime.Now;

        [Required]
        public DateTime Modified { get; set; } = DateTime.Now;

        [Required]
        public int UserID { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalConsultedAmount { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(UserID))]
        public User? User { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(DoctorID))]
        public Doctor? Doctor { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(PatientID))]
        public Patient? Patient { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(AppointmentStatus))]
        public Status? Status { get; set; }
    }
}
