export interface Moment {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  image: string;
  comments?: Array<Comment>;
}

export interface Comment {
  text: string;
  username: string;
}
