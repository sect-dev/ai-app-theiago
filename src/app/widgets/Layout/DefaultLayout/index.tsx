import React from "react"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="py-[20px] flex items-center justify-center h-[100dvh] sm:py-0">
      <div className="m-auto w-full max-w-[714px] max-h-[714px] h-full lg:w-[70.583vw] lg:h-[70.583vw] md:w-[80.583vw] md:h-[80.583vw] sm:w-full sm:max-h-[100svh] sm:h-[100svh]">
        {children}
      </div>
    </main>
  )
}

export default DefaultLayout