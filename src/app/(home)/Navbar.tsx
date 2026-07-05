import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex items-center gap-3 shrink-0 pr-6">
        <Link href='/'>
          <Image src="/logo.svg" height={36} width={36} alt="Logo"/>
        </Link>
        <h3 className="text-xl font-bold">DocFlow</h3>
      </div>
      <SearchInput />
      <div />
    </nav>
  )
}