import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/client-only"
import { EmptyState } from "@/app/components/empty-state"
import { ListingClient } from "./listing-client"
import getReservations from "@/app/actions/getReservations"

interface Iparams {
    listingId?: string
}

const ListingPage = async ({params}: {params: Iparams}) => {
    const listing = await getListingById(params)
     const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ListingClient 
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage