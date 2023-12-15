export default function authHeader(){
    const user=JSON.parse(localStorage.getItem('user'));
    // console.log("AuthHeader "+user)
    if(user){
        // console.log("Inside if of auth header");
        return { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Authorization' : `Bearer ${user}`};

    } else{
        return {};
    }
}
