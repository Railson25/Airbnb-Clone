"use client"

import {signIn} from 'next-auth/react'
import userRegisterModal from '@/app/hooks/userRegisterModal'
import userLoginModal from '@/app/hooks/userLoginModal'
import { useState } from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { Modal } from './modal'
import { Heading } from '../heading'
import { Input } from '../input/input'
import { toast } from 'react-hot-toast'
import { Button } from '../button'
import { useRouter } from 'next/navigation'


export const LoginModal = () => {
    const router = useRouter()
    const registerModal =  userRegisterModal()
    const loginModal = userLoginModal()
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)

        signIn('credentials', {
           ...data,
           redirect: false 
        })
        .then((callback) => {
            setLoading(false)

            if(callback?.ok) {
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4 text-gray-600'>
                <Heading 
                    title='Welcome back'
                    subtitle='Login to your account'
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
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}