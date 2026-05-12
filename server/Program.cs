using EmotionalFeedbackTracker.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register custom services
builder.Services.AddSingleton<IEmotionDetectionService, EmotionDetectionService>();

// Add CORS - Allow requests from frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            if (app.Environment.IsDevelopment())
            {
                // Development: Allow localhost
                policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
            else
            {
                // Production: Allow any origin (secure this later with your Vercel URL)
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();