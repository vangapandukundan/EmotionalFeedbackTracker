# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /build

# Copy project file
COPY EmotionalFeedbackTracker.Server.csproj .

# Restore dependencies
RUN dotnet restore EmotionalFeedbackTracker.Server.csproj

# Copy source code
COPY . .

# Build and publish
RUN dotnet publish -c Release -o /app --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published application
COPY --from=builder /app .

# Set port
EXPOSE 8080

# Environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application
ENTRYPOINT ["dotnet", "EmotionalFeedbackTracker.Server.dll"]
