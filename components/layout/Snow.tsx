"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Snowfall from 'react-snowfall'

export default function Snow() {
  const [windRange, setWindRange] = useState<[number, number]>([0.1, 2.0]) // Start with gentle wind
  const [snowflakeCount, setSnowflakeCount] = useState(200) // Start with default count
  
  const adjustSnowflakeCount = useCallback((windMax: number) => {
    // Base count range
    const minCount = 100
    const maxCount = 400
    
    // Calculate new count based on wind intensity
    const windFactor = (windMax - 0.1) / (8.0 - 0.1) // Normalize wind to 0-1 range
    const newCount = Math.round(minCount + (maxCount - minCount) * windFactor)
    
    // Add some randomness
    const randomFactor = Math.random() * 50 - 25 // +/- 25
    
    setSnowflakeCount(Math.max(minCount, Math.min(maxCount, newCount + randomFactor)))
  }, [])

  useEffect(() => {
    // Function to create a wind gust
    const createGust = async () => {
      // Suddenly increase wind
      const newWindMax = 2.0 + Math.random() * 6.0 // Random max between 2.0 and 8.0
      setWindRange([2.0, newWindMax])
      adjustSnowflakeCount(newWindMax)
      
      // Wait for 3-4 seconds (random duration)
      const gustDuration = 3000 + Math.random() * 1000
      await new Promise(resolve => setTimeout(resolve, gustDuration))
      
      // Gradually return to calm
      const calmWindMax = 0.2 + Math.random() * 1.8 // Random max between 0.2 and 2.0
      setWindRange([0.1, calmWindMax])
      adjustSnowflakeCount(calmWindMax)
    }

    // Thought it would be nice to create wind gusts at random intervals between 10-20 seconds
    const scheduleNextGust = () => {
      // And add a Random delay of between 10-20 seconds
      const nextGustDelay = 10000 + Math.random() * 10000 
      setTimeout(() => {
        createGust().then(scheduleNextGust)
      }, nextGustDelay)
    }

    // Start the gust cycle
    scheduleNextGust()

    // Initial snowflake count adjustment
    adjustSnowflakeCount(windRange[1])

    // Cleanup
    return () => {
      // The timeouts will be automatically cleared when the component unmounts
    }
  }, [adjustSnowflakeCount])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Snowfall 
        wind={windRange}
        snowflakeCount={snowflakeCount}
        radius={[0.5, 2.0]}
        speed={[1.0, 3.0]}
        changeFrequency={50}
        opacity={[0.6, 1]}
      />
    </div>
  )
}

