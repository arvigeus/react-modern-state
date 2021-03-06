// import App from "next/app";
import React, { StrictMode, useCallback, useEffect } from "react";
import { AppProps, NextWebVitalsMetric /* , AppContext */ } from "next/app";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import defaultSeoConfig from "seo.json";
import AppWrapper from "AppWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onAppReset = useCallback(() => {
    // reset the state of your app so the error doesn't happen again
    window.location.reload();
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <SocialProfileJsonLd
        type="Organization"
        name="arvigeus"
        url={`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}`}
        sameAs={
          [
            // https://github.com/garmeeh/next-seo#social-profile
          ]
        }
      />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={onAppReset}
        onError={errorHandler}
      >
        <AppWrapper>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </AppWrapper>
      </ErrorBoundary>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          color: #000;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI",
            "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
          background: #fff;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message ?? "Unknown error"}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again ↺
      </button>
    </div>
  );
}

const errorHandler = (error: Error) => {
  // Do something with the error
  console.error(`An error occurred: \`${error.message}\``);
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics
  if (process.env.NODE_ENV === "development")
    console.info(JSON.stringify(metric));
}
