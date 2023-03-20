import Head from 'next/head';
import { Menu } from '../../components/commons/Menu';
import { Footer } from '../../components/commons/Footer';
import { theme, Box, Button, Text, Image } from '../../theme/components';
import { cmsService } from '../../infra/cms/cmsService';
import { pageHOC } from '../../wrappers/pageHOC';

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
