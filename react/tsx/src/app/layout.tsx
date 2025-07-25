import type { Metadata } from "next";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { makeMetadata } from "~/shared/lib";
import { YandexMetrika } from "~/shared/metrics";
import "~/shared/ui/styles/index.css";
import { Footer } from "~/widgets/Footer";
import { HeaderLineTop } from "~/widgets/HeaderTop";
import { MobileNavigation } from "~/widgets/MobileNavigation";
import { Navigation } from "~/widgets/Navigation";
import { Provider } from "~/widgets/Provider";
export const metadata: Metadata = makeMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="ru">
      <body>
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(98703324, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`,
          }}
          id="metrika-counter"
          strategy="afterInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html:
              'var _tmr = window._tmr || (window._tmr = []); _tmr.push({id: "3569387", type: "pageView", start: (new Date()).getTime()}); (function (d, w, id) {if (d.getElementById(id)) return; var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id; ts.src = "https://top-fwz1.mail.ru/js/code.js"; var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }})(document, window, "tmr-code");',
          }}
          id="mail-counter"
          strategy="afterInteractive"
        />
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
        <div id="root">
          <Provider>
            <HeaderLineTop />
            <Navigation />
            {children}
            <Footer />
            <ReactQueryDevtools />
          </Provider>
        </div>
        <MobileNavigation />
        <ToastContainer
          autoClose={2000}
          closeOnClick
          draggable
          position="top-center"
          rtl={false}
          theme="dark"
        />
        <div id="toast-root"></div>
      </body>
    </html>
  );
}
