import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

//Repositorios para os metodos, os nossos ou herdados...
@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag> {}

export { TagsRepositories };