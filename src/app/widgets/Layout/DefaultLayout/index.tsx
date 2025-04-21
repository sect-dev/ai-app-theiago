import React from "react"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="font-bai-jamjuree h-[100svh] overflow-hidden">
      {children}
    </main>
  )
}

export default DefaultLayout