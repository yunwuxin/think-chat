import React from 'react';
import MessagePair from './message-pair';
import { MessageListProps } from '../types';

const MessageList: React.FC<MessageListProps> = ({ messagePairs, messagesEndRef }) => {
    return (
        <div className='flex-1 overflow-y-auto custom-scrollbar'>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                <div className='space-y-6'>
                    {/* 显示消息对格式 */}
                    {messagePairs.map((messagePair, index) => (
                        <MessagePair key={index} messagePair={messagePair} />
                    ))}

                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    );
};

export default MessageList;
