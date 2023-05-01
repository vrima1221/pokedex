import PokemonList from "@/components/PokemonList";
import { SearchForm } from "@/components/SearchForm";
import { PokemonLink } from "@/types/PokemonListResponse";
import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  pokemonList: PokemonLink[]
}

const PokedexPage: NextPage<Props> = ({ pokemonList }) => {
  const [currentList, setCurrentList] = useState<PokemonLink[]>(pokemonList.slice(0, 60));
  const [searchInput, setSearchInput] = useState('');
  const lastItemRef = useRef(null);

  const pokemonsToShow = currentList.filter(pokemon => pokemon.id.includes(searchInput) || pokemon.name.includes(searchInput));

  const listLength = currentList.length;

  const showMoreData = (offset: number) => {
    const pokemons = pokemonList.slice(offset, offset + 40);
    console.log('load');
    
    
    setCurrentList(prev => [...prev, ...pokemons]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showMoreData(listLength);
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0
      }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [listLength]);

  // const handleSearchSubmit = async (value: string) => {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
  //   const pokemon = await response.json();

  //   return pokemon;
  // };

  return (
    <div style={{height: '100vh'}}>
      <SearchForm input={searchInput} onChange={setSearchInput} />
      <PokemonList list={pokemonsToShow} lastItemRef={lastItemRef}/>
    </div>
  );
};

export default PokedexPage;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(`http://localhost:5000/pokemons`);
  const pokemons = await response.json();
  
  return {
    props: { pokemonList: pokemons }
  };
};