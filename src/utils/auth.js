export function logIn(email) {
    localStorage.setItem('boardbid_user', email);
  }
  
  export function logOut() {
    localStorage.removeItem('boardbid_user');
  }
  
  export function isLoggedIn() {
    return !!localStorage.getItem('boardbid_user');
  }
  
  export function getLoggedInUser() {
    return localStorage.getItem('boardbid_user') || null;
  }
  