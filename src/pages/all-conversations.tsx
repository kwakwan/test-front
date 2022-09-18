import { FC, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { getAllUsers, getUserById, getUserConversations } from '../services/fetch.service'
import { User } from '../types/user'
import { Conversation } from '../types/conversation'
import ConversationBox from '../components/ConversationBox'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ConversationHeader from '../components/ConversationHeader'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


const meta = {
    title: "Conversations",
    description: "all user conversations"
}


const ConversationsHome: FC = () => {
    const router = useRouter();
    const [data, setData]= useState([]);
    const { data: session ,status } = useSession({ required: true,  onUnauthenticated() {
        router.push('/login')
      }, })

      useEffect(() => {
        const fetchData = async (id) => {
          const conversations = await getUserConversations(id);
          setData(conversations);
        };
        if(session){
           fetchData(session.id) 
           .catch(console.error);
        }
      }, [session])

    return (
        <Layout meta={meta}>
            <div className={styles.container}>
                <ConversationHeader name={session?.user?.name} text="All your conversations are here !" logoutBtn={true}/>
                {data.length>0 ?
                    data.map((conversation: Conversation, index) => (
                        <a href={`/messages/${conversation.id}?interlocutor=${conversation.recipientNickname === session.user.name ? conversation.senderNickname : conversation.recipientNickname}`} key={index} className={styles.userBox}>
                            <ConversationBox name={conversation.recipientNickname === session.user.name ? conversation.senderNickname : conversation.recipientNickname} lastMsgTime={new Date(conversation.lastMessageTimestamp)} />
                        </a>
                    )) : <p>You don&apos;t have any conversation yet.</p>
                }
            </div>
        </Layout>
    )
}


export default ConversationsHome