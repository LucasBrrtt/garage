using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Garage.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Garage.API.Data.Configuration
{
    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.HasOne(p => p.Brand)
                .WithMany(p => p.Cars)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}