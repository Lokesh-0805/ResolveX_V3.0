// controllers/waterController.js
import WaterReport from "../models/WaterReport.js";

// Existing function
export const createWaterReport = async (req, res) => {
  try {
    const report = await WaterReport.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to create water report", error });
  }
};

// NEW: Notify authorities route
export const notifyAuthorities = async (req, res) => {
  try {
    const {
      testingLocation,
      waterSourceType,
      phLevel,
      tds,
      turbidity,
      conductivity,
      hardness,
      coliformPresence,
      status,
      recommendations,
    } = req.body;

    // Save the report
    const report = new WaterReport({
      testingLocation,
      waterSourceType,
      phLevel,
      tds,
      turbidity,
      conductivity,
      hardness,
      coliformPresence,
    });

    await report.save();

    // (Later you can integrate email/SMS notifications here)
    res.status(200).json({
      message:
        "Your report has been sent to the authorities and can be tracked.",
      reportId: report._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to send report to authorities", error });
  }
};
