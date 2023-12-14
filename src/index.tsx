// ** React Imports
import { Suspense, lazy } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./core/utils/aws-exports";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// ** Redux Imports
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

import "animate.css/animate.css";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
// ** ThemeColors Context

import { ThemeContext } from "./core/context/ThemeColors";
import ability from "./configs/acl/ability";

// ** ThemeConfig
import themeConfig from "./configs/themeConfig";

// ** Toast
import { Toaster } from "react-hot-toast";

// ** Spinner (Splash Screen)
import { SpinnerComponent as Spinner } from "./components/common/spinner/Fallback-spinner";

// ** Ripple Button
import "./components/common/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./assets/fonts/feather/iconfont.css";
import "./assets/scss/core.scss";
import "./assets/scss/style.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./assets/fonts/basics/basicfonts.css";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { AbilityContext } from "./core/context/Can";

// ** Lazy load app
const LazyApp = lazy(() => import("./App").then((o) => ({ default: o.App })));

Amplify.configure(awsExports);

const container: any = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // cacheTime: 5000,
      // staleTime: 5000 * 60,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Spinner />}>
            <AbilityContext.Provider value={ability}>
              <ThemeContext>
                <LazyApp />
                <Toaster
                  position={themeConfig.layout.toastPosition}
                  toastOptions={{
                    className: "react-hot-toast",
                    duration: 5000,
                  }}
                />
              </ThemeContext>
            </AbilityContext.Provider>
          </Suspense>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
