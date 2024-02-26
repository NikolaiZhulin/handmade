import { useRouter } from 'next/router';
import { ChangeEvent, useState, KeyboardEvent, useContext } from 'react';

import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import { mergeStyles } from '@/helpers/mergeStyles';
import { useTranslation } from '@/hooks/useTranslation';
import { MODAL_CONTEXT_VALUES, ModalContext } from '@/contexts/ModalContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';

import style from './style.module.scss';
import { HeaderSelect } from './components/HeaderSelect';

const Search = () => {
  const { push, query, pathname } = useRouter();
  const [modals, setModal] = useContext(ModalContext);
  const [searchValue, setSearchValue] = useState(query.search ?? '');
  const [cities, setCities] = useState<string[]>(
    query.cities ? (query.cities === 'all' ? ['all'] : (query.cities as string).split(',')) : [],
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  const handleSearchClick = () => {
    if (!/^\//.test(pathname)) {
      push(
        {
          query: {
            search: searchValue,
            category: query.category ?? 'all',
            cities: cities.includes('all') ? 'all' : cities.join(','),
          },
          pathname: '/',
        },
        undefined,
      );
    } else {
      push(
        {
          query: {
            search: searchValue,
            category: query.category ?? 'all',
            cities: cities.includes('all') ? 'all' : cities.join(','),
          },
          pathname: '/',
        },
        undefined,
        { shallow: true },
      );
    }
  };

  const keyboardSerachHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleFocus = () => {
    if (Object.values(modals).some((el) => el)) {
      setModal(MODAL_CONTEXT_VALUES);
    }
    setIsInputFocused(true);
  };
  const handleBlur = () => setIsInputFocused(false);
  const handleButtonFocus = () => {
    setIsButtonFocused(true);
  };
  const handleButtonBlur = () => setIsButtonFocused(false);

  return (
    <div
      className={mergeStyles(
        style.search,
        (isInputFocused || searchValue) && style.focus,
        isInputFocused && isButtonFocused,
      )}
    >
      <div className={cn(style.searchWrapper, 'xs:!h-[44px]')}>
        <HeaderSelect setCities={setCities} />
        <input
          placeholder={t('header.search')}
          className={style.input}
          value={searchValue}
          onChange={handleChange}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={keyboardSerachHandler}
        />
        {/*{!isTablet && (*/}
        {/*  <>*/}
        {/*    <HeaderSelect setCities={setCities} />*/}
        {/*  </>*/}
        {/*)}*/}
      </div>
      <button
        onMouseOver={handleButtonFocus}
        onMouseLeave={handleButtonBlur}
        className={mergeStyles(style.searchButton)}
        onClick={handleSearchClick}
      >
        <HomeSvgSelector id={'search-button'} />
      </button>
    </div>
  );
};

export default Search;
