using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.API.Data;
using Garage.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Garage.API.Data.DTO.BrandDTO;

namespace Garage.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly DataContext _context;
        public BrandController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<BrandDto>> Get()
        {
            var brands = _context.Brands
                   .Select(brand => new BrandDto
                   {
                       Id = brand.Id,
                       Name = brand.Name,
                   })
                   .ToList();

            return Ok(brands);
        }
    }
}