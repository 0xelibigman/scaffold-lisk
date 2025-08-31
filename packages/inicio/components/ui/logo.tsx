import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/inicio-logo.png"
        alt="Inicio Logo"
        width={100}
        height={100}
        className="mr-4"
      />
  
    </div>
  )
}

export function LogoSymbol() {
  return (
    <Image
      src="/inicio-logo.png"
      alt="Inicio Logo"
      width={32}
      height={32}
      className="flex-shrink-0"
    />
  )
}
