import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu } from "lucide-react";
import { processLocalQuery, processCloudQuery, type AIResponse } from "../utils/aiEngine";

type Mode = "OFFLINE" | "ONLINE";

interface Message {
    id: number;
    text: string;
    sender: "USER" | "AI";
    timestamp: Date;
    source?: string;
}

const AIChatTerminal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: "SYSTEM_READY: Neural Link Established. \nInitializing retrieval engine... \nAsk me about Dire's skills, projects, or background.",
            sender: "AI",
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    // Automatically use the environment key & default to ONLINE
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const [mode, setMode] = useState<Mode>(envKey ? "ONLINE" : "OFFLINE");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: input,
            sender: "USER",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        const delay = mode === "OFFLINE" ? 800 : 0;

        setTimeout(async () => {
            let response: AIResponse;

            if (mode === "OFFLINE") {
                response = processLocalQuery(userMsg.text);
            } else {
                if (!envKey) {
                    console.warn("Gemini Key MIA. Falling back to local.");
                    response = processLocalQuery(userMsg.text);
                    setMode("OFFLINE");
                } else {
                    try {
                        response = await processCloudQuery(userMsg.text, envKey, "gemini");
                    } catch (err) {
                        console.error("Gemini Uplink Failed:", err);
                        response = processLocalQuery(userMsg.text);
                    }
                }
            }

            const aiMsg: Message = {
                id: Date.now() + 1,
                text: response.text,
                sender: "AI",
                timestamp: new Date(),
                source: response.source
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, delay);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return createPortal(
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 md:right-10 z-50 p-4 bg-terminal-bg border border-terminal-green text-terminal-green rounded-full shadow-glow-strong group"
                >
                    <MessageSquare size={24} className="group-hover:animate-pulse" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-terminal-green"></span>
                    </span>
                </motion.button>
            )}

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-4 md:right-10 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] z-50 flex flex-col bg-terminal-bg border border-terminal-green rounded-lg shadow-2xl overflow-hidden backdrop-blur-md"
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-terminal-green/10 border-b border-terminal-green-dim cursor-move">
                            <div className="flex items-center gap-2">
                                <Cpu size={16} className="text-terminal-green animate-pulse" />
                                <span className="text-xs font-bold text-terminal-green tracking-widest">DIRE_AI_SYSTEM v3.0 // GEMINI_NODE</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {mode === "ONLINE" && <span className="text-[10px] text-terminal-green/50 animate-pulse">UPLINK_ACTIVE</span>}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-terminal-green/60 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-thin scrollbar-thumb-terminal-green/20 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === "USER" ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${msg.sender === "USER"
                                            ? "bg-terminal-green/10 text-terminal-text border border-terminal-green/30"
                                            : "bg-terminal-bg text-terminal-green border border-terminal-green-dim"
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap">{msg.text}</div>
                                    </div>
                                    {msg.source && (
                                        <span className="text-[8px] text-terminal-green/30 mt-1 uppercase tracking-wider">
                                            SRC: {msg.source}
                                        </span>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-1 text-terminal-green/50 text-xs p-2">
                                    <span className="animate-bounce">●</span>
                                    <span className="animate-bounce delay-100">●</span>
                                    <span className="animate-bounce delay-200">●</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-terminal-green/5 border-t border-terminal-green-dim flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={mode === "OFFLINE" ? "Query local database..." : "Send to Cloud Uplink..."}
                                className="flex-1 bg-transparent border-none outline-none text-sm text-terminal-text placeholder:text-terminal-green/30 font-mono"
                                autoFocus
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="text-terminal-green hover:text-white disabled:opacity-30 disabled:hover:text-terminal-green transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
};

export default AIChatTerminal;
