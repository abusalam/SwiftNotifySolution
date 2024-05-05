using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace MessagingAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors]
public class IsLoggedInController : ControllerBase
{
    [HttpGet(Name = "IsLoggedIn")]
    public bool Get()
    {
        return true; //User.Identity.IsAuthenticated?;
    }
}

