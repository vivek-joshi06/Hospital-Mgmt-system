using FluentValidation;
using HMS_Backend.DTOs;
using HMS_Backend.Models;

namespace Hospital_management_system.Validator
{
    public class DoctorValidators : AbstractValidator<DoctorCreateDto>
    {
        public DoctorValidators() 
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone is required.")
                .Matches(@"^\d{10}$").WithMessage("Phone must be a valid 10-digit number.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email must be a valid email address.");

            //RuleFor(x => x.DepartmentID)
            //.NotEmpty()
            //.When(x => x.);

        }
    }
}
