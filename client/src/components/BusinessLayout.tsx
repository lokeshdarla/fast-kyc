import BusinessNavbar from "@/components/BusinessNavbar";
import { fetchUser } from "@/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export const BusinessLayout = ({ children }: PropsWithChildren) => {
    const { account, connected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/login");
            return;
        }

        const checkUserRole = async () => {
            if (account) {
                const user = await fetchUser(account.address);
                if (user && user.role === "CUSTOMER") {
                    router.push("/customer");
                }
            }
        };

        checkUserRole();
    }, [account, connected, router]); // Added dependencies

    return (
        <div>
            <BusinessNavbar />
            {children}
        </div>
    );
};
