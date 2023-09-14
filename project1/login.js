const logIn = {
    loginPage: function(){
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <div class="login-form">
                    <h1> Login Page</h1>
                    <form action="/login" method="post">
                    <div class="img-container">
                        <img src="/login.png" alt="Avatar" class="avatar">
                    </div>
                    <div class="container">
                        <label for="username">Username: </label>
                        <input type="text" id="username" name="username" value="" placeholder="Please enter the username only contains letter and number">
                    </div>
                    <button type="submit">Login</button>
                    </form>
                    <form action="/logout" method="post">
                    <button type="submit" class="logout-btn">Logout</button>
                    </form>          
                </div>
                </body>
            </html>
        `;
    },
    errorPage: function(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
           <p id="error">This username is invalid, please try another one!</p>
           ${logIn.loginPage()};
        </body>
        </html>
        `;
    },
    sidPage: function(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
           <p id="error">Invalid session id, please try again</p>
           ${logIn.loginPage()};
        </body>
        </html>
        `;
    }
}


module.exports = logIn;