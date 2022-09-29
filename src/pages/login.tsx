import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../assets/lbc-logo.webp'
import classes from '../styles/Login.module.css'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const meta = {
    title: "Login",
    description: "login with your username and password"
}

interface FormValues {
    username: string;
    password: string;
}

const Login: FC = () => {
    const router = useRouter();
    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push('/conversations')
        }
    }, [router, session])
    
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, } = useForm<FormValues>({ mode: 'onChange', criteriaMode: 'all' })

    const submit = async (values) => {
        const res = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: "/conversations",
        });
        if (res?.error) {
            setIsErrorLogin(true);
        } else {
            setIsErrorLogin(false);
        }
        if (res.url) router.push(res.url);
    }

    return (
        <Layout meta={meta}>
            <div className={styles.container}>
            <Image src={logo.src} alt="Leboncoin Frontend Team" width={400} height={125} layout="fixed" />
            <h1>Please login here</h1>
            {isErrorLogin && <p className={classes.warning}>Your username or password is incorrect</p>}
                <form onSubmit={handleSubmit(submit)} >
                    <div className={classes.form}>
                        <div>
                            <input className={classes.formInput} type='text' placeholder='username' {...register('username', { required: 'Ce champ est requis' })} />   
                        </div>
                        <div>
                            <input className={classes.formInput} type='password' placeholder='password' {...register('password', { required: 'Ce champ est requis' })} />   
                        </div>
                        <button type='submit' className={classes.login} disabled={!isDirty || !isValid}>Login</button>
                    </div>
                </form>      
            </div>
        </Layout>
    )
}

export default Login

