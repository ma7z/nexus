import Image from "next/image";

type NexusLogoProps = {
  className?: string
}

export function NexusLogo({ className }: NexusLogoProps) {
  return (
    <div className={`flex flex-col w-full h-fit  pb-4 ${className ?? ""}`}>
      <div className="flex items-center">
        <Image
          src="/nexus.svg"
          alt="Nexus"
          width={24}
          height={24}
          priority
        />

        <h1 className="flex text-xl font-semibold leading-none tracking-tight">
          Nexus
          <span className="ml-0.5 text-[10px] font-light align-top">
            ™
          </span>
        </h1>
      </div>

   
    </div>
  )
}