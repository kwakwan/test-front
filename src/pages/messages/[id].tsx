import { ChangeEvent, FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import styles from '../../styles/Home.module.css'
import classes from '../../styles/ConversationBox.module.css'
import Link from 'next/link'
import { getMessagesById, postMessageInConversation } from '../../services/fetch.service'
import { Message } from '../../types/message'
import Layout from '../../components/Layout'
import MessageBubble from '../../components/MessageBubble'
import { useRouter } from 'next/router'
import ConversationHeader from '../../components/ConversationHeader'


const meta = {
    title: "Messages",
    description: "user conversation messages"
}

interface MessagesProps {
    data: Message[];
}

const Messages: FC<MessagesProps> = ({ data }) => {
    const router = useRouter();
    const value = useRef<string | undefined>()
    // todo useEffect verifier si user est login et récupérer le user ID 

    const interlocutor = useMemo(() => {
        return router.query.interlocutor ? router.query.interlocutor.toString() : null;
    }, [router.query])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        value.current = event.target.value;
    }

    const handleSubmit = async () => {
        // try{
        //     const res = await postMessageInConversation();
        // }
    }

    return (
        <Layout meta={meta}>
            <div className={styles.container}>
                <ConversationHeader name={interlocutor} goBack={() => router.back()} />
                {data.map((msg: Message, index) => (
                    <Fragment key={index}>
                        <MessageBubble message={msg.body} isOwnMsg={false} />
                    </Fragment>
                ))
                }
            </div>
            <div className={styles.container}>
                <form className={classes.form}>
                    <input placeholder='your message here...' onChange={handleInputChange} className={classes.inputText}></input>
                    <button className={classes.sendBtn}>Send</button>
                </form>
            </div>

        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
    //get user id => get all conversations id


    return {
        fallback: 'blocking',
        paths: [],
    }
}

export const getStaticProps: GetStaticProps<MessagesProps> = async ({ params }) => {
    try {
        const messages = await getMessagesById(params.id.toString());
        return { props: { data: messages, } }
    } catch (e) {
        throw Error('can not fetch data')
    }
}

export default Messages