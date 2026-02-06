import Image from "next/image"

type NexusLoadingProps = {
  className?: string
}

export function NexusLoading({ className }: NexusLoadingProps) {
  return (
    <Image
      src="/nexus.svg"
      alt="Nexus"
      width={40}
      height={40}
      priority
      className={`animate-spin ${className ?? ""}`}
    />
  )
}
