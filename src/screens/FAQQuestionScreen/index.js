import Head from 'next/head';
import { Footer } from '../../components/commons/Footer';
import { Menu } from '../../components/commons/Menu';
import { cmsService } from '../../infra/cms/cmsService';
import { Box, Text, theme } from '../../theme/components';
import { renderNodeRule, StructuredText } from 'react-datocms';
import { isHeading } from 'datocms-structured-text-utils';
import React, { createElement } from 'react';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'f138c88d' } },
      { params: { id: 'h138c88d' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const contentQuery = `
    query{
      contentFaqQuestion{
        title
        content{
          value
        }
      }
    }
  `;

  const {data} = await cmsService({query: contentQuery});

  console.log(data)
  
  return {
    props: {
      cmsContent: data,
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    }
  }
}

export default function FAQQuestionScreen({ cmsContent }) {
  function ElementoNovo({ tag, props, children }) {
    return createElement(
      tag,
      {...props},
      children
    );
  }
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />
      
      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{ 
            flexDirection: 'column',
            width: '100%',
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: 'auto',
          }}
        >
          <Text tag="h1" variant="heading1">
            {cmsContent.contentFaqQuestion.title}
          </Text>

          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
          <StructuredText data={cmsContent.contentFaqQuestion.content} customNodeRules={[
            renderNodeRule(isHeading, ({node, children, key}) => {
             
              return(
                <ElementoNovo tag={`h${node.level}`} key={key}>
                  {children}
                </ElementoNovo>
              )
            })
          ]}/>
        </Box>
      </Box>

      <Footer description={cmsContent.globalContent.globalFooter.description}/>
    </>
  )
}
