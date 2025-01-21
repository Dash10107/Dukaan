import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
}

export const generateProductDetails = async (title) => {
  const chat = model.startChat({
    generationConfig,
    history: [],
  })

  const prompt = `Given the product title "${title}", generate a JSON object with the following fields:
  - description: A detailed product description
  - price: A reasonable price for the product (number)
  - brand: A suitable brand name
  - category: A fitting category for the product
  - tags: An array of relevant tags (choose from: featured, popular, special)
  - color: An array of suitable colors for the product
  - quantity: A reasonable initial stock quantity (number)

  Ensure all fields are filled with appropriate values based on the product title.`

  try {
    const result = await chat.sendMessage(prompt)
    const response = result.response

    // Log the raw response for debugging
    console.log("Raw AI response:", response.text())

    // Attempt to parse the response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(response.text())
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      // Attempt to extract JSON from the response if it's not pure JSON
      const jsonMatch = response.text().match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Unable to extract valid JSON from AI response")
      }
    }

    // Validate the parsed response
    if (!parsedResponse || typeof parsedResponse !== "object") {
      throw new Error("Invalid AI response structure")
    }

    // Ensure all required fields are present
    const requiredFields = ["description", "price", "brand", "category", "tags", "color", "quantity"]
    for (const field of requiredFields) {
      if (!(field in parsedResponse)) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    return parsedResponse
  } catch (error) {
    console.error("Error generating product details:", error)
    throw error
  }
}