using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class Patient
    {
        [Key]
        public int PatientID { get; set; }

        [Required,MaxLength(100)]
        public String Name { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public String Gender { get; set; } = string.Empty;

        [Required]
        public String Email { get; set; } = string.Empty;

        [Required]
        public String Phone { get; set; } = string.Empty;

        [Required]
        public String Address { get; set; } = string.Empty;

        [Required]
        public String City { get; set; } = string.Empty;

        [Required]
        public String State { get; set; } = string.Empty;

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTime Created { get; set; } = DateTime.Now;

        [Required]
        public DateTime Modified { get; set; } = DateTime.Now;

        [Required]
        public int UserID { get; set; }
        [JsonIgnore]
        public ICollection<Appointment>? Appointments { get; set; }
        
        [ForeignKey(nameof(UserID)),JsonIgnore]
        public User? User { get; set; }
    }
}
