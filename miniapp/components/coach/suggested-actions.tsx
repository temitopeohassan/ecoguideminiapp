"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Zap, Leaf, Droplet, Users } from "lucide-react"
import { useState } from "react"

interface SuggestedAction {
  id: string
  title: string
  description: string
  category: "food" | "energy" | "water" | "transport" | "community"
  difficulty: "easy" | "medium" | "hard"
  impact: string
  estimatedTime: string
}

interface SuggestedActionsProps {
  actions: SuggestedAction[]
  onComplete?: (id: string) => void
}

const categoryIcons = {
  food: <Leaf className="w-4 h-4" />,
  energy: <Zap className="w-4 h-4" />,
  water: <Droplet className="w-4 h-4" />,
  transport: <Leaf className="w-4 h-4" />,
  community: <Users className="w-4 h-4" />,
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export default function SuggestedActions({ actions, onComplete }: SuggestedActionsProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompleted(newCompleted)
    onComplete?.(id)
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Suggested This Week</CardTitle>
        <CardDescription className="text-muted-foreground">Personalized actions based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <div
            key={action.id}
            className="border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer"
            onClick={() => handleToggle(action.id)}
          >
            <div className="flex gap-4 items-start">
              <button className="mt-0.5 flex-shrink-0">
                {completed.has(action.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4
                    className={`font-medium ${completed.has(action.id) ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {action.title}
                  </h4>
                  <span className="flex-shrink-0 text-primary">{categoryIcons[action.category]}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="outline" className={`text-xs ${difficultyColors[action.difficulty]}`}>
                    {action.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Impact: {action.impact}</span>
                  <span className="text-xs text-muted-foreground">~{action.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
