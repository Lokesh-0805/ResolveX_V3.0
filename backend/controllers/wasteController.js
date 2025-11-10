import WasteReport from "../models/WasteReport.js";

export const createWasteReport = async (req, res) => {
  try {
    const { wasteType, location, landmark, details } = req.body;
    const mediaUrls = req.files ? req.files.map(f => f.path) : [];

    const newReport = await WasteReport.create({
      mediaUrls,
      wasteType,
      location,
      landmark,
      details,
    });

    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
