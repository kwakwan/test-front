import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FC, ReactNode } from "react";
import styles from '../../styles/ConversationBox.module.css';

interface ConversationHeaderProps {
    name: string;
    text?: string;
    goBackLink?: string
    logoutBtn?:boolean;
}

const ConversationHeader: FC<ConversationHeaderProps> = ({ name, text, goBackLink, logoutBtn }) => {

    return (
        <div className={styles.interlocutorBox}>
            <div className={styles.nameBox}>
              {goBackLink && <Link href={goBackLink} passHref>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.arrow}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>   
                    </a>
               </Link>}  
                <div className={styles.avatar}>{name?.charAt(0)}</div>
                <p className={styles.interlocutor}>{name} {text ? `- ${text}` : null}</p>
            </div>
            {logoutBtn &&<div onClick={() => signOut()} className={styles.signOut}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.logout}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </div>}
        </div>
    )

}

export default ConversationHeader;