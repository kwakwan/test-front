import Head from "next/head";
import { FC, ReactNode } from "react";
import styles from '../../styles/ConversationBox.module.css';

interface ConversationHeaderProps {
    name: string;
    text?: string;
    goBack?: () => void;
}

const ConversationHeader: FC<ConversationHeaderProps> = ({ name, text, goBack }) => {


    return (
        <div className={styles.interlocutorBox}>
            {goBack && <div onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={styles.arrow}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>}
            <div className={styles.avatar}>{name?.charAt(0)}</div>
            <p className={styles.interlocutor}>{name} {text ? `- ${text}` : null}</p>
        </div>
    )

}

export default ConversationHeader;