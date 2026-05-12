namespace EmotionalFeedbackTracker.Server.Models
{
    public class EngagementMetrics
    {
        public double EyeContact { get; set; }
        public double Attention { get; set; }
        public double Confidence { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}