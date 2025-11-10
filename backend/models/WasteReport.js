import mongoose from "mongoose";

const wasteReportSchema = new mongoose.Schema({
  mediaUrls: [String], // images or video URLs
  wasteType: { type: String, default: "Auto-detected" },
  location: String,
  landmark: String,
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const WasteReport = mongoose.model("WasteReport", wasteReportSchema);
export default WasteReport;
