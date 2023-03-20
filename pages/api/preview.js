export default async function handler(req, res){
    const page = req.headers.referer;

    if(req.preview){
        res.clearPreviewData();
        res.writeHead(307, {Location: page});
        return res.end();
    }

    res.setPreviewData({});
    res.writeHead(307, {Location: page});
    res.end();
}