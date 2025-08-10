import React, { useState, useRef, KeyboardEvent } from 'react';
import { ChatInputProps } from '../types';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage('');
            // 重置textarea高度
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // 自动调整textarea高度
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    };

    return (
        <div className='bg-white border-t border-gray-200 px-4 py-4 shadow-lg'>
            <div className='max-w-4xl mx-auto'>
                <form onSubmit={handleSubmit} className='flex items-center space-x-4'>
                    <div className='flex-1 chat-input-container'>
            <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='输入你的消息... (Shift+Enter 换行)'
                className='chat-input'
                disabled={disabled}
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
            />
                    </div>

                    <div className='flex-shrink-0'>
                        <button
                            type='submit'
                            disabled={!message.trim() || disabled}
                            className='send-button flex items-center justify-center space-x-2'
                            style={{ height: '48px', minWidth: '80px' }}
                        >
                            {disabled ? (
                                <svg className='w-4 h-4 animate-spin' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                                </svg>
                            ) : (
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                                </svg>
                            )}
                            <span>{disabled ? '发送中...' : '发送'}</span>
                        </button>
                    </div>
                </form>

                <div className='mt-2 text-xs text-gray-400 text-center'>
                    按 Enter 发送消息，Shift+Enter 换行
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
