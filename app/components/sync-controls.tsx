"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, RefreshCw, Calendar, Zap } from "lucide-react"

interface SyncControlsProps {
  activeSync: boolean
  onToggleSync: () => void
  onProgressUpdate: (progress: number) => void
}

export function SyncControls({ activeSync, onToggleSync, onProgressUpdate }: SyncControlsProps) {
  const [syncType, setSyncType] = useState("incremental")
  const [lastSync, setLastSync] = useState("2 hours ago")

  useEffect(() => {
    if (activeSync) {
      const interval = setInterval(() => {
        onProgressUpdate((prev) => {
          const newProgress = prev + Math.random() * 10
          if (newProgress >= 100) {
            onToggleSync()
            return 0
          }
          return Math.min(newProgress, 100)
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeSync, onToggleSync, onProgressUpdate])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Sync Controls
        </CardTitle>
        <CardDescription>Manage your synchronization operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Sync Type</label>
          <Select value={syncType} onValueChange={setSyncType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Sync</SelectItem>
              <SelectItem value="incremental">Incremental Sync</SelectItem>
              <SelectItem value="configuration">Configuration Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Button onClick={onToggleSync} className="w-full" disabled={activeSync}>
            {activeSync ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Sync
              </>
            )}
          </Button>

          <Button variant="outline" className="w-full" disabled={activeSync}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Sync
          </Button>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Sync</span>
            <Badge variant="outline">{lastSync}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={activeSync ? "default" : "secondary"}>{activeSync ? "Active" : "Idle"}</Badge>
          </div>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Quick Actions</span>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Sync Contacts Only
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Sync Deals Only
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Test Connection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
