"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, ShoppingBag, Gift, Clock, Zap, ChevronRight } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Slider } from "../components/ui/slider"
import { Progress } from "../components/ui/progress"

// Category options with icons
const categories = [
  { id: "electronics", label: "Electronics", icon: <Zap className="h-5 w-5" /> },
  { id: "fashion", label: "Fashion", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "grocery", label: "Grocery", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "beauty", label: "Beauty", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "home", label: "Home & Kitchen", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "toys", label: "Toys & Games", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "books", label: "Books", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: "sports", label: "Sports", icon: <ShoppingBag className="h-5 w-5" /> },
]

// Shopping intent options
const shoppingIntents = [
  { id: "browsing", label: "Casual Browsing", description: "Just looking around" },
  { id: "buying", label: "Ready to Buy", description: "I know what I want" },
  { id: "gifting", label: "Gift Shopping", description: "Looking for presents" },
  { id: "urgent", label: "Urgent Needs", description: "Need it ASAP" },
]

// Budget ranges
const budgetRanges = [
  { min: 0, max: 500, label: "₹0 - ₹500" },
  { min: 500, max: 2000, label: "₹500 - ₹2000" },
  { min: 2000, max: 10000, label: "₹2000+" },
]

// Mock Gemini AI function to determine persona
const determinePersona = (preferences) => {
  const { categories, intent, budget } = preferences

  if (intent === "gifting") {
    return "Gifter"
  } else if (budget < 1000) {
    return "Budget Shopper"
  } else if (categories.includes("fashion") || categories.includes("beauty")) {
    return "Trend Hunter"
  } else if (intent === "urgent") {
    return "Convenience Seeker"
  } else {
    return "Explorer"
  }
}

export default function UserPreferences() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33)
  const [preferences, setPreferences] = useState({
    categories: [],
    intent: "browsing",
    budget: 1000,
    location: "",
  })

  const handleCategoryChange = (category) => {
    setPreferences((prev) => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return { ...prev, categories: updatedCategories }
    })
  }

  const handleIntentChange = (value) => {
    setPreferences((prev) => ({ ...prev, intent: value }))
  }

  const handleBudgetChange = (value) => {
    setPreferences((prev) => ({ ...prev, budget: value[0] }))
  }

  const handleLocationChange = (e) => {
    setPreferences((prev) => ({ ...prev, location: e.target.value }))
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
      setProgress(step === 1 ? 66 : 100)
    } else {
      // Save to localStorage
      const persona = determinePersona(preferences)
      localStorage.setItem(
        "userPreferences",
        JSON.stringify({
          ...preferences,
          persona,
        }),
      )

      // Navigate to landing page
      navigate("/home")
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress(step === 3 ? 66 : 33)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ONDC Discovery</h1>
          <Button variant="ghost" onClick={() => router.push("/landing")}>
            Skip
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">Tell us what you like</h2>
          <p className="text-gray-500 text-center">Help us personalize your shopping experience</p>

          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Preferences</span>
              <span>Shopping Style</span>
              <span>Almost Done</span>
            </div>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">What are you interested in?</h3>
                <p className="text-gray-500 mb-6">Select categories that interest you the most</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          preferences.categories.includes(category.id)
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-full bg-gray-100">{category.icon}</div>
                          <span>{category.label}</span>
                        </div>
                        {preferences.categories.includes(category.id) && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-gray-900 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">What's your shopping style?</h3>
                <p className="text-gray-500 mb-6">Tell us how you prefer to shop</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Shopping Intent</h4>
                    <RadioGroup
                      value={preferences.intent}
                      onValueChange={handleIntentChange}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {shoppingIntents.map((intent) => (
                        <div key={intent.id} className="relative">
                          <RadioGroupItem value={intent.id} id={intent.id} className="peer sr-only" />
                          <Label
                            htmlFor={intent.id}
                            className="flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-gray-900 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                          >
                            <span className="font-medium">{intent.label}</span>
                            <span className="text-sm text-gray-500">{intent.description}</span>
                            {intent.id === "gifting" && (
                              <Gift className="h-4 w-4 text-gray-400 absolute top-4 right-4" />
                            )}
                            {intent.id === "urgent" && (
                              <Clock className="h-4 w-4 text-gray-400 absolute top-4 right-4" />
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Budget Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[preferences.budget]}
                        max={10000}
                        step={100}
                        onValueChange={handleBudgetChange}
                        className="mb-6"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>₹0</span>
                        <span>₹500</span>
                        <span>₹2000</span>
                        <span>₹10000+</span>
                      </div>
                      <div className="mt-4 text-center font-medium">Your budget: ₹{preferences.budget}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Almost there!</h3>
                <p className="text-gray-500 mb-6">Optional: Add your delivery preferences</p>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">
                      Delivery Location
                    </Label>
                    <input
                      id="location"
                      type="text"
                      placeholder="Enter your city or pincode"
                      value={preferences.location}
                      onChange={handleLocationChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="express" />
                      <Label htmlFor="express">Prefer express delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="eco" />
                      <Label htmlFor="eco">Prefer eco-friendly packaging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notifications" />
                      <Label htmlFor="notifications">Receive notifications about deals</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={nextStep} className="bg-gray-900 hover:bg-black">
            {step === 3 ? "Finish" : "Continue"} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
