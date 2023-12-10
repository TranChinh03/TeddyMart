import RootRoutes from "./routes/route/RootRoutes";
import { store } from "state_management/stores/store";
import { Provider } from "react-redux";
import { Notifications } from "react-push-notification";
import Draft from "./views/Draft/Draft";
const App = () => {
  return (
    <Provider store={store}>
      <RootRoutes />
      <Notifications />
      {/* <Draft /> */}
    </Provider>
  );
};

export default App;
