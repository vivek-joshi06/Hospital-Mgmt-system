using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string MobileNo { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime Modified { get; set; } = DateTime.Now;

        [JsonIgnore]
        public Doctor? Doctor { get; set; }

        [JsonIgnore]
        public Patient? Patient { get; set; }

        [JsonIgnore]
        public ICollection<Appointment>? Appointments { get; set; }
    }
}