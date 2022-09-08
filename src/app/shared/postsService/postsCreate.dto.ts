export interface PostCreateDto{
  categoryId: number;
  title: string;
  prettyDescriptor: string;
  featuredImageUrl: string;
  content: string;
  authorId: number;
  requiredSubscription: number;
  date: Date;
}
