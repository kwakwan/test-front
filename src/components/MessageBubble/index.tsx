import { FC } from "react";
import clsx from 'clsx';
import styles from '../../styles/ConversationBox.module.css';

interface MessageBubbleProps {
    name?: string;
    message: string;
    isOwnMsg: boolean;
}

const MessageBubble: FC<MessageBubbleProps> = ({ name, message, isOwnMsg }) => {


    return (
        <div className={clsx(styles.bubbleBox, !isOwnMsg && styles.bubbleBox2)}>
            {name && <div className={clsx(styles.avatar, styles.avatar2)}>{name.charAt(0)}</div>}
            <div className={clsx(styles.bubble, isOwnMsg && styles.ownMsg)}>
                <p className={styles.text} > {message}</p>
            </div >
        </div>
    )

}

export default MessageBubble;