"use client"

import Image from "next/image"

interface AvatarProps {
    src: string | null | undefined
}

export const Avatar = ({src}:  AvatarProps) => {
    return(
        <div>
            <Image 
                className="rounded-full"
                src={src || '/images/placeholder.jpg'}
                height='30'
                width='30'
                alt="Avatar"
            />
        </div>
    )
}