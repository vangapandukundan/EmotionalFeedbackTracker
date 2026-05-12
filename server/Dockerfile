# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY ["EmotionalFeedbackTracker.Server.csproj", "./"]

# Restore packages
RUN dotnet restore "EmotionalFeedbackTracker.Server.csproj"

# Copy all files
COPY . .

# Build and publish
RUN dotnet publish "EmotionalFeedbackTracker.Server.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published files
COPY --from=build /app/publish .

# Expose port
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the app
ENTRYPOINT ["dotnet", "EmotionalFeedbackTracker.Server.dll"]
