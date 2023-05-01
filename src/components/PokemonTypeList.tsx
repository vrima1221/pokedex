import { PokemonType } from '@/types/PokemonType';
import typeStyles from '../styles/PokemonType.module.scss';


type Props = {
  types: PokemonType[],
}

export const PokemonTypeList: React.FC<Props> = ({ types }) => {
  return (
    <div className={typeStyles.types_container}>
      {types.map(type => (
        <div key={type.slot} className={typeStyles[type.type.name]}>{type.type.name}</div>
      ))}
    </div>
  );
};

