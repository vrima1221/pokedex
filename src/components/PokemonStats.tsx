import React from 'react';
import styles from '../styles/PokemonStats.module.scss';
import { PokemonStat } from '@/types/Pokemon';

type Props = {
  stats: PokemonStat[]
}

export const PokemonStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className={styles.stats_container}>
      {stats.map(stat => (
        <div key={stat.stat.url} className={styles.stat}>
          <p>{`${stat.stat.name}: ${stat.base_stat}`}</p>
          <div style={{ width: `${stat.base_stat}%` }} className={styles.fill}></div>
        </div>
      ))}
    </div>
  );
};