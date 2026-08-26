using FluentValidation;
using HMS_Backend.DTOs;

namespace Hospital_management_system.Validator
{
    public class StatusCreateValidator : AbstractValidator<StatusCreateDto>
    {
        public StatusCreateValidator()
        {
            RuleFor(x => x.StatusName)
                .NotEmpty().WithMessage("Status name is required.")
                .MaximumLength(20).WithMessage("Status name must not exceed 20 characters.");

            RuleFor(x => x.StatusCssClass)
                .NotEmpty().WithMessage("Status CSS class is required.")
                .MaximumLength(50).WithMessage("Status CSS class must not exceed 50 characters.");
        }
    }

    public class StatusUpdateValidator : AbstractValidator<StatusUpdateDto>
    {
        public StatusUpdateValidator()
        {
            RuleFor(x => x.StatusName)
                .NotEmpty().WithMessage("Status name is required.")
                .MaximumLength(20).WithMessage("Status name must not exceed 20 characters.");

            RuleFor(x => x.StatusCssClass)
                .NotEmpty().WithMessage("Status CSS class is required.")
                .MaximumLength(50).WithMessage("Status CSS class must not exceed 50 characters.");
        }
    }
}
