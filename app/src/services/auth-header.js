//Define the authorization needed to access a resource
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  //If the user is defined and has an accessToken
  if (user && user.accessToken) {
    //Return header format
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
