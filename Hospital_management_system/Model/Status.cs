using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class Status
    {
        [Key]
        public int StatusID { get; set; }
        [Required,MaxLength(20)]
        public String StatusName { get; set; } = String.Empty;
        [Required,MaxLength(50)]
        public String StatusCssClass { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
