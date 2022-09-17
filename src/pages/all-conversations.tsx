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


const meta = {
    title: "Conversations",
    description: "all user conversations"
}

interface ConversationProps {
    data: Conversation[];
    user: User;
}

const ConversationsHome: FC<ConversationProps> = ({ data, user }) => {
    // todo useEffect verifier si user est login

    return (
        <Layout meta={meta}>
            <div className={styles.container}>
                <ConversationHeader name={user.nickname} text="All your conversations are here !" />
                {
                    data.map((conversation: Conversation, index) => (
                        <a href={`/messages/${conversation.id}?interlocutor=${conversation.recipientNickname === user.nickname ? conversation.senderNickname : conversation.recipientNickname}`} key={index} className={styles.userBox}>
                            <ConversationBox name={conversation.recipientNickname === user.nickname ? conversation.senderNickname : conversation.recipientNickname} lastMsgTime={new Date(1625637849)} />
                        </a>
                    ))
                }

            </div>

        </Layout>
    )
}

export const getStaticProps: GetStaticProps<ConversationProps> = async () => {
    try {
        const conversations = await getUserConversations(3);
        const user = await getUserById(3);
        return { props: { data: conversations, user: user[0] } }
    } catch (e) {
        throw Error('can not fetch data')
    }
}

export default ConversationsHome