import {PostDto} from "../postsService/posts.dto";

export interface CategoryDto {
  id: number;
  title: string;
  description: string;
  prettyDescriptor: string;
  posts: PostDto[];
}
