import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import Filter from "../../components/filter";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.items
  }));

  // Опции для полей
  const options = {
    //функция для сохранения промежуточного значения
    sort: useMemo(() => ([
      { value: 'key', title: 'По коду' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), []),
    categories: select.categories
  }

  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({ sort }), [store]),
    onCategory: useCallback(category => store.catalog.setParams({category, page: 1}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store])
  }

  return (
    <LayoutTools>
      <Filter onChange={callbacks.onCategory} value={select.category} categories={options.categories}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);