"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Lightbulb } from "lucide-react"

interface CoachChatProps {
  userProfile: any
}

interface Message {
  id: string
  type: "user" | "coach"
  content: string
  timestamp: Date
  actionSuggested?: boolean
}

export default function CoachChat({ userProfile }: CoachChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "coach",
      content: `Hey there! 🌱 I'm your EcoGuide AI coach. I've learned about your situation in ${userProfile.location} and I'm here to help you make realistic, achievable changes. No judgment—just practical sustainability tips tailored to your life. What would you like help with today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userProfile,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "coach",
        content: data.content || "I'm having trouble processing that right now. Can you try again?",
        timestamp: new Date(),
        actionSuggested: data.content?.includes("impact") || data.content?.includes("action"),
      }
      setMessages((prev) => [...prev, coachMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "coach",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Recommendations</CardTitle>
        <CardDescription className="text-muted-foreground">Get personalized sustainability actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="bg-muted/30 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.actionSuggested && message.type === "coach" && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-foreground/10">
                    <Lightbulb className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs opacity-75">Actions added to your tracker</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask for help or describe your situation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          💡 Tip: Ask about specific challenges or areas you want to improve
        </p>
      </CardContent>
    </Card>
  )
}
