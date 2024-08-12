using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Garage.API.Models
{
    public class Brand
    {
        public int Id { get; set; } // Chave primária
        public string Name { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}