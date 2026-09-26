"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei/core/Float"
import { MeshTransmissionMaterial } from "@react-three/drei/core/MeshTransmissionMaterial"
import { Environment } from "@react-three/drei/core/Environment"
import * as THREE from "three"
import Link from "next/link"

// Suppress THREE.Clock deprecation warning from R3F until it updates internally
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
    originalWarn(...args);
  };
}

// A sleek, premium crystalline structure for the hero visual
function PremiumCrystal() {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (meshRef.current && !prefersReducedMotion) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x += delta * 0.05
    }
  })

  return (
    <Float 
      speed={prefersReducedMotion ? 0 : 1.5} 
      rotationIntensity={prefersReducedMotion ? 0 : 0.5} 
      floatIntensity={prefersReducedMotion ? 0 : 0.5}
    >
      <mesh ref={meshRef} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
          color="#151221" // Dark base matching theme
          attenuationColor="#FF4D6D" // Primary accent color reflection
          attenuationDistance={1}
          metalness={0.2}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        {/* Wireframe overlay for a technical/precise look */}
        <mesh>
          <octahedronGeometry args={[1.001, 0]} />
          <meshBasicMaterial color="#FF4D6D" wireframe transparent opacity={0.15} />
        </mesh>
      </mesh>
    </Float>
  )
}

// Fallback for mobile or reduced motion environments
function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute w-64 h-64 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-48 h-48 border border-primary/40 rounded-full rotate-45" />
      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30 backdrop-blur-sm rotate-12" />
    </div>
  )
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Stagger variants for entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Smooth elegant ease
    }
  }

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32 border-b border-border">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                E-Cell League · Season 1 · One Day Event
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              IT&apos;S NOT JUST<br/> A LEAGUE.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">A LAUNCH PAD.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-text-secondary max-w-[500px] leading-relaxed">
              Five tracks. Twelve teams. One championship. E-Cells compete in parallel across the toughest entrepreneurship challenges — all on a single day.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link href="/passes">
                <Button size="lg" className="text-base h-12 px-8 transition-transform hover:scale-105 active:scale-95 duration-200">
                  Register Your Team
                </Button>
              </Link>
              <Link href="/league">
                <Button size="lg" variant="outline" className="text-base h-12 px-8 transition-transform hover:scale-105 active:scale-95 duration-200">
                  View League Rules
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-12 border-t border-border mt-8">
              <div>
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-xs text-text-secondary uppercase tracking-wider mt-1">Tracks</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-xs text-text-secondary uppercase tracking-wider mt-1">Teams Only</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">₹50K</p>
                <p className="text-xs text-text-secondary uppercase tracking-wider mt-1">Prize Pool</p>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="h-[400px] lg:h-[600px] w-full relative">
            {isMounted && (
              isMobile ? (
                <StaticFallback />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="w-full h-full"
                >
                  <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#FF4D6D" />
                    <PremiumCrystal />
                  </Canvas>
                </motion.div>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
