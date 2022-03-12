import pollyABI from '../../abis/Polly.json';
import { ethers } from "ethers";
import ABIAPI from 'abiapi';
import { getProvider } from "../../lib/network";

const abi = new ABIAPI(pollyABI);
abi.supportedMethods = abi.getReadMethods();
abi.cacheTTL = 60*60;

export default async (req, res) => {

    const data = {};
    const {method, ...query} = req.query;

    if(abi.supportsMethod(method)){
        
        try {

            const provider = getProvider();
            const polly = new ethers.Contract(process.env.POLLY_ADDRESS, pollyABI, provider);

            data.result = await contract[method](...abi.methodParamsFromQuery(method, query));

        }
        catch(e){
            data.error = e.toString();
        }

    }
    else{
        data.error = 'Unsupported method';
    }

    const status = data.error ? 400 : 200;

    if(status == 200)
        res.setHeader(`Cache-Control`, `s-maxage=${abi.getMethodCacheTTL(method)}, stale-while-revalidate`)

    res.status(status).json(data);


}