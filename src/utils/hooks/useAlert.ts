import { useContext } from 'react'
import { AlertContext } from '../contexts/AlertContext'

export default function useAlert() {
    const { alert, setAlert } = useContext(AlertContext)
    
    return { alert, setAlert }
}