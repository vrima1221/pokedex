
export interface PokemonLink {
  id: string,
  "name": string,
  "url": string,
  imgUrl: string,
}

export interface PokemonListResponse {
  "count": number,
  "next": string,
  "previous": string,
  "results": PokemonLink[]
}
