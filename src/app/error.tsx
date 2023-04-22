"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error,
    reset: () => void,
}) {

        useEffect(() => {

            console.error(error)

        }, [error])

        return (
            <div>
                <h2>Uh oh, something went wrong!</h2>
                <button className="hover:border-red-650" onClick={() => reset()}>Try again</button>
            </div>
        )

}