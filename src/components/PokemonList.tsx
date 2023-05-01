import Link from 'next/link';
import styles from '../styles/PokemonList.module.scss';
import React from "react";
import Image from "next/image";
import { PokemonLink } from '@/types/PokemonListResponse';

type Props = {
  list: PokemonLink[]
  lastItemRef: React.LegacyRef<HTMLDivElement>
}

const PokemonList: React.FC<Props> = ({ list, lastItemRef }) => {

  return (
    <main>
      <div className={styles.list_container}>
        {list.map((pokemon) => {
          return (<Link href={`http://localhost:3000/pokemon/${pokemon.name}`} key={pokemon.url} className={styles.link}>
              {`#${pokemon.id}`}

              <Image 
                src={pokemon.imgUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/75/Children-404_logo.png'} 
                width={40}
                height={40} 
                alt={pokemon.name}
              />

              {`${pokemon.name}`}
            </Link>)
        })}
      </div>
      <div ref={lastItemRef}></div>
    </main>
  );
}

export default PokemonList;