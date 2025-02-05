"use client";

import Navbar from "@/components/Navbar"
import { PropsWithChildren } from "react"
import { useContext } from 'react';
import { GlobalContext } from '@/context/context';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CustomerLayout = ({ children }: PropsWithChildren)=>{

    const {Customer} = useContext<any>(GlobalContext);
    const router = useRouter();

    useEffect(()=>{

        if(Customer){
            router.push('/customer')
        }
        else{
            router.push('/business')       
        }
    },[])
    
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}