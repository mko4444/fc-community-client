import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import "styles/index.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  useEffect(() => {
    document.body.scrollTop = 0;
  }, [asPath]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource: any, init: any) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
