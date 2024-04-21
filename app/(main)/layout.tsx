"use client"

import Spinner from '@/components/Spinner'
import { useConvexAuth } from 'convex/react'
import React, { ReactNode } from 'react'
import Navigation from './_components/navigation'
import { redirect } from 'next/navigation'
import SearchCommand from '@/components/search-command'

const MainLayout = ({
    children
}: {
    children : ReactNode
}) => {



    const { isAuthenticated, isLoading } =  useConvexAuth()

    if ( isLoading ) {
        return (
            <div className='h-full flex items-center justify-center' >
                <Spinner size="lg" />
            </div>
        )
    }

    if ( !isAuthenticated ) {
        return redirect("/")
    }


    return (
        <div className='h-full flex dark:bg-[#1F1F1F]'>
            <Navigation />
            <main className='flex-1 h-full overflow-y-auto' >
                <div className='opacity-100'>
                    <SearchCommand />
                </div>
                { children }
            </main>
        </div>
    )

}

export default MainLayout