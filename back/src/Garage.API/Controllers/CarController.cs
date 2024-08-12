using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Garage.API.Data;
using Garage.API.Models;
using Microsoft.EntityFrameworkCore;
using static Garage.API.Data.DTO.CarDTO;
using static Garage.API.Data.DTO.BrandDTO;

namespace Garage.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly DataContext _context;
        public CarController(DataContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // public ActionResult<IEnumerable<CarDto>> Get()
        // {
        //     var cars = _context.Cars
        //                        .Include(car => car.Brand)
        //                        .Select(car => new CarDto
        //                        {
        //                            Id = car.Id,
        //                            Name = car.Name,
        //                            Color = car.Color,
        //                            Plate = car.Plate,
        //                            Year = car.Year,
        //                            Brand = new BrandDto
        //                            {
        //                                Id = car.Brand.Id,
        //                                Name = car.Brand.Name
        //                            }
        //                        })
        //                        .ToList();

        //     return Ok(cars);
        // }

        [HttpGet]
        public ActionResult<IEnumerable<CarDto>> Get(string carName = null, string brandId = null, string color = null, string plate = null, string year = null) 
        {
            var query = _context.Cars
                                 .Include(car => car.Brand)
                                 .AsQueryable();

            if (!string.IsNullOrEmpty(carName))
            {
                var carNameLower = carName.ToLower();
                query = query.Where(car => car.Name.ToLower().Contains(carNameLower));
            }

            if (!string.IsNullOrEmpty(brandId))
            {
                query = query.Where(car => car.Brand.Id.ToString() == brandId);
            }

            if (!string.IsNullOrEmpty(color))
            {
                var colorLower = color.ToLower();
                query = query.Where(car => car.Color.ToLower().Contains(colorLower));
            }

            if (!string.IsNullOrEmpty(plate))
            {
                var plateLower = plate.ToLower();
                query = query.Where(car => car.Plate.ToLower().Contains(plateLower));
            }

            if (!string.IsNullOrEmpty(year))
            {
                var yearLower = year.ToLower();
                query = query.Where(car => car.Year.ToString().ToLower().Contains(yearLower));
            }

            var cars = query.Select(car => new CarDto
            {
                Id = car.Id,
                Name = car.Name,
                Color = car.Color,
                Plate = car.Plate,
                Year = car.Year,
                Brand = new BrandDto
                {
                    Id = car.Brand.Id,
                    Name = car.Brand.Name
                }
            }).ToList();

            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarById(int id)
        {
            var car = await _context.Cars
               .Include(c => c.Brand)
               .SingleOrDefaultAsync(c => c.Id == id);

            if (car == null)
            {
                return NotFound();
            }

            var carDto = new CarDto
            {
                Id = car.Id,
                Name = car.Name,
                Color = car.Color,
                Plate = car.Plate,
                Year = car.Year,
                Brand = new BrandDto
                {
                    Id = car.Brand.Id,
                    Name = car.Brand.Name
                }
            };

            return Ok(carDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CarCreateDto carCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var brand = await _context.Brands.FindAsync(carCreateDto.BrandId);
            if (brand == null)
            {
                return NotFound("Brand not found.");
            }

            var car = new Car
            {
                Name = carCreateDto.Name,
                Color = carCreateDto.Color,
                Plate = carCreateDto.Plate,
                Year = carCreateDto.Year,
                BrandId = carCreateDto.BrandId
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return StatusCode(201, new { Message = "Car created successfully.", CarId = car.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CarUpdateDto carUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound("Car not found.");
            }

            car.Id = id;
            car.Name = carUpdateDto.Name;
            car.Color = carUpdateDto.Color;
            car.Plate = carUpdateDto.Plate;
            car.Year = carUpdateDto.Year;
            car.BrandId = carUpdateDto.BrandId;

            _context.Cars.Update(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound("Car not found.");
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}