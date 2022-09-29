import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import styles from '../../styles/Home.module.css'
import classes from '../../styles/ConversationBox.module.css'
import { getMessagesById, getUserConversations, postMessageInConversation } from '../../services/fetch.service'
import { Message } from '../../types/message'
import Layout from '../../components/Layout'
import MessageBubble from '../../components/MessageBubble'
import { useRouter } from 'next/router'
import ConversationHeader from '../../components/ConversationHeader'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'


const meta = {
    title: "Messages",
    description: "user conversation messages"
}

interface FormValues {
    message: string;
}

interface MessagesProps {
    data: Message[];
}

const Messages: FC<MessagesProps> = ({ data }) => {
    const router = useRouter();
    const [allMessages, setMessages]= useState([]);
    const [interlocutor, setInterlocutor]= useState('');

    const { register, handleSubmit, reset } = useForm<FormValues>({ mode: 'onChange', criteriaMode: 'all' })

    const { data: session ,status } = useSession({ required: true,  onUnauthenticated() {
        router.push('/login')
      }, })
    
    useEffect(() => {
        const fetchData = async (id) => {
            const conversations = await getUserConversations(id);
            const selectedConversation = conversations.filter((conversation)=> conversation.id == router.query.id);
            setInterlocutor(selectedConversation[0]?.recipientId !== session.id ? selectedConversation[0]?.recipientNickname : selectedConversation[0]?.senderNickname)
          };
        if(session){
            setMessages(data);
            fetchData(session.id)
        }
      }, [session, data, router])


    const submit = async (values) => {
        try{
            if(values.message.length>0){
                const res = await postMessageInConversation(router.query.id.toString(), {authorId: Number(session.id), body: values.message});
                if(res){
                    const messages = await getMessagesById(router.query.id.toString())
                    setMessages(messages);
                    reset();
                }
            }
        }catch(e){
            console.error(e)
        }
    }

    return (
        <Layout meta={meta}>
            <div className={styles.container}>
                <div className={classes.stickyTop}>
                    <ConversationHeader name={interlocutor} goBackLink="/conversations" />
                </div>
                    
                <div className={classes.allMsg}>
                    {allMessages.map((msg: Message, index) => (
                        <Fragment key={index}>
                            <MessageBubble message={msg.body} isOwnMsg={msg.authorId == session.id ? true : false} name={msg.authorId == session.id ? undefined : interlocutor} />
                        </Fragment>
                    ))
                    }
                </div>
                <div>
                    <form onSubmit={handleSubmit(submit)} >
                        <div className={classes.form}>
                            <input className={classes.inputText} type='text' placeholder='your message here..' {...register('message')} />   
                            <button type='submit' className={classes.sendBtn} >Send</button>
                        </div>
                    </form>  
                </div>
            </div>

        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {

    return {
        fallback: 'blocking',
        paths: [],
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
        const messages = await getMessagesById(params.id.toString());
        if( messages.length ==0 )return { notFound: true }
        return { props: { data: messages, } }
}

export default Messages