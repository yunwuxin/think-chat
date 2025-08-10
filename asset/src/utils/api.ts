// API 工具函数

import { MessagePair } from '../types';

export interface ChatMessage {
    message: string;
}

export interface ChatResponse {
    success: boolean;
    data?: {
        reply: string
    };
    message?: string;
}

/**
 * 发送聊天消息到后端API (SSE流式响应)
 * @param input 用户消息
 * @param onChunk 接收到数据块时的回调函数
 * @param onComplete 完成时的回调函数
 * @param onError 错误时的回调函数
 * @param previousId 上次消息ID
 */
export async function sendChatMessageSSE(
    input: string,
    onChunk: (chunk: any) => void,
    onComplete: () => void,
    onError: (error: string) => void,
    previousId?: string,
): Promise<void> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
            },
            body: JSON.stringify({ input, previous_id: previousId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('无法获取响应流');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    onComplete();
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // 保留最后一个不完整的行

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    if (line.startsWith('data: ')) {
                        const data = line.slice(6); // 移除 "data: " 前缀

                        if (data === '[DONE]') {
                            onComplete();
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            onChunk(parsed);
                        } catch (e) {
                            // 如果不是JSON，直接作为文本处理
                            onChunk(data);
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    } catch (error) {
        console.error('SSE请求失败:', error);
        onError(error instanceof Error ? error.message : '网络请求失败');
    }
}

// LocalStorage 相关工具函数
const STORAGE_KEY_PAIRS = 'think-chat-message-pairs';

/**
 * 从localStorage获取聊天历史 (MessagePair格式)
 * @returns MessagePair[]
 */
export function getChatHistoryPairs(): MessagePair[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_PAIRS);
        if (!stored) return [];

        const messagePairs = JSON.parse(stored);
        // 恢复Date对象
        return messagePairs.map((pair: any) => ({
            ...pair,
            timestamp: new Date(pair.timestamp)
        }));
    } catch (error) {
        console.error('获取聊天历史失败:', error);
        return [];
    }
}

/**
 * 保存聊天历史到localStorage (MessagePair格式)
 * @param messagePairs 消息对列表
 */
export function saveChatHistoryPairs(messagePairs: MessagePair[]): void {
    try {
        localStorage.setItem(STORAGE_KEY_PAIRS, JSON.stringify(messagePairs));
    } catch (error) {
        console.error('保存聊天历史失败:', error);
    }
}

/**
 * 清空聊天历史 (MessagePair格式)
 */
export function clearChatHistoryPairs(): void {
    try {
        localStorage.removeItem(STORAGE_KEY_PAIRS);
    } catch (error) {
        console.error('清空聊天历史失败:', error);
    }
}

/**
 * 添加消息对到历史记录
 * @param messagePair 新消息对
 */
export function addMessagePairToHistory(messagePair: MessagePair): void {
    const history = getChatHistoryPairs();
    history.push(messagePair);
    saveChatHistoryPairs(history);
}
