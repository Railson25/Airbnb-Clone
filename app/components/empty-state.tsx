"use client"

import { useRouter } from "next/navigation"
import { Heading } from "./heading"
import { Button } from "./button"

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
    
}

export const EmptyState = ({
    showReset, 
    subtitle = 'Try changing or removing some of your filters', 
    title = 'No exact matches'
}: EmptyStateProps) =>{
    const router = useRouter()
    return(
        <div className="flex flex-col justify-center items-center gap-2 h-[60vh]">
            <Heading 
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}