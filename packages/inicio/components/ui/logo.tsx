import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/inicio-logo.png"
        alt="Inicio Logo"
        width={60}
        height={60}
        className="mr-4"
      />
      <span className="text-2xl font-black" style={{ fontFamily: "var(--font-montserrat)" }}>
        Inicio
      </span>
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
