import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

type IComplementsRequest = {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CretateComplimentService {    
    
    async execute({tag_id, user_sender, user_receiver, message}: IComplementsRequest) {
        
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const usersRepositories = getCustomRepository(UsersRepositories);

        // verificar se user_receiver e user_sender são iguais; se for, error!
        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver!")
        }

        //verificar se o user_receiver existe no db!
        const userReceiverExists = await usersRepositories.findOne(user_receiver);
        if(!userReceiverExists) {
            throw new Error("User_receiver does not exists!");
        }

        //criar um compliment para salvar no db!
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CretateComplimentService }