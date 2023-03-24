import Head from "next/head";

function SeoBlock(props) {
  return (
    <Head>
		<title>{props.title}</title>
    </Head>
  )
}

export default SeoBlock;