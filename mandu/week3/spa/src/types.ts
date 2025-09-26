import type { ComponentType, ReactNode } from "react";

export interface LinkProps{
    to:string,
    children:ReactNode,
}

export interface RouteProps{
    children: React.ReactNode;
    currentPath: string;
}