import AppRoutes from "./routes/AppRoutes";
import { NotificationProvider } from "./context/NotificationContext";
import { ProfileModalProvider } from "./context/ProfileModalContext";

function App() {
  return (
    <NotificationProvider>
      <ProfileModalProvider>
        <AppRoutes />
      </ProfileModalProvider>
    </NotificationProvider>
  );
}

export default App;
