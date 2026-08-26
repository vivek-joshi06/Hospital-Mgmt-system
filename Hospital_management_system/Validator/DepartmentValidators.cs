using FluentValidation;
using HMS_Backend.DTOs;

namespace Hospital_management_system.Validator
{
    public class DepartmentCreateValidator : AbstractValidator<DepartmentCreateDto>
    {
        public DepartmentCreateValidator()
        {
            RuleFor(x => x.DepartmentName)
                .NotEmpty().WithMessage("Department name is required.")
                .MaximumLength(100).WithMessage("Department name must not exceed 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description must not exceed 250 characters.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");
        }
    }

    public class DepartmentUpdateValidator : AbstractValidator<DepartmentUpdateDto>
    {
        public DepartmentUpdateValidator()
        {
            RuleFor(x => x.DepartmentName)
                .NotEmpty().WithMessage("Department name is required.")
                .MaximumLength(100).WithMessage("Department name must not exceed 100 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(250).WithMessage("Description must not exceed 250 characters.");

            RuleFor(x => x.UserID)
                .GreaterThan(0).WithMessage("UserID must be a valid positive number.");
        }
    }
}
