import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


type IAuthenticateRequest = {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories)

        // Verificar se o email existe no banco de dados
            const user = await usersRepositories.findOne({
                email
            });

            if(!user) {
                throw new Error("Email/Password incorrect!")
            }

        // Verificar se a senha está correta
            const passwordMatch = await compare(password, user.password)

            if(!passwordMatch) {
                throw new Error ("Email/Password incorrect!")
            }

        // Gerar o token
            const token = sign(
                {email: user.email,}, 
                "fafe282123dac85961d456b42807865c",
                {subject: user.id, expiresIn: "1d"}
            )

        return token;

    }
}

export { AuthenticateUserService };