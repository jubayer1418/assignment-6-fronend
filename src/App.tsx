import { Navigate } from "react-router-dom";
import MainLayout from "./componenets/layout/MainLayout";
import { selectCurrentToken } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";

function App() {
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <MainLayout />;
}

export default App;
