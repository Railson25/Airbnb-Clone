"use client"

import { Container } from "@/app/components/container"
import { categories } from "@/app/components/navbar/categories"
import { SafeReservation, SafeUser, safeListing } from "@/app/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ListingHead } from "../../components/listings/listing-head "
import { ListingInfo } from "../../components/listings/listing-info "
import userLoginModal from "@/app/hooks/userLoginModal"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { toast } from "react-hot-toast"
import { ListingReservation } from "@/app/components/listings/listing-reservation"
import { Range } from "react-date-range"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[]
    listing: safeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

export const ListingClient = ({listing, reservations = [], currentUser}: ListingClientProps) => {
    
    const category = useMemo(() => {
        return categories.find((item) => {
            item.label
        })
    }, [listing.category])

    const loginModal = userLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        })
        .then(() => {
            toast.success('Listing reserved')
            setDateRange(initialDateRange)
            router.push('/trips')
        })
        .catch(() => {
            toast.error('Something went wrong.')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])


    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else{
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

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
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}