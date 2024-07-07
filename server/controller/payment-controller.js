import formidable from 'formidable'
import { paytmParams, paytmMerchantkey } from '../index.js'
import PaytmChecksum from '../paytm/PaytmChecksum.js'
import https from 'https'

export const addPaymentGateway=async (request,response)=>{
  try{
    let paytmchecksum=await PaytmChecksum.generateSignature(paytmParams,paytmMerchantkey)
    let params={
      ...paytmParams,'CHECKSUMHASH':paytmchecksum
    }
    response.status(200).json(params)
  }
  catch(error){
    response.status(500).json({error:error.message})
  }
}

export const paytmResponse =(request,response)=>{
  const form= new formidable.IncomingForm();
  let paytmchecksum=request.body.CHECKSUMHASH;
  delete request.body.CHECKSUMHASH

  let isVerifySignature= PaytmChecksum.verifySignature(request.body,paytmMerchantkey,paytmchecksum);
  if(isVerifySignature){
    paytmParams={}
    paytmParams["MID"] = request.body.MID;
    paytmParams["ORDERID"] = request.body.ORDERID;
    PaytmChecksum.generateSignature(paytmParams,paytmMerchantkey).them(checksum=>{
      paytmParams["CHECKSUMHASH"] = checksum;
      const post_data = JSON.stringify(paytmParams);

      const options = {
        hostname: 'securegw-stage.paytm.in',
        port: 443,
        path: '/order/status',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
        }
      };

      let res = "";
      const post_req = https.request(options, function (post_res) {
        post_res.on('data', function (chunk) {
          res += chunk;
        });

        post_res.on('end', function () {
          let result = JSON.parse(res);
          console.log(result);
          response.redirect(`http://localhost:3000/`)
        });
      });
      post_req.write(post_data);
      post_req.end();
    })

  }
  else{
    console.log("Checksum mismatched");
  }
}