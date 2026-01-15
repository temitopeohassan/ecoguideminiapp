"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Zap, Leaf, Droplet } from "lucide-react"

interface ProgressTrackerProps {
  userProfile: any
}

interface Action {
  id: string
  title: string
  description: string
  category: "food" | "energy" | "water" | "transport" | "community"
  completed: boolean
  difficulty: "easy" | "medium" | "hard"
  impact: string
}

const mockActions: Action[] = [
  {
    id: "1",
    title: "Bring reusable bags to grocery store",
    description: "Use your own bags instead of plastic ones",
    category: "food",
    completed: true,
    difficulty: "easy",
    impact: "~0.5kg waste saved",
  },
  {
    id: "2",
    title: "Turn off lights when leaving a room",
    description: "Simple habit to reduce energy consumption",
    category: "energy",
    completed: true,
    difficulty: "easy",
    impact: "~0.3kg CO₂ saved",
  },
  {
    id: "3",
    title: "Take shorter showers",
    description: "Aim for 5 minutes instead of 10",
    category: "water",
    completed: false,
    difficulty: "easy",
    impact: "~15L water saved",
  },
  {
    id: "4",
    title: "Meal prep with local vegetables",
    description: "Buy from farmers market or local store",
    category: "food",
    completed: false,
    difficulty: "medium",
    impact: "~2kg CO₂ saved",
  },
  {
    id: "5",
    title: "Walk or bike instead of driving",
    description: "For trips under 2km",
    category: "transport",
    completed: false,
    difficulty: "medium",
    impact: "~5kg CO₂ saved",
  },
]

const categoryIcons = {
  food: <Leaf className="w-4 h-4" />,
  energy: <Zap className="w-4 h-4" />,
  water: <Droplet className="w-4 h-4" />,
  transport: <Leaf className="w-4 h-4" />,
  community: <Leaf className="w-4 h-4" />,
}

const categoryColors = {
  food: "bg-secondary/20 text-secondary",
  energy: "bg-primary/20 text-primary",
  water: "bg-accent/20 text-accent",
  transport: "bg-primary/20 text-primary",
  community: "bg-secondary/20 text-secondary",
}

export default function ProgressTracker({ userProfile }: ProgressTrackerProps) {
  const [actions, setActions] = useState<Action[]>(mockActions)
  const completedCount = actions.filter((a) => a.completed).length

  const handleToggle = (id: string) => {
    setActions((prev) =>
      prev.map((action) => (action.id === id ? { ...action, completed: !action.completed } : action)),
    )
  }

  const completionPercent = (completedCount / actions.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-foreground">This Week's Progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            {completedCount} of {actions.length} actions completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Progress</span>
              <span className="text-primary font-medium">{Math.round(completionPercent)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Keep going! Small actions compound into real impact. 🌱</p>
        </CardContent>
      </Card>

      {/* Actions List */}
      <div className="space-y-3">
        {actions.map((action) => (
          <Card
            key={action.id}
            className={`border-border/50 cursor-pointer transition-all ${action.completed ? "bg-muted/30" : ""}`}
          >
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <button onClick={() => handleToggle(action.id)} className="mt-1 flex-shrink-0">
                  {action.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className={`font-medium ${action.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                    >
                      {action.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${categoryColors[action.category]}`}>
                      {action.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Impact: {action.impact}</span>
                    <span className="capitalize text-primary font-medium">{action.difficulty}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encouragement */}
      <Card className="border-border/50 border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-foreground">
              💪 You've completed {completedCount} action{completedCount !== 1 ? "s" : ""} this week!
            </p>
            <p className="text-xs text-muted-foreground">
              {completionPercent === 100
                ? "Amazing! You crushed your goals this week. Time to set new ones!"
                : completionPercent >= 50
                  ? "Great momentum! A few more to go."
                  : "You've got this! Start with the easy ones."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
