import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, useState } from "react";

type ProvidersProps = {
	children: ReactNode;
	session: Session;
};

const Providers = ({ children, session }: ProvidersProps) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<JotaiProvider>
				<SessionProvider session={session}>{children}</SessionProvider>
			</JotaiProvider>
		</QueryClientProvider>
	);
};

export default Providers;
