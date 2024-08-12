using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Garage.API.Data.DTO.BrandDTO;

namespace Garage.API.Data.DTO
{
    public class CarDTO
    {
        public class CarDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Color { get; set; }
            public string Plate { get; set; }
            public int Year { get; set; }
            public BrandDto Brand { get; set; }
        }


        public class CarCreateDto
        {
            public string Name { get; set; }
            public string Color { get; set; }
            public string Plate { get; set; }
            public int Year { get; set; }
            public int BrandId { get; set; }
        }

        public class CarUpdateDto
        {
            public string Name { get; set; }
            public string Color { get; set; }
            public string Plate { get; set; }
            public int Year { get; set; }
            public int BrandId { get; set; }
        }
    }
}