using System.ComponentModel.DataAnnotations;

namespace HMS_Backend.DTOs
{

    public class StatusGetByIdDto
    {
        public int StatusID { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public string StatusCssClass { get; set; } = string.Empty;
    }

    public class StatusGetAllDto
    {
        public int StatusID { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public string StatusCssClass { get; set; } = string.Empty;
    }

    public class StatusCreateDto
    {
        [Required, MaxLength(20)]
        public string StatusName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string StatusCssClass { get; set; } = string.Empty;
    }

    public class StatusUpdateDto
    {
        [Required, MaxLength(20)]
        public string StatusName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string StatusCssClass { get; set; } = string.Empty;
    }
}
