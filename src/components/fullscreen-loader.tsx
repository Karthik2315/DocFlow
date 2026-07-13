import { Loader } from "lucide-react"


interface FullScreenLoaderProps {
  label?:string
}

export const FullScreenLoader = ({label}:FullScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center  justify-center gap-2">
      <Loader className="size-6 text-muted-foreground animate-spin text-blue-600" />
      {label && <p className="text-sm text-muted-foreground text-blue-700">{label}</p>}
    </div>
  )
}