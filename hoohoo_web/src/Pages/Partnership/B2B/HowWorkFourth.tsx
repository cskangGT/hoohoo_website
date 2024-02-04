import React from 'react'
import HowDoesItWork from './HowDoesItWork'

export default function HowWorkFourth() {
    const data = {
        "upperText": "How Does it Work?",
        "number": "#4",
        "header":  "Receive data,<br />give rewards.",
        "content" : "Organizers get participants' eco-impact data and can reward them with early sign-up benefits or promo codes.",
        "image": "Images/ticketeer7Image.png",
        "tailText" : "Rewards include EarthMera points or other incentives determined with organizers, such as EarthMera coins, early sign-up benefits, or promo codes."
    }
  return (
    <HowDoesItWork data={data}></HowDoesItWork>
  )
}
