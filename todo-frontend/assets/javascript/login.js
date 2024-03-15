const Login = (event) => {
    event.preventDefault();
    const correctName = "AdminSEF123";
    const correctPass = "SeF@ctORy$$456";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let hiddenMsg = document.getElementById("hiddenMsg");
    let hiddenLoading= document.getElementById("hidden-loading");
    if (username == correctName && password == correctPass) {
      // if login success
      // go to todo page
      hiddenMsg.style.display = "block";
      hiddenMsg.style.color= "green";
      hiddenMsg.style.border= "1px solid green";
      hiddenMsg.style.backgroundColor= "#0080003d";
      hiddenMsg.innerHTML = "Logging you in!";
      hiddenLoading.style.display = "block";
      
      //timeout the login to "gimmick for taking from db and seeing the gif"
      
      setTimeout(()=>{
          window.location = "http://127.0.0.1:5500/index.html";
      },2000);
  
     
      return;
    }
    // if wrong
    hiddenMsg.style.display = "block";
  };
  