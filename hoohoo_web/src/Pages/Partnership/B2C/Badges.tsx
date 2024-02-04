import React from 'react'
import Community from './Community'

export default function Badges() {
    const data = {
        "header": "Instantly see your eco-action impact, earn badges.",
        "content": "See immediate environmental benefits through your eco-actions, earn badges, and check your environmental achievements for a more enjoyable way to protect our planet.",
        "lineImage": "Images/platform6pline.png",
        "image": "Images/platform4Image.png" 
    }
  return (
    <Community data={data} flip={false}></Community>
  )
}
