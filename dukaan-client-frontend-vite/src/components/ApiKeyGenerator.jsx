import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Alert, AlertDescription } from "./Alert"
import { base_url } from "../utils/axiosConfig"

export function ApiKeyGenerator() {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const generateApiKey = async () => {
    setIsLoading(true)
    setError("")
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      console.log(user,user.token)

      // Assume token is stored in localStorage
      const response = await fetch(`${base_url}/apikey/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (!response.ok) throw new Error("Failed to generate API key")
      const data = await response.json()
      setApiKey(data.apiKey)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate API Key</CardTitle>
      </CardHeader>
      <CardContent>
        <button type="button" onClick={generateApiKey} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate API Key"}
        </button>
        {apiKey && (
          <Alert className="mt-4">
            <AlertDescription>
              Your API Key: <code className="bg-muted p-1 rounded">{apiKey}</code>
              <br />
              Please copy and save this key securely. It will not be shown again.
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mt-4">
            <AlertDescription className="text-red-500">{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

