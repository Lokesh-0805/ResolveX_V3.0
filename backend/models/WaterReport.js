import mongoose from "mongoose";

const waterReportSchema = new mongoose.Schema({
  testingLocation: { type: String, required: true },
  waterSourceType: { type: String, required: true },
  phLevel: Number,
  tds: Number,
  turbidity: Number,
  conductivity: Number,
  hardness: Number,
  coliformPresence: String,
  createdAt: { type: Date, default: Date.now },
});

const WaterReport = mongoose.model("WaterReport", waterReportSchema);
export default WaterReport;
