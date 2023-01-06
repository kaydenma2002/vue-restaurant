import { localStorageExport } from "../localStorage/local-storage"


export default ({ to, from, redirect }) => {
    var isAuthenticated = false;
    console.log(localStorageExport('jwtToken'))
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (localStorageExport('jwtToken'))
        isAuthenticated = true;
        
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        next(); // allow to enter route
    }
    else {
        next('/login'); // go to '/login';
    }
}