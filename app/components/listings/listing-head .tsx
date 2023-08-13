"use client"

import { Heading } from "@/app/components/heading"
import { HeartButton } from "@/app/components/heart-button"
import { useCountries } from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Image from 'next/image'

interface ListingHeadProps{
    title: string
    imageSrc: string
    locationValues: string
    id: string
    currentUser?: SafeUser | null
} 

export const ListingHead = ({currentUser, id, imageSrc, locationValues, title}: ListingHeadProps) => {
    const {getByValue} = useCountries()

    const location = getByValue(locationValues)

    return(
        <>
            <Heading 
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            /> 
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image 
                    alt='Image'
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}