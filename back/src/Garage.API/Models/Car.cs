using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garage.API.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Plate { get; set; }
        public int Year { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}