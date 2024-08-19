"use client"
import ButtonStack from '@/components/ButtonStack';
import Spline from '@splinetool/react-spline';
import React from 'react'



export default function Dashboard() {
  return (
    <main className="full-screen">
    <ButtonStack />

    <Spline
      scene="https://prod.spline.design/8ZXQ2mDwmV9ToAIF/scene.splinecode"
      
    />
  </main>
  )
}
