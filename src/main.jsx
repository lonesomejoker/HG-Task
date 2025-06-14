import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app/Store.jsx";
import { ClientProvider } from "./context/ClientContext.jsx";
import MainRouter from "./router/MainRouter.jsx";
import '@ant-design/v5-patch-for-react-19';

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ClientProvider>
          <MainRouter/>
        </ClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
