export interface Champion {
    id: number;
    titulo: string;
    descripcion: string;
    url: string;
}
  
export interface ChampionsData {
    champions: Champion[];
}