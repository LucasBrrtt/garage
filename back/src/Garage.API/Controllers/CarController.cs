using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Garage.API.Data;
using Garage.API.Models;

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

        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return _context.Cars;
        }

        [HttpGet("{id}")]
        public Car Get(int id)
        {
            return _context.Cars.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IEnumerable<Car> Post(Car car)
        {
            _context.Cars.Add(car);

            if (_context.SaveChanges() > 0)
            {
                return _context.Cars;
            }
            else
            {
                throw new Exception("nao deu");
            }

        }

        [HttpPut("{id}")]
        public Car Put(int id, Car car)
        {
            if (car.Id != id) throw new Exception("Carro Errado");

            _context.Update(car);
            if (_context.SaveChanges() > 0)
                return _context.Cars.FirstOrDefault(x => x.Id == id);
            else
                return new Car();
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var car = _context.Cars.FirstOrDefault(x => x.Id == id);

            if (car == null)
                throw new Exception("nao existe");

            _context.Remove(car);

            return _context.SaveChanges() > 0;
        }
    }
}