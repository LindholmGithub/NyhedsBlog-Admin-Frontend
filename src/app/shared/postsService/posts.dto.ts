import {CategoryDto} from "../categoriesService/categories.dto";
import {UserDto} from "../usersService/user.dto";

export interface PostDto{
  id: number;
  category: CategoryDto;
  categoryId: number;
  title: string;
  prettyDescriptor: string;
  featuredImageUrl: string;
  content: string;
  author: UserDto;
  authorId: number;
  requiredSubscription: number;
  date: Date;
}
