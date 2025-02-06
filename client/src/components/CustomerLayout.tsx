"use client";

import Navbar from "@/components/Navbar";
import { PropsWithChildren, useEffect, useState } from "react";
import { fetchUser } from "@/utils"; // Utility function to fetch user data
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export const CustomerLayout = ({ children }: PropsWithChildren) => {
    const { account, connected } = useWallet();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!connected || !account) {
            router.push("/login");
            return;
        }

        const checkUserRole = async () => {
            try {
                const user = await fetchUser(account.address);
                if (!user || user.role !== "CUSTOMER") {
                    router.push("/business");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/login"); // Fallback in case of an error
            } finally {
                setLoading(false);
            }
        };

        checkUserRole();
    }, [account, connected, router]);

    if (loading) return <p>Loading...</p>; // Prevents flashing of incorrect content

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};
