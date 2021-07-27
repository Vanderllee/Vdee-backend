import { TagsRepositories } from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";



class ListTagsService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositories.find();

        return tags;
    }
}

export { ListTagsService };