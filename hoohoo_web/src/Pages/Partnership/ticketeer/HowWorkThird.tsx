import React from 'react'
import HowDoesItWork from './HowDoesItWork'

export default function HowWorkThird() {
    const data = {
        "upperText": "How Does it Work?",
        "number": "#3",
        "header":  "Verify eco-actions with EM bags.",
        "content" : "Our AI model, when capturing eco-actions with the 'EM bag', verifies them according to the mission.",
        "image": "Images/ticketeer6Image.png",
        "tailHeader": "EM bag: ",
        "tailText" : "Made from bio-based materials and designed with a QR code, these EM-bags are used by participants for clean-up, collecting trash efficiently."
    }
  return (
    <HowDoesItWork data={data}></HowDoesItWork>
  )
}
