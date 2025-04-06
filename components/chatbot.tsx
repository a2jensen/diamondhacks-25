"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define types for our messages
interface Message {
  role: 'user' | 'model';
  content: string;
  // For internal tracking - don't send this to API
  isContextualMessage?: boolean;
}

export default function GeminiChatbot({ noteContent }: { noteContent: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add an initial system context message when the component mounts
  useEffect(() => {
    if (noteContent && messages.length === 0) {
      // We'll add an initial hidden context message
      setMessages([
        {
          role: 'user',
          content: `Note context: ${noteContent}`,
          isContextualMessage: true
        }
      ]);
    }
  }, [noteContent, messages.length]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { 
      role: 'user', 
      content: input.trim() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Format API request body
      // We'll send all messages except those marked as contextual/hidden
      const visibleMessages = messages
        .filter(msg => !msg.isContextualMessage)
        .map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content
        }));
      
      // Construct the API request with both context and user messages
      const requestBody = {
        messages: [
          // First send the context message
          {
            role: 'user',
            content: `Note context: ${noteContent}\n\nUser question: ${input.trim()}`
          },
          // Then send previous conversation history for context
          ...visibleMessages
        ]
      };
      
      
      // Make API request to your backend endpoint that will call Gemini
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage: Message = {
        role: 'model',
        content: data.response || "Sorry, I couldn't generate a response."
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Sorry, there was an error processing your request." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button 
        onClick={() => setShowChat(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-md bg-primary text-white hover:bg-primary/90"
      >
        {showChat ? "↓" : "↑"}
      </Button>

      {/* Chatbox */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-[90vw] max-w-md h-[600px] border rounded-md overflow-hidden bg-white shadow-lg z-40">
          <div className="flex flex-col h-[600px] w-full max-w-md mx-auto border rounded-md overflow-hidden">
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Only show visible messages (not contextual ones) */}
              {messages.filter(m => !m.isContextualMessage).length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Send a message to start chatting about this note
                </div>
              ) : (
                messages
                  .filter(m => !m.isContextualMessage)
                  .map((message, index) => (
                    <div 
                      key={index}
                      className={`mb-4 ${
                        message.role === 'user' 
                          ? 'text-right' 
                          : 'text-left'
                      }`}
                    >
                      <div 
                        className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.role === 'user' ? 'You' : 'Gemini AI'}
                      </div>
                    </div>
                  ))
              )}
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Gemini AI
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <form 
              onSubmit={sendMessage}
              className="border-t p-4 flex gap-2"
            >
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this note..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}