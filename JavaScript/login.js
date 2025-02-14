// /************************************************************************************* */
// /**login page */
// /************************************************************************************* */
// fetch("https://dummyjson.com/users")
//   .then((response) => response.json())
//   .then((data) => {
//     const login_page = document.getElementById("login_page");
//     login_page.addEventListener('submit',(event)=>{
//         event.preventDefault();
//         const usernameInput = document.getElementById("username").value;
//         const passwordInput = document.getElementById("password").value;

//         // var user = null ;
//         // data.users.forEach(function(u) {
//         //     if(u.username===usernameInput &&u.password===passwordInput ){
//         //         user=u;
//         //     }
//         // });

//         var user=null;
//         for(var i =0 ; i<data.users.length;i++){
//             if(
//                 data.users[i].username===usernameInput 
//                 && data.users[i].password===passwordInput ){
//                 user=data.users[i];
//                 break;
//             }
//         }
//         if(user){
//             alert(`welcome ${user.username}`);
//             setTimeout(()=>{
//                 window.location.href="index.html";

//             } ,100 )

//         }else{
//             alert("Invalid username or password!");

//         }
        
//     })

//   })
// .catch(function(error){
//     console.error("Error fetching users:", error);
// });

fetch("https://dummyjson.com/users")
  .then((response) => response.json())
  .then((data) => {
    const login_page = document.getElementById("login_page");
    const errorMessage = document.getElementById("error-message");

    login_page.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        let user = null;
        for (let i = 0; i < data.users.length; i++) {
            if (
                data.users[i].username === usernameInput && 
                data.users[i].password === passwordInput
            ) {
                user = data.users[i];
                break;
            }
        }

        if (user) {
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 100);
        } else {
            errorMessage.textContent = "Invalid username or password!"; 
            errorMessage.style.display = "block"; 
        }
    });
  })
  .catch(function (error) {
    console.error("Error fetching users:", error);
  });
