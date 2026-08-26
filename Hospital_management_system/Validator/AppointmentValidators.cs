using FluentValidation;
using HMS_Backend.DTOs;

namespace Hospital_management_system.Validator
{
    public class AppointmentCreateValidator : AbstractValidator<AppointmentCreateDto>
    {
        public AppointmentCreateValidator()
        {
            RuleFor(x => x.DoctorID)
                .GreaterThan(0).WithMessage("DoctorID must be a valid positive number.");

            RuleFor(x => x.PatientID)
                .GreaterThan(0).WithMessage("PatientID must be a valid positive number.");

            RuleFor(x => x.AppointmentDate)
                .NotEmpty().WithMessage("Appointment date is required.");

            RuleFor(x => x.AppointmentStatus)
                .GreaterThan(0).WithMessage("Appointment status is required.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");

            RuleFor(x => x.TotalConsultedAmount)
                .GreaterThanOrEqualTo(0).WithMessage("Total consulted amount cannot be negative.")
                .When(x => x.TotalConsultedAmount.HasValue);
        }
    }

    public class AppointmentUpdateValidator : AbstractValidator<AppointmentUpdateDto>
    {
        public AppointmentUpdateValidator()
        {
            RuleFor(x => x.DoctorID)
                .GreaterThan(0).WithMessage("DoctorID must be a valid positive number.");

            RuleFor(x => x.PatientID)
                .GreaterThan(0).WithMessage("PatientID must be a valid positive number.");

            RuleFor(x => x.AppointmentDate)
                .NotEmpty().WithMessage("Appointment date is required.");

            RuleFor(x => x.AppointmentStatus)
                .GreaterThan(0).WithMessage("Appointment status is required.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");

            RuleFor(x => x.TotalConsultedAmount)
                .GreaterThanOrEqualTo(0).WithMessage("Total consulted amount cannot be negative.")
                .When(x => x.TotalConsultedAmount.HasValue);
        }
    }
}
