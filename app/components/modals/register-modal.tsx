"use client"

import userRegisterModal from '@/app/hooks/userRegisterModal'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import { useState } from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { Modal } from './modal'
import { Heading } from '../heading'
import { Input } from '../input/input'
import { toast } from 'react-hot-toast'
import { Button } from '../button'


export const RegisterModal = () => {
    const registerModal =  userRegisterModal()
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error("Something went wrong.")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4 text-gray-600'>
                <Heading 
                    title='Welcome to Airbnb'
                    subtitle='Create an account'
                />
                <Input 
                    id='email'
                    label='Email'
                    type='email'
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id='name'
                    label='Name'
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id='password'
                    label='Password'
                    type='password'
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className=' justify-center flex flex-row items-center gap-2'>
                    <div>Already have an account?</div>
                    <div
                        onClick={registerModal.onClose}
                        className='text-black font-bold cursor-pointer hover:underline'
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <Modal 
            disabled={loading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}