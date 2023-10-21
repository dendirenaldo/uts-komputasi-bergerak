import { createContext, useState } from 'react'
import Data from '../Data'
const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [routeParam, setRouteParam] = useState('fasilkom')
    const [data, setData] = useState(Data)
    return (
        <AppContext.Provider value={{ routeParam, setRouteParam, data, setData }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;