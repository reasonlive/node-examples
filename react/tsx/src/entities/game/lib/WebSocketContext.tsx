import { createContext, useContext, useEffect, useRef, useState } from "react";

type WebSocketContextType = {
    sendJsonMessage: (message: any) => void;
    addMessageHandler: (handler: (message: any) => void) => void;
    removeMessageHandler: (handler: (message: any) => void) => void;
    subscribe: (eventId: string) => void;
    unsubscribe: (eventId: string) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const ws = useRef<WebSocket | null>(null);
    const messageHandlers = useRef<((message: any) => void)[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 50;
    const reconnectInterval = 2000;
    const subscriptions = useRef<Set<string>>(new Set());

    const sendJsonMessage = (message: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open");
        }
    };

    const addMessageHandler = (handler: (message: any) => void) => {
        messageHandlers.current.push(handler);
    };

    const removeMessageHandler = (handler: (message: any) => void) => {
        messageHandlers.current = messageHandlers.current.filter((h) => h !== handler);
    };

    const subscribe = (eventId: string) => {
        subscriptions.current.add(eventId);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            sendJsonMessage({
                type: "subscribe",
                filter: { eventIds: [eventId] },
            });
        }
    };

    const unsubscribe = (eventId: string) => {
        subscriptions.current.delete(eventId);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            sendJsonMessage({
                type: "unsubscribe",
                filter: { eventIds: [eventId] },
            });
        }
    };

    const resubscribe = () => {
        subscriptions.current.forEach((eventId) => {
            sendJsonMessage({
                type: "subscribe",
                filter: { eventIds: [eventId] },
            });
        });
    };

    const connect = () => {
        if (ws.current) {
            return;
        }

        console.log("Connecting to WebSocket...");
        const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
            // TODO: possible to make Bets

            reconnectAttempts.current = 0;
            resubscribe();
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                messageHandlers.current.forEach((handler) => handler(message));
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onclose = () => {
            // TODO: restrict making Bets
            console.log("WebSocket disconnected");
            setIsConnected(false);
            ws.current = null;

            if (reconnectAttempts.current < maxReconnectAttempts) {
                reconnectAttempts.current += 1;
                console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
                setTimeout(connect, reconnectInterval);
            } else {
                console.error("Max reconnection attempts reached. Giving up.");
            }
        };

        socket.onerror = (error) => {
            // TODO: restrict making Bets
            console.error("WebSocket error:", error);
        };

        ws.current = socket;
    };

    useEffect(() => {
        connect();

        return () => {
            // Don't close connection between renders
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{ sendJsonMessage, addMessageHandler, removeMessageHandler, subscribe, unsubscribe }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocketContext must be used within a WebSocketProvider");
    }
    return context;
};