import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";
import { createNotification } from "./notificationService.js";

const extractKeywords = (text) => {
  if (!text || typeof text !== "string") return [];
  const stopWords = new Set(["the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with", "my", "of", "is", "it", "was", "this", "that", "item", "lost", "found"]);
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
};

export const calculateMatchScore = (lostItem, foundItem) => {
  let score = 0;

  if (
    lostItem.category &&
    foundItem.category &&
    lostItem.category.toLowerCase() === foundItem.category.toLowerCase()
  ) {
    score += 30;
  }

  if (
    lostItem.district &&
    foundItem.district &&
    lostItem.district.toLowerCase() === foundItem.district.toLowerCase()
  ) {
    score += 20;
  }

  const lostLocKeywords = extractKeywords(lostItem.location);
  const foundLocKeywords = extractKeywords(foundItem.location);
  if (lostLocKeywords.length > 0 && foundLocKeywords.length > 0) {
    const locMatches = lostLocKeywords.filter((word) =>
      foundLocKeywords.includes(word)
    );
    if (locMatches.length > 0) {
      score += 15;
    }
  }

  const lostTextKeywords = [
    ...extractKeywords(lostItem.title),
    ...extractKeywords(lostItem.description),
  ];
  const foundTextKeywords = [
    ...extractKeywords(foundItem.title),
    ...extractKeywords(foundItem.description),
  ];

  if (lostTextKeywords.length > 0 && foundTextKeywords.length > 0) {
    const textMatches = lostTextKeywords.filter((word) =>
      foundTextKeywords.includes(word)
    );
    if (textMatches.length >= 2) {
      score += 20;
    } else if (textMatches.length === 1) {
      score += 10;
    }
  }

  const lostDate = lostItem.lostDate ? new Date(lostItem.lostDate) : new Date(lostItem.createdAt);
  const foundDate = foundItem.foundDate ? new Date(foundItem.foundDate) : new Date(foundItem.createdAt);
  
  const diffTime = Math.abs(foundDate - lostDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 3) {
    score += 15;
  } else if (diffDays <= 7) {
    score += 10;
  } else if (diffDays <= 14) {
    score += 5;
  }

  return Math.min(score, 100);
};

export const findAndTriggerMatchesForLostItem = async (lostItemArg) => {
  let lostItem = lostItemArg;
  if (!lostItem) return [];
  if (typeof lostItem === "string" || (typeof lostItem === "object" && !lostItem.category)) {
    lostItem = await LostItem.findById(lostItemArg);
  }
  if (!lostItem || lostItem.approvalStatus !== "approved") return [];

  const candidateFoundItems = await FoundItem.find({
    category: lostItem.category,
    district: lostItem.district,
    status: "found",
    approvalStatus: "approved",
  });

  const matches = [];

  for (const foundItem of candidateFoundItems) {
    if (
      lostItem.userId &&
      foundItem.userId &&
      lostItem.userId.toString() === foundItem.userId.toString()
    ) {
      continue;
    }

    const matchScore = calculateMatchScore(lostItem, foundItem);

    if (matchScore >= 50) {
      matches.push({ foundItem, matchScore });

      if (lostItem.userId) {
        await createNotification({
          userId: lostItem.userId,
          title: `Potential Match Found for '${lostItem.title}' (${matchScore}% Match)!`,
          message: `A found item matching '${foundItem.title}' (${matchScore}% match) in ${foundItem.district} was reported. Click view item to verify.`,
          type: "match",
          category: "matches",
          tone: "blue",
          icon: "search",
          actionLabel: "View Item",
          lostItemId: lostItem._id,
          foundItemId: foundItem._id,
          matchScore,
        });
      }

      if (foundItem.userId) {
        await createNotification({
          userId: foundItem.userId,
          title: `Matching Lost Item Found for '${foundItem.title}' (${matchScore}% Match)!`,
          message: `A user reported a lost item matching '${lostItem.title}' (${matchScore}% match) in ${foundItem.district}.`,
          type: "match",
          category: "matches",
          tone: "blue",
          icon: "search",
          actionLabel: "View Item",
          lostItemId: lostItem._id,
          foundItemId: foundItem._id,
          matchScore,
        });
      }
    }
  }

  return matches;
};

export const findAndTriggerMatchesForFoundItem = async (foundItemArg) => {
  let foundItem = foundItemArg;
  if (!foundItem) return [];
  if (typeof foundItem === "string" || (typeof foundItem === "object" && !foundItem.category)) {
    foundItem = await FoundItem.findById(foundItemArg);
  }
  if (!foundItem || foundItem.approvalStatus !== "approved") return [];

  const candidateLostItems = await LostItem.find({
    category: foundItem.category,
    district: foundItem.district,
    status: "lost",
    approvalStatus: "approved",
  });

  const matches = [];

  for (const lostItem of candidateLostItems) {
    if (
      lostItem.userId &&
      foundItem.userId &&
      lostItem.userId.toString() === foundItem.userId.toString()
    ) {
      continue;
    }

    const matchScore = calculateMatchScore(lostItem, foundItem);

    if (matchScore >= 50) {
      matches.push({ lostItem, matchScore });

      if (lostItem.userId) {
        await createNotification({
          userId: lostItem.userId,
          title: `Potential Match Found for '${lostItem.title}' (${matchScore}% Match)!`,
          message: `A found item matching '${foundItem.title}' (${matchScore}% match) in ${foundItem.district} was reported. Click view item to verify.`,
          type: "match",
          category: "matches",
          tone: "blue",
          icon: "search",
          actionLabel: "View Item",
          lostItemId: lostItem._id,
          foundItemId: foundItem._id,
          matchScore,
        });
      }

      if (foundItem.userId) {
        await createNotification({
          userId: foundItem.userId,
          title: `Matching Lost Item Found for '${foundItem.title}' (${matchScore}% Match)!`,
          message: `A user reported a lost item matching '${lostItem.title}' (${matchScore}% match) in ${foundItem.district}.`,
          type: "match",
          category: "matches",
          tone: "blue",
          icon: "search",
          actionLabel: "View Item",
          lostItemId: lostItem._id,
          foundItemId: foundItem._id,
          matchScore,
        });
      }
    }
  }

  return matches;
};
