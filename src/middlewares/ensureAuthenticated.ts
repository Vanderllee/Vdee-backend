import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //  Receber o token

    const tokenWithBarer = request.headers.authorization;

    
   const [, token] = tokenWithBarer.split(" ");
   
   try {
       // Validar se o token é válido
        const { sub } = verify(token, "fafe282123dac85961d456b42807865c") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub
     

         return next();
         
   } catch (_) {
    return response.status(401).end();    
   }
   
    




}

export { ensureAuthenticated };

