import { Provider as JotaiProvider } from "jotai";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type ProvidersProps = {
	children: ReactNode;
	session: Session;
};

const Providers = ({ children, session }: ProvidersProps) => {
	return (
		<JotaiProvider>
			<SessionProvider session={session}>{children}</SessionProvider>
		</JotaiProvider>
	);
};

export default Providers;
