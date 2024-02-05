import React from 'react'
import HowDoesItWork from './HowDoesItWork'

export default function HowWorkSecond() {
    const data = {
        "upperText": "How Does it Work?",
        "number": "#2",
        "header":  "Participants check-in and engage in missions.",
        "content" : "Participants check in with their own event code from their ticket or mobile ticket and engage in missions.",
        "image": "Images/ticketeer5Image.png",
        "tailText" : "EM bag is mailed with a festival ticket."
    }
  return (
    <HowDoesItWork data={data}></HowDoesItWork>
  )
}
