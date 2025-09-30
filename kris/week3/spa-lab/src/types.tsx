import type { ReactNode } from "react"

export interface LinkProps {
  to: string
  children: ReactNode
  navigateTo: (to: string) => void;
}