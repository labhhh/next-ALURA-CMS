const TOKEN = '8efaad63ce95b1f59a8fc57b4659b1';

const globalQuery = `
    query{
        globalFooter{
            description
        }
    }
`;

const BASE_URL_ENDPOINT = 'https://graphql.datocms.com';
const PREVIEW_URL = BASE_URL_ENDPOINT + '/preview'

export async function cmsService({query, isPreviewMode}){

    const ENDPOINT_URL = isPreviewMode ? PREVIEW_URL : BASE_URL_ENDPOINT;  
    
    try{
        const pageContentResponse = await fetch(ENDPOINT_URL,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body:JSON.stringify({
                query
            })
        })
        .then(async (respostaDoServidor) => {
            const body = await respostaDoServidor.json();
            if(!body.errors) return body;

            throw new Error(JSON.stringify(body));
        })

        const globalContentResponse = await fetch('https://graphql.datocms.com/',{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body:JSON.stringify({
                query: globalQuery
            })
        })
        .then(async (respostaDoServidor) => {
            const body = await respostaDoServidor.json();
            if(!body.errors) return body;

            throw new Error(JSON.stringify(body));
        })

        return{
            data: {
                ...pageContentResponse.data,
                globalContent:{
                    ...globalContentResponse.data
                }
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
}