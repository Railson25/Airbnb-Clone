"use client"

import { Container } from "@/app/components/container"
import { categories } from "@/app/components/navbar/categories"
import { SafeUser, safeListing } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import { ListingHead } from "./listing-head "
import { ListingInfo } from "./listing-info "


interface ListingClientProps {
    reservation?: Reservation[]
    listing: safeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

export const ListingClient = ({listing, reservation, currentUser}: ListingClientProps) => {
    
    const category = useMemo(() => {
        return categories.find((item) => {
            item.label
        })
    }, [listing.category])
    return(
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValues={listing.locationValues}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
                        <ListingInfo 
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValues={listing.locationValues}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}