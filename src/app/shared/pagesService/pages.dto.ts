import {UserDto} from "../usersService/user.dto";

export interface PageDto{
  id: number;
  title: string;
  prettyDescriptor: string;
  content: string;
  author: UserDto;
  authorId: number;
  date: Date;
}
