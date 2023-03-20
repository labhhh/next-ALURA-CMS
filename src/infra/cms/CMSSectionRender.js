import { getCMSContext } from "./CMSProvider"

export function CMSSectionRender({pageName}){
    const sections = getCMSContext(`${pageName}.pageContent[0].section`)
    return(
        'a'
    )
}