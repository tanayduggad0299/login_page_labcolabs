/*index page
exports.index = (req, res, next) => {
    res.render('./index.html');
};
*/

//login page
exports.loginPage = (req, res, next) => {
    res.redirect('./log-in.html' );
  };

//sign up page
exports.signupPage = (req, res, next) =>{
    res.redirect('./sign-up.html' );
};

//sign up page call
exports.signup = (req, res, next) => {
    if(req.method === 'POST'){
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        connection.query("INSERT INTO accounts (name, email, password) VALUES ('" + name + "','" + email + "','" + password + "')", (error, results, fields) =>{
            res.redirect('./home.html' );
            console.log('Account created successfully!');

        });
    }
    else{
        res.redirect('./sign-up.html' );
        console.log('Account not created!!');
    }
};


//login page call
exports.login = (req, res, next) => {
    const session = req.session;
    if(req.method === "POST"){
        const email = req.body.email;
        const password = req.body.password;
        connection.query('select * from accounts where email = ? and password = ?', [email, password], (error, results, fields) => {
            if(results.length > 0){
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('./home.html' );
                console.log('successful login');
            }
            else{
                console.log('Wrong password!!');
                res.redirect('./log-in.html' );
            }
        });
    }
    else{
        console.log('Enter email and password');
        res.redirect('./log-in.html' );   
    }
};

//logout call
exports.logout = (req, res, next) =>{
    req.session.destroy((err)=>{
        if(!err){
            res.redirect('./log-in.html' );
            console.log('Logged out!!');
        }
        else
            console.log(err);
    });
};