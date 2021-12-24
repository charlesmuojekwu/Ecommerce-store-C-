using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("bugs/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)] // to prevent swagger showing controller in documentation
    public class BugsController : BaseApiController
    {
        public IActionResult Bug(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}