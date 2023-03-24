import { cmsService } from '../../infra/cms/cmsService';
import { pageHOC } from '../../wrappers/pageHOC';
import { CMSSectionRender } from '../../infra/cms/CMSSectionRender';

export async function getStaticProps({preview}) {
  const {data} = await cmsService({
    query: `
      query{
        pageHome {
          pageContent{
            section{
              componentName: __typename
              ...on CommonSeoBlockRecord{
                id
                title
              }
              ...on CommonMenuRecord{
                id
              }
              ...on CommonFooterRecord{
                id
              }
              ...on PagehomeHerosectionRecord{
                id
                title
                description
                ctalink
                ctatext
              }
            }
          }
        }
      }
  `, isPreviewMode: preview});

  return {
    props: {
      cmsContent: data
    }
  }
}

function HomeScreen() {
  return(
    <CMSSectionRender pageName="pageHome"/>
  )
}

export default pageHOC(HomeScreen);
