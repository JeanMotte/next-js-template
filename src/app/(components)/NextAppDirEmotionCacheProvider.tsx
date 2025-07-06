"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export function NextAppDirEmotionCacheProvider({
	children,
	options,
}: {
	children: React.ReactNode;
	options?: { key?: string };
}) {
	const cache = React.useMemo(() => {
		return createCache({ key: options?.key ?? "mui", prepend: true });
	}, [options?.key]);

	return <CacheProvider value={cache}>{children}</CacheProvider>;
}