using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class DoctorDepartment
    {
        [Key]
        public int DoctorDepartmentId { get; set; }

        [Required]
        public int DoctorID{ get; set; }
        [Required]
        public int DepartmentID {  get; set; }
        [Required]
        public DateTime Created { get; set; } = DateTime.Now;

        [Required]
        public DateTime Modified { get; set; }= DateTime.Now;
        [Required]
        public int UserID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(DoctorID))]
        public Doctor? Doctor { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(DepartmentID))]
        public Department? Department { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(UserID))]
        public User? User { get; set; }
    }
}
