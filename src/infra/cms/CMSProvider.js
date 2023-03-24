import React from "react";
import get from "lodash/get";

const CMSContext = React.createContext({
    cmsContent:{}
}) ;

export const getCMSContent = (path = '') => {
    const cmsContent = React.useContext(CMSContext).cmsContent;
    const output = get(cmsContent, path) 
    return output;
}

export default function CMSProvider({cmsContent, children}){
    return(
        <CMSContext.Provider value={{cmsContent}}>
            {children}
        </CMSContext.Provider>
    )
}