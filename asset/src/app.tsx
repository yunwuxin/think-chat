import { useState, useRef, useEffect } from 'react';
import ChatHeader from './components/chat-header';
import MessageList from './components/message-list';
import ChatInput from './components/chat-input';
import { MessagePair } from './types';
import {
    sendChatMessageSSE,
    getChatHistoryPairs,
    saveChatHistoryPairs,
    clearChatHistoryPairs
} from './utils/api';

function App() {
    // 从localStorage初始化消息对历史
    const [messagePairs, setMessagePairs] = useState<MessagePair[]>(() => {
        const history = getChatHistoryPairs();
        if (history.length > 0) {
            return history;
        }
        // 如果没有历史记录，返回欢迎消息对 (question为空表示欢迎消息)
        return [
            {
                answer: `你好！我是AI助手，有什么可以帮助你的吗？`,
                timestamp: new Date()
            }
        ];
    });

    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagePairs]);

    // 保存消息对到localStorage
    useEffect(() => {
        saveChatHistoryPairs(messagePairs);
    }, [messagePairs]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        setIsLoading(true);

        // 先添加一个带问题和空答案的消息对，答案部分显示loading
        const newMessagePair: MessagePair = {
            question: content.trim(),
            answer: '',
            timestamp: new Date(),
            isAnswering: true
        };
        setMessagePairs(prev => [...prev, newMessagePair]);
        const previousId = messagePairs[messagePairs.length - 1]?.id;

        let index = 0;
        sendChatMessageSSE(
            content.trim(),
            // onChunk: 接收到数据块
            (chunk) => {
                if (chunk.chunks) {
                    if (chunk.chunks.content) { //这里只取了content 还可以显示其他内容比如思考信息 工具调用信息
                        setMessagePairs(prev => {
                            return prev.map((pair, i) => {
                                if (i === prev.length - 1) {
                                    let answer = pair.answer;

                                    const currentIndex = chunk.chunks.index;
                                    if (currentIndex !== index) {
                                        index = currentIndex;
                                        answer += '\n\n';
                                    }

                                    answer += chunk.chunks.content;
                                    return { ...pair, answer: answer, isAnswering: false };
                                }
                                return pair;
                            });
                        });
                    }
                } else if (chunk.stats) {
                    //统计信息
                } else if (chunk.id) {
                    //更新消息ID 用于下次对话
                    setMessagePairs(prev => {
                        return prev.map((pair, i) => {
                            if (i === prev.length - 1) {
                                return { ...pair, id: chunk.id };
                            }
                            return pair;
                        });
                    });
                }
            },
            // onComplete: 完成
            () => {
                setIsLoading(false);
            },
            // onError: 错误
            (error: string) => {
                setMessagePairs(prev =>
                    prev.map((pair, i) =>
                        i === prev.length - 1
                            ? { ...pair, answer: `❌ 错误: ${error}`, isAnswering: false }
                            : pair
                    )
                );
                setIsLoading(false);
            },
            previousId,
        );
    };

    const handleClearChat = () => {
        // 重置为欢迎消息对 (question为空表示欢迎消息)
        const welcomeMessagePair: MessagePair = {
            answer: `你好！我是AI助手，有什么可以帮助你的吗？`,
            timestamp: new Date()
        };

        setMessagePairs([welcomeMessagePair]);
        clearChatHistoryPairs();
        saveChatHistoryPairs([welcomeMessagePair]);
    };

    return (
        <div className='flex flex-col h-screen bg-gray-50'>
            <ChatHeader
                onClearChat={handleClearChat}
            />

            <div className='flex-1 flex flex-col overflow-hidden'>
                <MessageList
                    messagePairs={messagePairs}
                    isLoading={isLoading}
                    messagesEndRef={messagesEndRef}
                />

                <ChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
}

export default App;
