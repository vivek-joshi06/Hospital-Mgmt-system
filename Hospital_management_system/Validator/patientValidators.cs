using FluentValidation;
using HMS_Backend.DTOs;

namespace Hospital_management_system.Validator
{
    public class patientValidators : AbstractValidator<PatientCreateDto>
    {
        public patientValidators()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.").Length(2, 100);

            RuleFor(x => x.DateOfBirth).NotEmpty().WithMessage("Date of Birth is required.");

            RuleFor(x => x.Gender).NotEmpty().WithMessage("Gender is required.");
        }
    }
}