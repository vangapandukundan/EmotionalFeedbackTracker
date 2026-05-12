namespace EmotionalFeedbackTracker.Server.Models
{
    public class EmotionData
    {
        public double Happy { get; set; }
        public double Sad { get; set; }
        public double Surprised { get; set; }
        public double Angry { get; set; }
        public double Neutral { get; set; }
        public string DominantEmotion { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}