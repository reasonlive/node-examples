import {
  ThemedLayoutV2,
  ThemedSiderV2,
  notificationProvider,
} from "@refinedev/antd";
import {
  Refine,
  Authenticated,
  useIsAuthenticated,
  useIsExistAuthentication,
  useUserFriendlyName
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/nestjsx-crud";
import { appWithTranslation, useTranslation } from "next-i18next";

// routes for objects from backend
import {resources} from '../src/resources';
import {authProvider} from "../src/providers/auth-provider";
import config from '../src/config';
import { CustomTitle } from "@components/title";

const API_URL = (config.ENV == 'dev' ? config.API_URL_DEV : config.API_URL_PROD) + "/crud";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
    <Authenticated v3LegacyAuthProviderCompatible key="layout">
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Title={CustomTitle}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    </Authenticated>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const getUserFriendlyName = useUserFriendlyName();

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            routerProvider={routerProvider}
            authProvider={config.AUTH ? authProvider : undefined}
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "4WceBl-FW7Uzv-BHzymQ",
            }}
          >
            {renderComponent()}
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler handler={(props) => {
              return getUserFriendlyName(
                  props.resource?.name,
                  props.action === "list" ? "plural" : "singular",
              ) + ' | ' + config.APP_NAME;
            }}/>
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
