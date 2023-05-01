import { PokemonAbility } from "@/types/PokemonAbility";
import styles from '../styles/PokemonAbilityList.module.scss';

type Props = {
  abilities: PokemonAbility[]
};

export const PokemonAbilityList: React.FC<Props> = ({ abilities }) => {
  return (
    <div className={styles.ability_container}>
      {abilities.map(ability => (
        <div 
          key={ability.ability.name}
          className={ability.is_hidden === false ? styles.ability : styles.ability_hidden}
        >
          {ability.ability.name}
        </div>
      ))}
    </div>
  );
};