using EmotionalFeedbackTracker.Server.Models;

namespace EmotionalFeedbackTracker.Server.Services
{
    public interface IEmotionDetectionService
    {
        Task<EmotionData> DetectEmotionsAsync(byte[] imageData);
        Task<EngagementMetrics> CalculateEngagementAsync(byte[] imageData);
        Task<FaceDetectionResult> DetectFacialLandmarksAsync(byte[] imageData);
    }
}