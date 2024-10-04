import { AppRouter } from "./router";
import "./assets/global.css";
import { AuthProvider } from "./context/auth";
import { InstitutionProvider } from "./context/institutionContext"
import { ChatContextProvider } from "./context/ChatContext";


export const App = () => {
  return (
    <AuthProvider>
      <InstitutionProvider>
        <ChatContextProvider>
          <AppRouter />
          </ChatContextProvider>

          </InstitutionProvider>

        </AuthProvider>

        )
}
