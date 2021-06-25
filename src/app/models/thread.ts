import { Message } from "./message";

export class Thread {
    id: number;
    estateId: number;
    title: string;
    active1: boolean;
    active2: boolean;
    read: boolean;
    lastMessageDate: string;
    user1: string;
    user2: string;
    estateOwner: string;
    messages: Array<Message>;
}