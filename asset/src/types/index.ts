export interface MessagePair {
    id?: string;
    question?: string;  // 可以为空字符串，表示欢迎消息
    answer: string;
    reasoning?: string;  // AI的思考过程
    timestamp: Date;
    isAnswering?: boolean;
}

export interface ChatInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export interface MessagePairProps {
    messagePair: MessagePair;
}

export interface MessageListProps {
    messagePairs: MessagePair[];
    isLoading: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatHeaderProps {
    onClearChat: () => void;
}
