import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'

type DropDownProps = {
    options: string[];
    showDropDown: boolean;
    toggleDropDown: Function;
    optionSelection: Function;
  };
  
  const DropDown: React.FC<DropDownProps> = ({
    options,
    optionSelection,
  }: DropDownProps): JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
  
    /**
     * Handle passing the city name
     * back to the parent component
     *
     * @param city  The selected city
     */
    const onClickHandler = (option: string): void => {
      optionSelection(option);
    };
  
    useEffect(() => {
      setShowDropDown(showDropDown);
    }, [showDropDown]);
  
    return (
      <>
        <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
          {options.map(
            (option: string, index: number): JSX.Element => {
              return (
                <p
                  key={index}
                  onClick={(): void => {
                    onClickHandler(option);
                  }}
                >
                  {option}
                </p>
              );
            }
          )}
        </div>
      </>
    );
  };
  
  export default DropDown;
  