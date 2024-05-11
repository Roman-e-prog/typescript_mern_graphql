import React,{useState, createContext,ReactNode} from 'react'

interface LanguageTheme{
    language:string,
    toggle?:(event: React.ChangeEvent<HTMLSelectElement>) => void,
}
interface ProviderProps{
    children:ReactNode
}
export const LanguageContext = createContext<LanguageTheme | null>(null)
const LanguageProvider = ({children}:ProviderProps) => {
    const [language, setLanguage] = useState("Sprache");
    
    const toggle = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setLanguage(event.target.value)
    }
    console.log(language)
  return (
    <LanguageContext.Provider value={{language, toggle}}>
       <div>{children}</div>
    </LanguageContext.Provider>
  )
}

export default LanguageProvider