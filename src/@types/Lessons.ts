import { LessonType } from "../graphql/generated";

export type LessonsArray = {
  lessons: { 
    __typename?: "Lesson" | undefined; 
    id: string; 
    slug: string; 
    title: string; 
    availableAt?: any; 
    lessonType: LessonType; 
  }[] | undefined;
}