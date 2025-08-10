import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessagePairProps } from '../types';

const MessagePair: React.FC<MessagePairProps> = ({ messagePair }) => {
    const { question, answer, timestamp, isAnswering = false } = messagePair;

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className='space-y-4 animate-slide-up message-enter'>
            {/* 用户问题 - 只有当question不为空时才显示 */}
            {question && (
                <div className='flex justify-end'>
                    <div className='flex items-start space-x-3 max-w-xs lg:max-w-md flex-row-reverse space-x-reverse'>
                        {/* 用户头像 */}
                        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center'>
                            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                        </div>

                        {/* 问题内容 */}
                        <div className='flex flex-col'>
                            <div className='message-bubble user-message'>
                                <p className='text-sm leading-relaxed whitespace-pre-wrap'>{question}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AI回答 */}
            <div className='flex justify-start'>
                <div className='flex items-start space-x-3 max-w-xs lg:max-w-md'>
                    {/* AI头像 */}
                    <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'>
                        <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                        </svg>
                    </div>

                    {/* 回答内容 */}
                    <div className='flex flex-col'>
                        <div className='message-bubble ai-message'>
                            <div className='text-sm leading-relaxed markdown-content'>
                                {isAnswering && !answer ? (
                                    // 显示typing indicator
                                    <div className='flex space-x-1 py-2'>
                                        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                                        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                                        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            // 自定义组件样式
                                            p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                                            h1: ({ children }) =>
                                                <h1 className='text-lg font-bold mb-2'>{children}</h1>,
                                            h2: ({ children }) =>
                                                <h2 className='text-base font-bold mb-2'>{children}</h2>,
                                            h3: ({ children }) =>
                                                <h3 className='text-sm font-bold mb-1'>{children}</h3>,
                                            ul: ({ children }) =>
                                                <ul className='list-disc list-inside mb-2 space-y-1'>{children}</ul>,
                                            ol: ({ children }) =>
                                                <ol className='list-decimal list-inside mb-2 space-y-1'>{children}</ol>,
                                            li: ({ children }) => <li className='text-sm'>{children}</li>,
                                            blockquote: ({ children }) => (
                                                <blockquote className='border-l-2 border-gray-300 pl-3 italic text-gray-600 mb-2'>
                                                    {children}
                                                </blockquote>
                                            ),
                                            code: ({ inline, children }) =>
                                                inline ? (
                                                    <code className='bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono'>
                                                        {children}
                                                    </code>
                                                ) : (
                                                    <code className='block bg-gray-100 text-gray-800 p-2 rounded text-xs font-mono overflow-x-auto mb-2'>
                                                        {children}
                                                    </code>
                                                ),
                                            pre: ({ children }) => (
                                                <pre className='bg-gray-100 text-gray-800 p-3 rounded text-xs font-mono overflow-x-auto mb-2'>
                          {children}
                        </pre>
                                            ),
                                            strong: ({ children }) =>
                                                <strong className='font-semibold'>{children}</strong>,
                                            em: ({ children }) => <em className='italic'>{children}</em>,
                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='text-blue-500 hover:text-blue-700 underline'
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            table: ({ children }) => (
                                                <div className='overflow-x-auto mb-2'>
                                                    <table className='min-w-full border border-gray-200 text-xs'>
                                                        {children}
                                                    </table>
                                                </div>
                                            ),
                                            thead: ({ children }) => (
                                                <thead className='bg-gray-50'>{children}</thead>
                                            ),
                                            th: ({ children }) => (
                                                <th className='border border-gray-200 px-2 py-1 text-left font-semibold'>
                                                    {children}
                                                </th>
                                            ),
                                            td: ({ children }) => (
                                                <td className='border border-gray-200 px-2 py-1'>{children}</td>
                                            ),
                                        }}
                                    >
                                        {answer || ''}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>

                        {/* 时间戳 */}
                        <div className='text-xs text-gray-400 mt-1 text-left'>
                            {formatTime(timestamp)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePair;
