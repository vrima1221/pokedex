import React from "react";
import { GetServerSideProps } from 'next';
import Image from "next/image";
import styles from '../../styles/pokemon.module.scss';
import Link from "next/link";
import { PokemonType } from "@/types/PokemonType";
import { PokemonTypeList } from "@/components/PokemonTypeList";
import { PokemonAbility } from "@/types/PokemonAbility";
import { PokemonAbilityList } from "@/components/PokemonAbilityList";
import { PokemonStats } from "@/components/PokemonStats";
import { PokemonStat } from "@/types/Pokemon";

type Props = {
  pokemon: Pokemon
}

interface Move {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    version_group: {
      name: string
      url: string
    }
    move_learn_method: {
      name: string
      url: string
    }
  }[]
}

interface Pokemon {
  id: string
  name: string
  spriteUrl: string | null
  imgUrl: string
  moves: Move[]
  types: PokemonType[]
  abilities: PokemonAbility[]
  stats: PokemonStat[]
}

const PokemonPage: React.FC<Props> = ({ pokemon }) => {
  const movesByLvl = pokemon.moves
    .filter(move => move.version_group_details[0].move_learn_method.name === 'level-up')
    .sort((a, b) => (a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at));

  const movesByTm = pokemon.moves
    .filter(move => move.version_group_details[0].move_learn_method.name === 'machine');

  return (
    <>
      <div className={styles.pokemon__page}>
        <div className={styles.pokemon__header}>
          <Link href={`/pokemon/${+pokemon.id - 1}`} className={styles.pokemon__link}>
            <p>
              Prev
            </p>
          </Link>

          <h1 className={styles.pokemon__title}>
            {`#${pokemon.id} ${pokemon.name.toUpperCase()}`}
            
            <Image src={pokemon.spriteUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/75/Children-404_logo.png'} width={50} height={50} alt={pokemon.name} />
          </h1>

          <Link href={`/pokemon/${+pokemon.id + 1}`} className={styles.pokemon__link}>
            <p>
              Next
            </p>
          </Link>
        </div>
      
          <Image 
            src={pokemon.imgUrl} 
            width={300} 
            height={300} 
            alt={pokemon.name} 
            className={styles.main_image} 
          />
        
          <PokemonTypeList types={pokemon.types} />

          <PokemonAbilityList abilities={pokemon.abilities} />

          <PokemonStats stats={pokemon.stats} />

          <ul className={styles.moves_list_bylvl}>
            {movesByLvl.map(move => {
              return (
                <li key={move.move.url}>
                  {`Lvl ${move.version_group_details[0].level_learned_at} ${move.move.name.charAt(0).toUpperCase()}${move.move.name.slice(1)}`}
                </li>)
            })}
          </ul>

          <ul className={styles.moves_list_bylvl}>
            {movesByTm.map(move => {
              return <li key={move.move.url}>{`TM ${move.move.name.charAt(0).toUpperCase()}${move.move.name.slice(1)}`}</li>
            })}
          </ul>
      </div>     
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pokemonId = context.query.id;
  console.log(context);
  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  const { 
    id,
    name,
    sprites,
    moves,
    types,
    abilities,
    stats,
    // species,
  } = data;

  // const evoChain = await fetch(species.url)

  // const { evolution_chain } = await evoChain.json();
  // const { chain,  } = evolution_chain.chain.evolves_to[0].evolution_details


  const pokemon: Pokemon = {
    id,
    name,
    spriteUrl: sprites.front_default,
    imgUrl: sprites.other['official-artwork'].front_default,
    moves,
    types,
    abilities,
    stats,
    // evoChain,
  };

  return {
    props: { pokemon },
  }
}


export default PokemonPage;
