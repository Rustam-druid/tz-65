export interface IPagesApp {
  id:string;
  title:string;
  Content:string;

}
export interface IPagesAppMutation {
  title:string;
  Content:string;
  category:string;
}
export type ApiPage = Omit<IPagesAppMutation , 'id'>