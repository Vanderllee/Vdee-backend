import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

 async function ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction
) 
{
    const { user_id } = request;


    const usersRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRepositories.findOne(user_id);

    console.log(admin);

    
    // verificar se o usuário é admin

    if(admin) {
       return next();
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
}

export { ensureAdmin };