import {CategoryDto} from "../categoriesService/categories.dto";
import {UserDto} from "../usersService/user.dto";

export interface PostDto{
  id: number;
  category: CategoryDto;
  title: string;
  featuredImageUrl: string;
  content: string;
  author: UserDto;
  //requiredSubscription: number;
  date: Date;
}
