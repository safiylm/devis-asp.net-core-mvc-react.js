using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using devis_asp.net_core_mvc_react.js.Models;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DevisContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevisContext") ?? throw new InvalidOperationException("Connection string 'DevisContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    Initdb.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
