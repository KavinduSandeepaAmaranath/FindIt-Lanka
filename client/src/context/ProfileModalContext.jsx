import { createContext, useContext, useState, useCallback } from "react";
import MyProfileModal from "../components/common/MyProfileModal";

const ProfileModalContext = createContext(null);

export function ProfileModalProvider({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);

  const openProfile = useCallback((userData = null) => {
    // If no user is passed, try getting user from localStorage or fallback
    let userToUse = userData;
    if (!userToUse) {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          userToUse = JSON.parse(stored);
        }
      } catch (err) {
        console.error("Error reading stored user:", err);
      }
    }
    setProfileUser(userToUse);
    setIsProfileOpen(true);
  }, []);

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  return (
    <ProfileModalContext.Provider
      value={{
        isProfileOpen,
        profileUser,
        openProfile,
        closeProfile,
      }}
    >
      {children}
      <MyProfileModal
        isOpen={isProfileOpen}
        onClose={closeProfile}
        user={profileUser}
      />
    </ProfileModalContext.Provider>
  );
}

export function useProfileModal() {
  const context = useContext(ProfileModalContext);
  if (!context) {
    throw new Error(
      "useProfileModal must be used within a ProfileModalProvider"
    );
  }
  return context;
}

export default ProfileModalContext;
