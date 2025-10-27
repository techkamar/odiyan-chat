export async function doSecureHTTPFetchGET(url){
    let response = await fetch(url);
    if(response.status==401){
        window.location.href="/login";
    }
    return response;
}