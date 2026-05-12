namespace EmotionalFeedbackTracker.Server.Models
{
    public class FaceDetectionResult
    {
        public BoundingBox BoundingBox { get; set; } = new();
        public List<FacialLandmark> Landmarks { get; set; } = new();
        public double Confidence { get; set; }
    }
}
