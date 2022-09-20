import { Pipe, PipeTransform } from '@angular/core';
import { PostDto } from "../../../shared/postsService/posts.dto";
import {PostSortingModel} from "./posts-read.component";

@Pipe({ name: 'post' })
export class PostsPipe implements PipeTransform {
  transform(values: PostSortingModel[], filter: string): PostSortingModel[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    // @ts-ignore
    return values.filter((value: PostSortingModel) => {
      const nameFound =
        value.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const authorNameFound =
        (value.authorName).toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (nameFound || authorNameFound) {
        return value;
      }
    });
  }
}
