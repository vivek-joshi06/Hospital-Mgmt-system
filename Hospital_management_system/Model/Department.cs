using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class Department
    {
        [Key]
        public int DepartmentID { get; set; }
        [Required,MaxLength(100)]
        public String DepartmentName { get; set; } = string.Empty;
        [MaxLength(250)]
        public String Description { get; set; } = string.Empty;
        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        public DateTime Created {  get; set; }= DateTime.Now;
        [Required]
        public int UserID { get; set; }
        [JsonIgnore]
        public ICollection<DoctorDepartment>? DoctorDepartments { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(UserID))]
        public User? User { get; set; }
    }
}
