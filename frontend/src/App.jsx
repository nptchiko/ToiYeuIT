import { AuthProvider } from "./hooks/auth-provider";
import { ToastProvider } from "./hooks/toast-provider";
import RoutersConfig from "./router/routes";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <RoutersConfig />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
