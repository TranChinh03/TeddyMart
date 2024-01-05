import RootRoutes from "./routes/route/RootRoutes";
import { store, persistor } from "state_management/stores/store";
import { Provider } from "react-redux";
import { Notifications } from "react-push-notification";
import Draft from "./views/Draft/Draft";
import { PersistGate } from "redux-persist/lib/integration/react";
import { useHistory } from "react-router-dom";
const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <>
          <RootRoutes />
          <Notifications />
        </>
      </PersistGate> */}
      <RootRoutes />
      <Notifications />
    </Provider>
  );
};

export default App;
