import {useState} from 'react'
import ThemeContent from "./ThemeContent";
import Navbar from "./Navbar";
import { ThemeProvider } from '../context/ThemeProvider';

export default function ContextPage() {
    return (
    <div>
        <ThemeProvider>
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <Navbar />
                <main className='flex-1 w-full'>
                    <ThemeContent />
                </main>
            </div>
        </ThemeProvider>
    </div>
    )
}