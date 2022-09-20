import {PostDto} from "../postsService/posts.dto";

export interface CategoryDto {
  id: number;
  title: string;
  featured: boolean;
  description: string;
  prettyDescriptor: string;
  posts: PostDto[];
}
