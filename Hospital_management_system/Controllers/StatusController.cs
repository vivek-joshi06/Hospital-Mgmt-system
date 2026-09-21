using HMS_Backend.Common;
using HMS_Backend.Data;
using HMS_Backend.DTOs;
using HMS_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatusController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Status
        [HttpGet]
        public IActionResult Get()
        {
            var statusList = _context.Statuses.ToList();
            return Ok(new ApiResponse<IEnumerable<StatusGetAllDto>>
            {
                Success = true,
                Message = "Statuses Retrieved Successfully",
                Data = statusList.Select(s => new StatusGetAllDto
                {
                    StatusID = s.StatusID,
                    StatusName = s.StatusName,
                    StatusCssClass = s.StatusCssClass
                })
            });
        }

        // GET: api/Status/1
        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Invalid ID"
                });
            }

            var status = _context.Statuses.Find(id);

            if (status == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Status not found"
                });
            }

            return Ok(new ApiResponse<StatusGetByIdDto>
            {
                Success = true,
                Message = "Status Retrieved Successfully",
                Data = new StatusGetByIdDto
                {
                    StatusID = status.StatusID,
                    StatusName = status.StatusName,
                    StatusCssClass = status.StatusCssClass
                }
            });
        }

        // POST: api/Status
        [HttpPost]
        public IActionResult AddStatus([FromBody] StatusCreateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid JSON"
                    });
                }

                var status = new Status
                {
                    StatusName = dto.StatusName,
                    StatusCssClass = dto.StatusCssClass
                };

                _context.Statuses.Add(status);
                _context.SaveChanges();

                return Ok(new ApiResponse<Status>
                {
                    Success = true,
                    Message = "Status added successfully.",
                    Data = status
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding status",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // PUT: api/Status/1
        [HttpPut("{id:int}")]
        public IActionResult UpdateStatus(int id, [FromBody] StatusUpdateDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid JSON"
                    });
                }

                var existingStatus = _context.Statuses.Find(id);

                if (existingStatus == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Status not found."
                    });
                }

                existingStatus.StatusName = dto.StatusName;
                existingStatus.StatusCssClass = dto.StatusCssClass;

                _context.SaveChanges();

                return Ok(new ApiResponse<Status>
                {
                    Success = true,
                    Message = "Status Updated Successfully",
                    Data = existingStatus
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating status",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        // DELETE: api/Status/1
        [HttpDelete("{id:int}")]
        public IActionResult DeleteStatus(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid ID"
                    });
                }

                var status = _context.Statuses.Find(id);

                if (status == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Status not found."
                    });
                }

                _context.Statuses.Remove(status);
                _context.SaveChanges();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Status deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting status",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("dropdown")]
        public IActionResult GetStatusesDropdown()
        {
            var statuses = _context.Statuses
                .Select(s => new { s.StatusID, s.StatusName })
                .ToList();

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Success = true,
                Message = "Statuses retrieved successfully.",
                Data = statuses
            });
        }
    }
}
