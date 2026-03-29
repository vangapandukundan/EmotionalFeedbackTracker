using Microsoft.AspNetCore.Mvc;
using EmotionalFeedbackTracker.Server.Models;
using EmotionalFeedbackTracker.Server.Services;

namespace EmotionalFeedbackTracker.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmotionController : ControllerBase
    {
        private readonly IEmotionDetectionService _emotionService;
        private readonly ILogger<EmotionController> _logger;

        public EmotionController(
            IEmotionDetectionService emotionService,
            ILogger<EmotionController> logger)
        {
            _emotionService = emotionService;
            _logger = logger;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> AnalyzeFrame([FromBody] FrameData frameData)
        {
            try
            {
                var startTime = DateTime.UtcNow;

                // Convert base64 to byte array
                var imageData = Convert.FromBase64String(frameData.ImageBase64);

                // Perform detection
                var emotions = await _emotionService.DetectEmotionsAsync(imageData);
                var engagement = await _emotionService.CalculateEngagementAsync(imageData);
                var landmarks = await _emotionService.DetectFacialLandmarksAsync(imageData);

                var processingTime = (DateTime.UtcNow - startTime).TotalMilliseconds;

                var result = new AnalysisResult
                {
                    Emotions = emotions,
                    Engagement = engagement,
                    Landmarks = landmarks,
                    ProcessingTimeMs = processingTime
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing frame");
                return StatusCode(500, "Error processing frame");
            }
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }
    }

    public class FrameData
    {
        public string ImageBase64 { get; set; } = string.Empty;
    }

    public class AnalysisResult
    {
        public EmotionData Emotions { get; set; } = new();
        public EngagementMetrics Engagement { get; set; } = new();
        public FaceDetectionResult Landmarks { get; set; } = new();
        public double ProcessingTimeMs { get; set; }
    }
}