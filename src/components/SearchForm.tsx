import React from "react";
import styles from '../styles/searchForm.module.scss';

type Props = {
  input: string,
  onChange: (value: string) => void
};

export const SearchForm: React.FC<Props> = ({ input, onChange}) => {
  return (
    <div className={styles.container}>
      <input 
        type="text" 
        placeholder="Input name or ID"
        value={input}
        onChange={e => onChange(e.target.value)} 
        className={styles.input}
      />
    </div>
  );
};
