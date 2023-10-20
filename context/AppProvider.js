import { createContext, useState } from 'react'

const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [routeParam, setRouteParam] = useState('fasilkom')
    return (
        <AppContext.Provider value={{ routeParam, setRouteParam }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;