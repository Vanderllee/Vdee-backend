import { Request, Response } from "express";
import { CretateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
    async handle(request: Request, response: Response) {
        
        const {  
            tag_id,
            user_sender,
            user_receiver,
            message 
        } = request.body;

        const createComplimentService = new CretateComplimentService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        return response.json(compliment);
    }
}

export { CreateComplimentController }; 