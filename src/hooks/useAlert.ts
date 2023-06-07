import { useContext } from 'react'
import { AlertContext } from '../contexts/AlertContext'

export default function useAlert() {
    const context = useContext(AlertContext)
    
    return context
}