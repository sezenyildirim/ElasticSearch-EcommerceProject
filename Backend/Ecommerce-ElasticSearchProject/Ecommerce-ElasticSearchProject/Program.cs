using Ecommerce_ElasticSearchProject.Extensions;
using Ecommerce_ElasticSearchProject.Repositories;
using Ecommerce_ElasticSearchProject.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElastic(builder.Configuration);
builder.Services.AddScoped<ECommerceRepository>();
builder.Services.AddScoped<ECommerceService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend", policy =>
	{
		policy.WithOrigins("http://localhost:5173") // React adresi
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
