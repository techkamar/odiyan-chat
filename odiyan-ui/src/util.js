export async function doSecureHTTPFetchGET(url){
    let response = await fetch(url);
    if(response.status==401){
        window.location.href="/login";
    }
    return response;
}


export async function doSecureHTTPFetchPOST(url, headers, payload){
    let response = await fetch(url,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
    })
    
    if(response.status==401){
        window.location.href="/login";
    }
    return response;
}