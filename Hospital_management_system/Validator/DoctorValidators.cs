using FluentValidation;
using HMS_Backend.DTOs;

namespace Hospital_management_system.Validator
{
    public class DoctorValidators : AbstractValidator<DoctorCreateDto>
    {
        public DoctorValidators() 
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone is required.")
                .Matches(@"^\d{10}$").WithMessage("Phone must be a valid 10-digit number.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email must be a valid email address.");

            RuleFor(x => x.Qualification)
                .NotEmpty().WithMessage("Qualification is required.");

            RuleFor(x => x.Specialization)
                .NotEmpty().WithMessage("Specialization is required.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");
        }
    }

    public class DoctorUpdateValidator : AbstractValidator<DoctorUpdateDto>
    {
        public DoctorUpdateValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone is required.")
                .Matches(@"^\d{10}$").WithMessage("Phone must be a valid 10-digit number.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email must be a valid email address.");

            RuleFor(x => x.Qualification)
                .NotEmpty().WithMessage("Qualification is required.");

            RuleFor(x => x.Specialization)
                .NotEmpty().WithMessage("Specialization is required.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");
        }
    }
}
