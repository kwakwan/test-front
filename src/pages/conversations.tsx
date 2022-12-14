import { FC, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getUserConversations } from '../services/fetch.service'
import { Conversation } from '../types/conversation'
import ConversationBox from '../components/ConversationBox'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ConversationHeader from '../components/ConversationHeader'
import {useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { unstable_getServerSession } from 'next-auth'


const meta = {
    title: "Conversations",
    description: "all user conversations"
}

const Conversations: FC = () => {
    const router = useRouter();
    const [data, setData]= useState<Conversation[]>([]);
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
                {session && (
                    <>
                    <ConversationHeader name={session?.user?.name} text="All your conversations are here !" logoutBtn={true}/>
                    {data.length>0 ?
                        data.map((conversation, index) => (
                            <Link  key={index} href={`/messages/${conversation.id}`} passHref>
                                <a className={styles.userBox}>
                                    <ConversationBox name={conversation.recipientNickname === session.user.name ? conversation.senderNickname : conversation.recipientNickname} lastMsgTime={new Date(conversation.lastMessageTimestamp)} />
                                </a>
                            </Link>
                        )) : <p>You don&apos;t have any conversation yet.</p>
                    }
                    </>
                )}
                {status == "loading" && (
                    <p>Loading...</p>
                )}
            </div>
        </Layout>
    )
}

// export const getStaticProps: GetStaticProps = async(context) =>{
//     const session = await unstable_getServerSession(context.req, context.res, authOptions)
// }


export default Conversations