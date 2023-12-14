// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import user from "./user";
import staff from "./staff";
import paymentEditModal from "./packageModal";
import refresh from "./refresh";
import packageReducer from "./package";
import roles from "./roles";
import profile from "./profile";
import { persistReducer } from "redux-persist";
//@ts-ignore
import storage from "redux-persist/lib/storage";

const persistUserReducer = persistReducer(
  {
    key: "package",
    storage,
  },
  packageReducer
);

const rootReducer = {
  refresh: refresh,
  navbar,
  layout,
  user,
  staff,
  package: persistUserReducer,
  roles,
  profile,
  paymentEditModal,
};

export default rootReducer;
