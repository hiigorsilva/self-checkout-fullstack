'use client'

type ProvidersProps = {
  children: React.ReactNode
}

export const RootProviders = ({ children }: ProvidersProps) => {
  return <>{children}</>
}
