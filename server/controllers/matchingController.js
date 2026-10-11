import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";
import { calculateMatchScore } from "../services/matchingService.js";

export const getMatchesForLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    const lostItem = await LostItem.findById(id);

    if (!lostItem) {
      return res.status(404).json({ success: false, message: "Lost item not found" });
    }

    const candidateFoundItems = await FoundItem.find({
      status: "found",
      approvalStatus: "approved",
    });

    const matches = candidateFoundItems
      .map((foundItem) => {
        const matchScore = calculateMatchScore(lostItem, foundItem);
        return {
          foundItem,
          matchScore,
        };
      })
      .filter((m) => m.matchScore >= 40)
      .sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMatchesForFoundItem = async (req, res) => {
  try {
    const { id } = req.params;
    const foundItem = await FoundItem.findById(id);

    if (!foundItem) {
      return res.status(404).json({ success: false, message: "Found item not found" });
    }

    const candidateLostItems = await LostItem.find({
      status: "lost",
      approvalStatus: "approved",
    });

    const matches = candidateLostItems
      .map((lostItem) => {
        const matchScore = calculateMatchScore(lostItem, foundItem);
        return {
          lostItem,
          matchScore,
        };
      })
      .filter((m) => m.matchScore >= 40)
      .sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
