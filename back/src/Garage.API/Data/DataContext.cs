using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Garage.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Car> Cars { get; set; }
    }
}