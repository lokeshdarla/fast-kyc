import HomeNavbar from "@/components/HomeNavBar"
import { PropsWithChildren } from "react"

export const BusinessLayout = ({ children }: PropsWithChildren)=>{
    return (
        <div>
            <HomeNavbar />
            {children}
        </div>
    )
}