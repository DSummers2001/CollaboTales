import jwt  from 'jwt-encode';

function generateToken(id) {

    const JWT_SECRET = "CollaboTalesSuperSecretRecipe";
    console.log(jwt);
    return jwt({ id }, JWT_SECRET,{
        expiresIn: "30d",
    });
}

export default generateToken;