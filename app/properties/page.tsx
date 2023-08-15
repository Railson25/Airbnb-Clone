import { EmptyState } from "../components/empty-state"
import ClientOnly from "../components/client-only"
import getCurrentUser from "../actions/getCurrentUser"

import { PropertiesClient } from "./properties-client"
import getListings from "../actions/getListings"


 const PropertiesPage = async () => {
    const currentUser = await  getCurrentUser()
    
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0) {
        <ClientOnly>
            <EmptyState 
                title="No properties found"
                subtitle="Looks like you haven't properties."
            />
        </ClientOnly>
    }

    return (
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage