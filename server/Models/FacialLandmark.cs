namespace EmotionalFeedbackTracker.Server.Models
{
    public class FacialLandmark
    {
        public float X { get; set; }
        public float Y { get; set; }
        public string Type { get; set; } = string.Empty;
    }
}