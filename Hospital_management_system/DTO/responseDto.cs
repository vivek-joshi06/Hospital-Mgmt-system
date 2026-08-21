namespace HMS_Backend.DTOs
{
    public class ResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? Data { get; set; }

        public static ResponseDto SuccessResponse(string message, object? data = null)
        {
            return new ResponseDto { Success = true, Message = message, Data = data };
        }

        public static ResponseDto ErrorResponse(string message)
        {
            return new ResponseDto { Success = false, Message = message };
        }
    }
}
