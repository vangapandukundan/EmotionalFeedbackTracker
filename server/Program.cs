using EmotionalFeedbackTracker.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register custom services
builder.Services.AddSingleton<IEmotionDetectionService, EmotionDetectionService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            if (app.Environment.IsDevelopment())
            {
                policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
            else
            {
                // Allow from Vercel (update this with your actual Vercel URL)
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
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();