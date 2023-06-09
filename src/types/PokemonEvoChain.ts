export interface PokemonEvoChain {
  "baby_trigger_item": null,
  "chain": {
      "evolution_details": [],
      "evolves_to": [
          {
              "evolution_details": [
                  {
                      "gender": null,
                      "held_item": null,
                      "item": {
                          "name": "water-stone",
                          "url": "https://pokeapi.co/api/v2/item/84/"
                      },
                      "known_move": null,
                      "known_move_type": null,
                      "location": null,
                      "min_affection": null,
                      "min_beauty": null,
                      "min_happiness": null,
                      "min_level": null,
                      "needs_overworld_rain": false,
                      "party_species": null,
                      "party_type": null,
                      "relative_physical_stats": null,
                      "time_of_day": string,
                      "trade_species": null,
                      "trigger": {
                          "name": string,
                          "url": string,
                      },
                      "turn_upside_down": boolean
                  }
              ],
              "evolves_to": [],
              "is_baby": boolean,
              "species": {
                  "name": string,
                  "url": string,
              }
          }
      ],
      "is_baby": boolean,
      "species": {
          "name": string,
          "url": string,
      }
  },
  "id": number
}