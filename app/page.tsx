"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"

import { Check } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Demographics from './sections/demographics'
import Children from './sections/children'
import CriminalHistory from './sections/criminal_history'
import HousingHistory from './sections/housing_history'
import Vehicles from './sections/vehicles'
import Health from './sections/health'
export default function Home() {

  const icon = null
  const activeIcon = <Check />

  const sections = [
    {
      title: "Demographics",
      id: "demographics",
      component: <Demographics />
    },
    {
      title: "Vehicles",
      id: "vehicles",
      component: <Vehicles />
    },
    {
      title: "Children",
      id: "children",
      component: <Children />
    },
    {
      title: "Criminal History",
      id: "criminalHistory",
      component: <CriminalHistory />
    },
    {
      title: "Housing History",
      id: "housingHistory",
      component: <HousingHistory />
    },
    {
      title: "Health",
      id: "health",
      component: <Health />
    },
    {
      title: "Review",
      id: "review",
      component: <Demographics />
    }
  ]

  const [activeSection, setActiveSection] = React.useState(sections[0].id)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image
                src="/afh-logo.png"
                alt="Advocates for Homeless Families Logo"
                width={48}
                height={48}
                className="flex-shrink-0"
              />
              <CardTitle className="text-xl sm:text-2xl">Advocates for Homeless Families, Inc.</CardTitle>
            </div>
            <CardDescription>Transitional housing application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-5 space-x-6">

              {sections.map((sec) => (
                <div key={sec.id} className="flex flex-col items-center space-y-2">
                  <Button onClick={() => setActiveSection(sec.id)} className={`w-10 h-10 rounded-full ${activeSection === sec.id ? "bg-green-100" : "bg-none"}`} variant="outline">
                    {activeSection === sec.id ? activeIcon : icon}
                  </Button>
                  <b className="text-xs text-center">{sec.title}</b>
                </div>
              ))}

            </div>
            <div className="flex justify-center p-5">
              {sections.find((sec) => sec.id === activeSection)?.component}
            </div>
            <div className="flex justify-end p-5 space-x-3">
              <Button className="w-25">Previous</Button>
              <Button className="w-25">Next</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
