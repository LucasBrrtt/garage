using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.API.Data.Configuration;
using Garage.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Garage.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Brand> Brands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar a relação um-para-muitos
            modelBuilder.ApplyConfiguration(new CarConfiguration());
        }
    }
}