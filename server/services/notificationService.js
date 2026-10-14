import Notification from "../models/Notification.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";
import Claim from "../models/Claim.js";
import User from "../models/User.js";

const getDateGroup = (date) => {
  const now = new Date();
  const target = new Date(date);

  const isSameDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  if (isSameDay) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    yesterday.getFullYear() === target.getFullYear() &&
    yesterday.getMonth() === target.getMonth() &&
    yesterday.getDate() === target.getDate();

  if (isYesterday) return "Yesterday";

  return "Earlier";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.max(0, Math.floor((now - target) / 1000));

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return formatDate(date);
};

export const ensureAdminNotifications = async (adminUserId) => {
  try {
    // 1. Lost items
    const lostItems = await LostItem.find().populate("userId", "name email");
    for (const item of lostItems) {
      const exists = await Notification.findOne({
        targetRole: "admin",
        lostItemId: item._id,
      });

      if (!exists) {
        const isPending = item.approvalStatus === "pending";
        const reporterName = item.userId?.name || "A user";
        await Notification.create({
          userId: adminUserId,
          targetRole: "admin",
          lostItemId: item._id,
          type: "report",
          category: "reports",
          title: isPending
            ? `New Lost Item Report: ${item.title}`
            : `Lost Item Report (${item.approvalStatus}): ${item.title}`,
          message: isPending
            ? `${reporterName} reported a lost item '${item.title}' (${item.category}) in ${item.district}. Review required.`
            : `Lost item report '${item.title}' (${item.category}) was ${item.approvalStatus}.`,
          isRead: !isPending,
          createdAt: item.createdAt || new Date(),
        });
      } else if (item.approvalStatus !== "pending" && exists.title && exists.title.startsWith("New Lost Item Report:")) {
        exists.title = `Lost Item Report (${item.approvalStatus}): ${item.title}`;
        exists.message = `Lost item report '${item.title}' (${item.category}) was ${item.approvalStatus}.`;
        exists.isRead = true;
        await exists.save();
      }
    }

    // 2. Found items
    const foundItems = await FoundItem.find().populate("userId", "name email");
    for (const item of foundItems) {
      const exists = await Notification.findOne({
        targetRole: "admin",
        foundItemId: item._id,
      });

      if (!exists) {
        const isPending = item.approvalStatus === "pending";
        const reporterName = item.userId?.name || "A user";
        await Notification.create({
          userId: adminUserId,
          targetRole: "admin",
          foundItemId: item._id,
          type: "found",
          category: "reports",
          title: isPending
            ? `New Found Item Report: ${item.title}`
            : `Found Item Report (${item.approvalStatus}): ${item.title}`,
          message: isPending
            ? `${reporterName} reported a found item '${item.title}' (${item.category}) in ${item.district}. Review required.`
            : `Found item report '${item.title}' (${item.category}) was ${item.approvalStatus}.`,
          isRead: !isPending,
          createdAt: item.createdAt || new Date(),
        });
      } else if (item.approvalStatus !== "pending" && exists.title && exists.title.startsWith("New Found Item Report:")) {
        exists.title = `Found Item Report (${item.approvalStatus}): ${item.title}`;
        exists.message = `Found item report '${item.title}' (${item.category}) was ${item.approvalStatus}.`;
        exists.isRead = true;
        await exists.save();
      }
    }

    // 3. Claims
    const claims = await Claim.find()
      .populate("claimantId", "name email")
      .populate("lostItemId", "title")
      .populate("foundItemId", "title");

    for (const claim of claims) {
      const exists = await Notification.findOne({
        targetRole: "admin",
        claimId: claim._id,
      });

      if (!exists) {
        const isPending = claim.status === "pending";
        const itemTitle =
          claim.lostItemId?.title || claim.foundItemId?.title || "an item";
        const claimantName = claim.claimantId?.name || "A user";

        await Notification.create({
          userId: adminUserId,
          targetRole: "admin",
          claimId: claim._id,
          lostItemId: claim.lostItemId?._id || claim.lostItemId,
          foundItemId: claim.foundItemId?._id || claim.foundItemId,
          type: "claim",
          category: "claims",
          title: `New Claim Submitted: ${itemTitle}`,
          message: `${claimantName} submitted a claim request. Status: ${claim.status}. Note: "${claim.message || 'Verification required'}".`,
          isRead: !isPending,
          createdAt: claim.createdAt || new Date(),
        });
      } else if (claim.status !== "pending" && !exists.isRead) {
        const claimantName = claim.claimantId?.name || "A user";
        exists.message = `${claimantName} submitted a claim request. Status: ${claim.status}. Note: "${claim.message || 'Verification required'}".`;
        exists.isRead = true;
        await exists.save();
      }
    }

    // 4. Users (Regular registered users)
    const users = await User.find({ role: "user" });
    for (const u of users) {
      const escapedEmail = (u.email || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const exists = await Notification.findOne({
        targetRole: "admin",
        category: "users",
        message: { $regex: escapedEmail },
      });

      if (!exists) {
        await Notification.create({
          userId: adminUserId,
          targetRole: "admin",
          type: "user",
          category: "users",
          title: `New User Registered: ${u.name || "User"}`,
          message: `${u.name || "User"} (${u.email}) joined FindIt Lanka${u.district ? ` from ${u.district}` : ""}.`,
          isRead: true,
          createdAt: u.createdAt || new Date(),
        });
      }
    }
  } catch (err) {
    console.error("Error in ensureAdminNotifications:", err);
  }
};

export const getUserNotifications = async (userId, role = "user", scope = "user") => {
  const isAdminScope = role === "admin" && (scope === "admin" || scope === "all");

  const query = isAdminScope
    ? { targetRole: "admin" }
    : { userId, targetRole: { $ne: "admin" } };

  const rawNotifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .populate("lostItemId", "title category district location lostDate description images status approvalStatus rejectionReason userId createdAt")
    .populate("foundItemId", "title category district location foundDate description images status approvalStatus rejectionReason userId createdAt")
    .populate({
      path: "claimId",
      select: "status createdAt claimantId message",
      populate: { path: "claimantId", select: "name email phoneNumber" },
    })
    .populate("userId", "name firstName lastName email role phoneNumber");

  return rawNotifications.map((doc) => {
    const n = doc.toObject();
    const createdAt = n.createdAt || new Date();

    let category = n.category || "reports";
    let tone = n.tone || "blue";
    let icon = n.icon || "search";
    let actionLabel = n.actionLabel || "View Details";

    if (n.type === "match") {
      category = "matches";
      tone = "blue";
      icon = "search";
      actionLabel = "View Item";
    } else if (n.type === "claim" || category === "claims") {
      category = "claims";
      tone = "green";
      icon = "shield";
      actionLabel = "View Claim";
    } else if (n.type === "approval" || n.type === "report" || category === "reports") {
      category = "reports";
      tone = "blue";
      icon = "report";
      actionLabel = "View Report";
    } else if (n.type === "rejection") {
      category = "reports";
      tone = "red";
      icon = "reject";
      actionLabel = "View Report";
    } else if (n.type === "found") {
      category = "reports";
      tone = "green";
      icon = "box";
      actionLabel = "View Report";
    } else if (n.type === "user" || category === "users") {
      category = "users";
      tone = "purple";
      icon = "users";
      actionLabel = "View User";
    } else if (n.type === "system" || category === "system") {
      category = "system";
      tone = "gray";
      icon = "message";
      actionLabel = "Open Chat";
    }

    // Build user-friendly details string
    let details = "";
    if (n.lostItemId?.title) {
      details = `Item: ${n.lostItemId.title} | ${n.lostItemId.category || "Lost"} | ${n.lostItemId.district || ""}`;
    } else if (n.foundItemId?.title) {
      details = `Item: ${n.foundItemId.title} | ${n.foundItemId.category || "Found"} | ${n.foundItemId.district || ""}`;
    } else if (n.claimId) {
      const claimStatus = n.claimId.status || "Pending";
      details = `Claim ID: ${String(n.claimId._id || n.claimId).slice(-6)} | Status: ${claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}`;
    } else if (category === "users") {
      details = "New User Registration | FindIt Lanka Account";
    } else if (n.userId?.email) {
      const uName = n.userId.name || [n.userId.firstName, n.userId.lastName].filter(Boolean).join(" ");
      details = `User: ${uName || n.userId.email}`;
    } else {
      details = "FindIt Lanka Activity";
    }

    return {
      ...n,
      id: n._id.toString(),
      _id: n._id.toString(),
      description: n.message || n.description,
      details,
      category,
      tone,
      icon,
      actionLabel,
      matchScore: n.matchScore || 0,
      group: getDateGroup(createdAt),
      section: getDateGroup(createdAt),
      sectionDate: formatDate(createdAt),
      date: formatDate(createdAt),
      time: formatTimeAgo(createdAt),
      rawTime: formatTime(createdAt),
      read: Boolean(n.isRead),
      isRead: Boolean(n.isRead),
    };
  });
};

export const markAsRead = async (notificationId, userId, role = "user") => {
  const query =
    role === "admin"
      ? { _id: notificationId }
      : { _id: notificationId, userId };

  const notification = await Notification.findOne(query);

  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

export const markAllAsRead = async (userId, role = "user", scope = "user") => {
  const query =
    role === "admin" && (scope === "admin" || scope === "all")
      ? { targetRole: "admin", isRead: false }
      : { userId, targetRole: { $ne: "admin" }, isRead: false };

  await Notification.updateMany(query, { isRead: true });
  return { success: true };
};

export const deleteNotification = async (notificationId, userId, role = "user") => {
  const query =
    role === "admin"
      ? { _id: notificationId }
      : { _id: notificationId, userId, targetRole: { $ne: "admin" } };

  const result = await Notification.deleteOne(query);
  if (result.deletedCount === 0) {
    throw new Error("Notification not found");
  }
  return { success: true };
};

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const createAutoMatchNotifications = async (lostItem, foundItem) => {
  const notifications = [];

  if (lostItem.userId) {
    notifications.push(
      Notification.create({
        userId: lostItem.userId,
        title: `Potential Match Found for '${lostItem.title}'!`,
        message: `A found item matching '${foundItem.title}' in ${foundItem.district || "your area"} was submitted. View item details to verify and claim.`,
        type: "match",
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
      })
    );
  }

  if (foundItem.userId) {
    notifications.push(
      Notification.create({
        userId: foundItem.userId,
        title: `Matching Lost Item Found for '${foundItem.title}'!`,
        message: `A user reported a lost item matching '${lostItem.title}' in ${foundItem.district || "your area"}. They may claim it soon.`,
        type: "match",
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
      })
    );
  }

  return await Promise.all(notifications);
};

export const deleteAllNotifications = async (userId, role = "user", scope = "user") => {
  const query =
    role === "admin" && (scope === "admin" || scope === "all")
      ? { targetRole: "admin" }
      : { userId, targetRole: { $ne: "admin" } };

  const result = await Notification.deleteMany(query);
  return { success: true, deletedCount: result.deletedCount };
};

export const sendAdminSystemMessage = async ({
  targetUserId,
  title = "Message from Admin",
  message,
  claimId,
  lostItemId,
  foundItemId,
}) => {
  return await createNotification({
    userId: targetUserId,
    title,
    message,
    type: "system",
    category: "system",
    tone: "gray",
    icon: "message",
    actionLabel: "Open Chat",
    claimId,
    lostItemId,
    foundItemId,
  });
};

export const notifyAdminNewReport = async (item, itemType = "lost") => {
  try {
    const isLost = itemType === "lost";
    await Notification.create({
      userId: item.userId,
      targetRole: "admin",
      lostItemId: isLost ? item._id : null,
      foundItemId: !isLost ? item._id : null,
      type: isLost ? "report" : "found",
      category: "reports",
      title: `New ${isLost ? "Lost" : "Found"} Item Report: ${item.title}`,
      message: `A new ${itemType} item report for '${item.title}' (${item.category}) in ${item.district} was submitted. Review required.`,
      isRead: false,
    });
  } catch (err) {
    console.error("Error creating admin report notification:", err);
  }
};

export const notifyAdminReportUpdate = async (item, itemType = "lost") => {
  try {
    if (!item) return;

    const isLost = itemType === "lost";
    const typeLabel = isLost ? "Lost" : "Found";
    const wasRejected = Boolean(item._wasRejected);

    const title = wasRejected
      ? `Resubmitted ${typeLabel} Item Report: ${item.title}`
      : `Updated ${typeLabel} Item Report: ${item.title}`;

    const message = wasRejected
      ? `User updated and resubmitted previously rejected ${itemType} report '${item.title}' (${item.category}) in ${item.district}. Review required.`
      : `User updated details for pending ${itemType} report '${item.title}' (${item.category}) in ${item.district}. Review required.`;

    // Try finding existing admin notification for this item
    const existing = await Notification.findOne({
      targetRole: "admin",
      ...(isLost ? { lostItemId: item._id } : { foundItemId: item._id }),
    });

    if (existing) {
      existing.title = title;
      existing.message = message;
      existing.isRead = false;
      existing.type = isLost ? "report" : "found";
      existing.category = "reports";
      existing.createdAt = new Date();
      await existing.save();
    } else {
      await Notification.create({
        userId: item.userId,
        targetRole: "admin",
        lostItemId: isLost ? item._id : null,
        foundItemId: !isLost ? item._id : null,
        type: isLost ? "report" : "found",
        category: "reports",
        title,
        message,
        isRead: false,
        createdAt: new Date(),
      });
    }
  } catch (err) {
    console.error("Error creating admin report update notification:", err);
  }
};

export const notifyAdminNewClaim = async (claim, itemTitle = "Item") => {
  try {
    await Notification.create({
      userId: claim.claimantId,
      targetRole: "admin",
      claimId: claim._id,
      lostItemId: claim.lostItemId,
      foundItemId: claim.foundItemId,
      type: "claim",
      category: "claims",
      title: `New Claim Submitted: ${itemTitle}`,
      message: `A new ownership claim/return request was submitted. Status: ${claim.status}.`,
      isRead: false,
    });
  } catch (err) {
    console.error("Error creating admin claim notification:", err);
  }
};

export const notifyAdminNewUser = async (user) => {
  try {
    await Notification.create({
      userId: user._id,
      targetRole: "admin",
      type: "user",
      category: "users",
      title: `New User Registered: ${user.name}`,
      message: `${user.name} (${user.email}) registered on FindIt Lanka from ${user.district}.`,
      isRead: false,
    });
  } catch (err) {
    console.error("Error creating admin user notification:", err);
  }
};
