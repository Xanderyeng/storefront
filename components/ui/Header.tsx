"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "../layout/Theme-Toggle";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { CartButton } from "@/components/cart/CartButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { items } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <span className='font-bold sm:inline-block'>Storefront</span>
          </Link>
          <nav className='hidden md:flex items-center space-x-6 text-sm font-medium'>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='transition-colors hover:text-primary'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <CartButton />
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Menu'
                className='md:hidden'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through our store</SheetDescription>
              </SheetHeader>
              <nav className='mt-6 flex flex-col space-y-4'>
                <AnimatePresence>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className='block py-2 text-lg font-medium transition-colors hover:text-primary'
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
