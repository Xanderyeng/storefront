'use client'
import Link from 'next/link'
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" relative flex flex-col justify-center z-50 min-md:py-4 max-h-[15dvh] md:max-h-[8dvh] min-h-[6dvh] border-t border-border/40 bg-transparent ">
      <div className=" flex flex-col items-center w-full mx-auto justify-between gap-4 py-2 md:container md:h-full md:flex-row md:py-0 ">
        {/* EXTERNAL LINKS + REPO */}
      <div className="flex flex-col gap-4 px-8 justify-center md:flex-row md:gap-2 md:px-0 ">
        <nav className="flex flex-row justify-center items-center gap-4">
            <motion.a
              href="https://github.com/xanderyeng/storefront"
              target="_blank"
              aria-label="View source code on GitHub"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:cursor-pointer px-4 py-1 rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              View Source
            </motion.a>
            <Link
              href="mailto:alexander.chepkiyeng@spaceai.io"
              aria-label="Email Alexander Chepkiyeng"
              className="hover:text-primary hover:cursor-pointer transition-colors"
            >
              <FaEnvelope size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/alexander-chepkiyeng/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Alexander Chepkiyeng's LinkedIn profile"
              className="hover:text-primary hover:cursor-pointer transition-colors"
            >
              <FaLinkedin size={24} />
            </Link>
        </nav>
        </div>

        {/* My ByLine Tag */}
        <div className="flex flex-col max-sm:w-full items-center gap-2 px-2 md:flex-row md:gap-2 md:px-0 ">
          <p className="text-center space-x-4 text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://alexander-chepkiyeng.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Alexander Chepkiyeng
            </a>
            .&nbsp;
            <>
            Hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            .
            </>
          </p>
          <p className="text-xs md:text-sm md:mb-0">
            © {currentYear}
          </p>
        </div>
       
      </div>
    </footer>
  )
}

