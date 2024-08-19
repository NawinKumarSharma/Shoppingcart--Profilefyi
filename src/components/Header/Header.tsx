import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { JSX, SVGProps } from "react";
import NavItems from "@/Data/NavItems";
import { ShoppingCart } from "lucide-react";
const MenuIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export default function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 bg-slate-500 items-center px-4 md:px-6 top-0 z-40 fixed py-3 backdrop-blur">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-row justify-between items-end gap-x-96">
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <Image
              src="/image.png"
              height={50}
              width={50}
              className="lg:hidden flex"
              alt="image"
            />
          </div>
        </SheetTrigger>
          <SheetContent side="left">
           <Link href="#" prefetch={false}>
              <Image src="/image.png" height={60} width={60} alt="image" />
            </Link>
            <div className="grid gap-10 py-6">
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex w-full items-center py-2 text-lg hover:text-slate-600 font-semibold"
                  prefetch={false}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/cart" className="right-0">
                <ShoppingCart size={32} />
              </Link>
           </div>
          </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image src="/image.png" height={60} width={60} alt="image" />
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="gap-8">
          {NavItems.map((item) => (
            <NavigationMenuLink key={item.href} asChild>
              <Link
                href={item.href}
                className="group inline-flex h-9 text-white w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                prefetch={false}
              >
                {item.name}
              </Link>
            </NavigationMenuLink>
          ))}
          <Link href="/cart">
            <ShoppingCart size={32} />
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
