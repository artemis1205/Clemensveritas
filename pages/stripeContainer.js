import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./paymentForm"

const PUBLIC_KEY = "pk_live_51KA0UmIxrCLGcFjg6HAlbD7gLHHKsZYhpRgsAY2SgeeaPeBI8f3yt3jl9LImcgr76QrW2AKoPxmihwxNjyitnn3L00bHqHwLdD"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}