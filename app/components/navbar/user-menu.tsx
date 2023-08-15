"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import { Avatar } from '../avatar'
import { useState, useCallback } from 'react'
import { MenuItem } from './menu-item'
import userRegisterModal from '@/app/hooks/userRegisterModal'
import userLoginModal from '@/app/hooks/userLoginModal'
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

export const UserMenu = ({currentUser}: UserMenuProps) => {
    const router = useRouter()
    const registerModal = userRegisterModal()
    const loginModal = userLoginModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md"
                >
                    <AiOutlineMenu  />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                            <MenuItem 
                                onClick={()=> router.push('/trips')}
                                label='My trips'
                            />
                            <MenuItem 
                                onClick={()=> {}}
                                label='My favorites'
                            />
                            <MenuItem 
                                onClick={()=> router.push('/reservations')}
                                label='My reservations'
                            />
                            <MenuItem 
                                onClick={()=> {}}
                                label='My properties'
                            />
                            <MenuItem 
                                onClick={rentModal.onOpen}
                                label='Airbnb my home'
                            />
                            <hr />
                            <MenuItem 
                                onClick={()=> signOut()}
                                label='Logout'
                            />
                        </>
                        ): (
                            <>
                                <MenuItem 
                                    onClick={loginModal.onOpen}
                                    label='Login'
                                />
                                <MenuItem 
                                    onClick={registerModal.onOpen}
                                    label='Sign up'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
