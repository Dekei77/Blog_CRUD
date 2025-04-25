export interface BlogPost {
    id: number;
    title: string;
    text: string;
    deleted: boolean;
  }
  
  export interface FakeApiPost {
    id: number;
    title: string;
    body: string;
    userId: number;
  }