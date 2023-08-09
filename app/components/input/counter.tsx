"use client "

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface CounterProps{
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

export const Counter = ({onChange, subtitle, title, value}: CounterProps) => {

    const onAdd = useCallback(() => {
        onChange(value +1)

    }, [onChange, value])

    const onReduce = useCallback(() => {
        if(value === 1){
            return
        }
        onChange(value - 1)

    }, [onChange, value])

    return(
        <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-col">
                <div className="font-bold">
                    {title}
                </div>
                <div className="font-light">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="w-10 h-10 rounded-full border-[1px] border-neutral-500 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                    <AiOutlineMinus className='text-red'/>
                </div>
                <div className="font-light text-xl">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="w-10 h-10 rounded-full border-[1px] border-neutral-500 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                    <AiOutlinePlus className='text-red'/>
                </div>
            </div>
        </div>
    )
}