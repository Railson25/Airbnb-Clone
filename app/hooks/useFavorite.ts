"use client"
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
import { SafeUser } from '../types'
import userLoginModal from './userLoginModal'
import { useCallback, useMemo } from 'react'

interface IUserFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

export const useFavorite = ({listingId, currentUser}: IUserFavorite) => {
    const router = useRouter()
    const loginModal = userLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request 

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Success')

        } catch (error) {
            toast.error('Something went wrong')
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {hasFavorited, toggleFavorite}
}