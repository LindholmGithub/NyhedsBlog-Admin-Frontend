export interface PostCreateDto{
  categoryId: number;
  title: string;
  prettyDescriptor: string;
  featuredImageUrl: string;
  content: string;
  authorId: number;
  date: Date;
  paid: boolean;
  price: number;
}
