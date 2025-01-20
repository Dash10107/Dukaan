import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAProducts } from "../features/product/productSlice"
import { toast } from "react-toastify"
import { Heart, Minus, Plus, Share2 } from "lucide-react"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [color, setColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [alreadyAdded, setAlreadyAdded] = useState(false)

  const { singleProduct, isLoading, isError, message } = useSelector((state) => state.product)
  const cart = useSelector((state) => state.product.cart)

  useEffect(() => {
    if (id) {
      dispatch(getAProducts(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (cart?.find((item) => item.productId?._id === singleProduct?._id)) {
      setAlreadyAdded(true)
    }
  }, [cart, singleProduct])

  const handleAddToCart = () => {
    if (alreadyAdded) {
      navigate("/cart")
      return
    }

    if (quantity <= 0) {
      toast.warning("Please choose a valid quantity.")
      return
    }

    if (!color) {
      toast.warning("Please choose a color.")
      return
    }

    const item = {
      productId: singleProduct._id,
      quantity,
      color,
      price: singleProduct.price,
    }

    toast.success("Item added to cart!")
    setAlreadyAdded(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading product...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{message || "An error occurred"}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-3xl font-semibold py-6">Product Page</p>
      {singleProduct ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="relative aspect-square">
                <img
                  src={
                    singleProduct?.images?.length > 0
                      ? singleProduct.images[selectedImage].url
                      : "https://via.placeholder.com/600"
                  }
                  alt={singleProduct?.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex gap-4 overflow-auto pb-2">
              {singleProduct?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden
                    ${selectedImage === index ? "border-blue-600" : "border-transparent"}`}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{singleProduct?.title}</h1>
              <p className="text-2xl font-semibold mt-2">${singleProduct?.price}</p>
            </div>

            <hr className="border-t border-gray-200" />

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Select Color</h3>
                <div className="flex gap-2">
                  {singleProduct?.color?.map((c, index) => (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={c}
                        checked={color === c}
                        onChange={(e) => setColor(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-full ${color === c ? "ring-2 ring-blue-600 ring-offset-2" : ""}`}
                        style={{ backgroundColor: c }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className={`flex-1 h-12 px-6 rounded-lg text-white font-medium ${
                  alreadyAdded ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleAddToCart}
                disabled={alreadyAdded}
              >
                {alreadyAdded ? "Go to Cart" : "Add to Cart"}
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100">
                <Heart className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <hr className="border-t border-gray-200" />

            <div className="space-y-4">
            <div>
  <h3 className="font-medium">Description</h3>
  <p
    className="text-gray-600 mt-2"
    dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
  />
</div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand</span>
                  <span>{singleProduct?.brand || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span>{singleProduct?.category || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span>{singleProduct?.type || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Product not found</div>
        </div>
      )}
    </div>
  )
}

