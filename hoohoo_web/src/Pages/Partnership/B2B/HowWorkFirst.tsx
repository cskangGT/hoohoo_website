import React from 'react'
import HowDoesItWork from './HowDoesItWork'

export default function HowWorkFirst() {
    const data = {
        "upperText": "How Does it Work?",
        "number": "#1",
        "header":  "Create missions for participants to engage in.",
        "content" : "Enter the organizer's event code to check in, set the date, and create missions.",
        "image": "Images/ticketeer3Image.png",
        "tailText" : "Colsulting on setting up missions with EarthMera."
    }
  return (
    <HowDoesItWork data={data}></HowDoesItWork>
  )
}
