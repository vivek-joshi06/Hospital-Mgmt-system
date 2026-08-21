using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public String UserName { get; set; } = String.Empty;
        [Required]
        public String Password { get; set; } = String.Empty;
        [Required]
        public String Email { get; set; } = String.Empty;
        [Required]
        public String MobileNo { get; set; } = String.Empty;
        [Required]
        public Boolean IsActive {  get; set; }
        [Required] 
        public DateTime Created { get; set; }= DateTime.Now;
        [Required]
        public String Role {  get; set; }=String.Empty;
        [Required]
        public DateTime Modified { get; set; }=DateTime.Now;
        [JsonIgnore]
        public Doctor? Doctor { get; set; }
        [JsonIgnore]
        public Patient? Patient { get; set; }
        [JsonIgnore]
        public ICollection<Department>? Departments { get; set; }
        [JsonIgnore]
        public ICollection<DoctorDepartment>? DoctorDepartments { get; set; }
        [JsonIgnore]
        public ICollection<Appointment>? Appointments { get; set; }
    }
}