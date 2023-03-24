import { cmsSections } from "../../components/cmsSection"
import { getCMSContent } from "./CMSProvider"

export function CMSSectionRender({pageName}){
    const sections = getCMSContent(`${pageName}.pageContent[0].section`)
    return sections.map((sectionsProps) => {
        const Component = cmsSections[sectionsProps.componentName];
        return (
            <Component key={sectionsProps.id} {...sectionsProps}/>
        )
    })
}