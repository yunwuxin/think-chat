import React from 'react';
import { ChatHeaderProps } from '../types';

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
    return (
        <header className='bg-white border-b border-gray-200 px-4 py-3 shadow-sm'>
            <div className='max-w-4xl mx-auto flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                        </svg>
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold text-gray-900'>Think Chat</h1>
                        <p className='text-sm text-gray-500'>AI对话助手</p>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <button
                        onClick={onClearChat}
                        className='header-button'
                        title='清空对话'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                        <span>清空</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
