import RootRoutes from "./routes/route/RootRoutes";
import { store } from "state_management/stores/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={store}>
      <RootRoutes />
    </Provider>
  );
};

export default App;
