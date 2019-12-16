var UserProfile = (function() {
    var full_name = "";
  
    var getName = function() {
      //return full_name;    // Or pull this from cookie/localStorage
      localStorage.getItem('isLoggedIn')
    };
  
    var setName = function(name) {
      //full_name = name;     
      // Also set this in cookie/localStorage
      localStorage.setItem('isLoggedIn', name)
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;