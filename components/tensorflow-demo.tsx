"use client"

import { useState, useEffect } from "react"
import * as tf from "@tensorflow/tfjs"
import { Skeleton } from "@/components/ui/skeleton"

export function TensorFlowDemo() {
  const [loading, setLoading] = useState(true)
  const [prediction, setPrediction] = useState<number | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)

  useEffect(() => {
    async function loadModel() {
      try {
        // Create a simple model
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" })

        // Train the model with some dummy data
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

        await model.fit(xs, ys, { epochs: 100, verbose: 0 })

        // Make a prediction
        const result = model.predict(tf.tensor2d([5], [1, 1])) as tf.Tensor
        const predictedValue = await result.data()
        setPrediction(Number(predictedValue[0].toFixed(2)))
        setModelLoaded(true)
        setLoading(false)
      } catch (error) {
        console.error("Error loading TensorFlow model:", error)
        setLoading(false)
      }
    }

    loadModel()
  }, [])

  return (
    <div className="p-8 border rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4">TensorFlow.js Demo</h3>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <div>
          <p className="mb-4">This is a simple TensorFlow.js demo that predicts the next number in a sequence.</p>
          <p className="mb-4">
            Given the sequence [1, 3, 5, 7], the model predicts that the next number (for input 5) is:
          </p>
          <div className="bg-foreground/10 p-4 rounded-md inline-block">
            <span className="text-2xl font-bold">{prediction}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {modelLoaded
              ? "Model loaded and prediction made successfully!"
              : "There was an issue loading the TensorFlow model."}
          </p>
        </div>
      )}
    </div>
  )
}
