using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorID { get; set; }
        [Required]
        public String Name { get; set; } = string.Empty;
        [Required]
        public String Phone { get; set; } = string.Empty;
        [Required]
        public String Email { get; set; } = string.Empty;
        [Required]
        public String Qualification { get; set; } = string.Empty;
        [Required]
        public String Specialization { get; set; } = string.Empty;
        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        public DateTime Created { get; set; }=DateTime.Now;
        [Required]
        public DateTime Modified { get; set; }= DateTime.Now;
        [Required]
        public int UserID { get; set; }
        [JsonIgnore]
        public ICollection<Appointment>? Appointments { get; set; }
        [JsonIgnore]
        public ICollection<DoctorDepartment>? DoctorDepartments { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(UserID))]
        public User? User { get; set; }
    }
}
