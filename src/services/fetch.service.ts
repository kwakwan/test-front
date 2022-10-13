import { Conversation } from '../types/conversation';
import { Message } from '../types/message';
import { User } from '../types/user';

export const getAllUsers = async ():Promise<User[]> => {
    try {
        const res = await fetch('http://localhost:3005/users')
        const users = await res.json();
        return users;
    } catch (e) { console.error(e) }
}

export const getUserById = async (userId: number):Promise<User>  => {
    try {
        const res = await fetch(`http://localhost:3005/user/${userId}`)
        const user = await res.json();
        return user;
    } catch (e) { console.error(e) }
}

export const getUserConversations = async (userId: number):Promise<Conversation[]>  => {
    try {
        const res = await fetch(`http://localhost:3005/conversations/${userId}`)
        const users = await res.json();
        return users;
    } catch (e) { console.error(e) }
}

export const getMessagesById = async (conversationId: string):Promise<Message[]>  => {
    try {
        const res = await fetch(`http://localhost:3005/messages/${conversationId}`)
        const messages = await res.json();
        return messages;
    } catch (e) { console.error(e) }
}

export const postMessageInConversation = async (conversationId: string, userMsg: { authorId: number, body: string }):Promise<Message[]>  => {
    const data = {
        body: userMsg.body,
        authorId: userMsg.authorId,
        conversationId: conversationId,
        timestamp: new Date().getTime(),
    }
    try {
        const res = await fetch(`http://localhost:3005/messages/${conversationId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const messages = await res.json();
        return messages;
    } catch (e) { console.error(e) }
}