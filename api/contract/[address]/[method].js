import { getProvider } from "../../../lib/network";
import pollyABI from '../../../abis/Polly.json';
import { ethers } from "ethers";
import ABIAPI from "../../../lib/ABIAPI";

const abi = new ABIAPI(pollyABI);
abi.supportedMethods = abi.getReadMethods();
abi.cacheTTL = 60*60;
abi.setMethodCacheTTL('getModule', 60*60*24*365);

export default async (req, res) => {

    const data = {};
    const {address, method, ...query} = req.query;

    if(abi.supportsMethod(method)){

        const provider = getProvider();
        const contract  = new ethers.Contract(address, pollyABI, provider);
        
        try {
            data.result = await contract[method](...abi.methodParamsFromQuery(method, query));
        }
        catch(e){
            data.error = e.toString();
        }

    }
    else{
        
        data.error = 'Unsupported contract or contract method';
    }

    
    const status = data.error ? 400 : 200;

    if(status == 200)
        res.setHeader(`Cache-Control`, `s-maxage=${abi.getMethodCacheTTL(method)}, stale-while-revalidate`)

    res.status(status).json(data);


}