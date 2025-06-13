"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react"

export function SyncLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [logLevel, setLogLevel] = useState("all")

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      level: "info",
      message: "Starting incremental sync for Contacts",
      details: "Processing 1,234 records",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:30:30",
      level: "success",
      message: "Successfully synced 1,200 contacts",
      details: "34 records skipped due to validation errors",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:31:15",
      level: "warning",
      message: "Rate limit approaching for API calls",
      details: "Current usage: 85% of daily limit",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:32:00",
      level: "error",
      message: "Failed to sync Deal ID: 12345",
      details: "Invalid property value for 'amount' field",
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:32:30",
      level: "info",
      message: "Sync completed successfully",
      details: "Total processed: 1,234 | Success: 1,200 | Errors: 34",
    },
    {
      id: 6,
      timestamp: "2024-01-15 13:15:10",
      level: "info",
      message: "Starting full sync for Companies",
      details: "Processing 2,891 records",
    },
    {
      id: 7,
      timestamp: "2024-01-15 13:45:22",
      level: "success",
      message: "Full sync completed for Companies",
      details: "All 2,891 records processed successfully",
    },
    {
      id: 8,
      timestamp: "2024-01-15 12:00:00",
      level: "error",
      message: "Authentication failed",
      details: "Invalid API key or expired token",
    },
  ]

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-blue-500" />
    }
  }

  const getLogBadgeVariant = (level: string) => {
    switch (level) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "outline"
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = logLevel === "all" || log.level === logLevel
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sync Logs</CardTitle>
          <CardDescription>View detailed logs of all synchronization activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <ScrollArea className="h-[600px] border rounded-lg">
            <div className="p-4 space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50">
                  <div className="mt-0.5">{getLogIcon(log.level)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getLogBadgeVariant(log.level)} className="text-xs">
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="font-medium text-sm">{log.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
