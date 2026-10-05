import api from "../utils/api.js";

export const createClaim = async (claimData) => {
  const response = await api.post("/claims/create", claimData);
  return response.data;
};

export const getMyClaims = async () => {
  const response = await api.get("/claims/my");
  return response.data;
};

export const getMyReturns = async () => {
  const response = await api.get("/claims/returns");
  return response.data;
};

export const approveClaim = async (claimId, reviewNote = "Approved") => {
  const response = await api.patch(`/claims/${claimId}/approve`, { reviewNote });
  return response.data;
};

export const rejectClaim = async (claimId, reviewNote = "Rejected") => {
  const response = await api.patch(`/claims/${claimId}/reject`, { reviewNote });
  return response.data;
};
