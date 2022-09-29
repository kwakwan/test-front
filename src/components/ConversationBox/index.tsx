import { FC} from "react";
import styles from '../../styles/ConversationBox.module.css';

interface ConversationBoxProps {
    name: string;
    lastMsgTime: Date;
}

const ConversationBox: FC<ConversationBoxProps> = ({ name, lastMsgTime }) => {

    return (
        <div className={styles.conversationBox}>
            <div className={styles.avatar}>{name.charAt(0)}</div>
            <div>
                <p className={styles.text} > {name}</p>
                <p className={styles.time}>{lastMsgTime.toLocaleDateString("fr")}</p>

            </div>
        </div >
    )

}

export default ConversationBox;