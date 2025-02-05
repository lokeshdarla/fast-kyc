import Navbar from "@/components/Navbar"
import { PropsWithChildren } from "react"

export const CustomerLayout = ({ children }: PropsWithChildren)=>{
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}