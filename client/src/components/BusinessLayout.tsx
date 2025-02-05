import BusinessNavbar from "@/components/BusinessNavbar"
import { PropsWithChildren } from "react"

export const BusinessLayout = ({ children }: PropsWithChildren)=>{
    return (
        <div>
            <BusinessNavbar />
            {children}
        </div>
    )
}