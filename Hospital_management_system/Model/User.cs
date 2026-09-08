using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HMS_Backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int UserTypeID { get; set; }
        public UserType UserType { get; set; }
    }
    public class UserType
    {
        public int UserTypeID { get; set; }
        public string UserTypeName { get; set; }
    }
}