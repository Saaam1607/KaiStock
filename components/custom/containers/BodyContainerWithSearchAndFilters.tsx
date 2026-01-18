import React, { useState, useEffect } from 'react';

import { BodyContainer } from './BodyContainer';
import { SearchBarWithFilters } from '../searching/SearchBarWithFilters';
import { BottomSheet } from '../BottomSheet';

type BodyContainerWithSearchAndFiltersProps<T> = {
  items: T[];
  setItemsToDisplay: (items: T[]) => void;
  getSortedItems(items: T[], sortKey: string, sortOrder: "asc" | "desc"): T[],
  searchingField: keyof T;
  orderingComponent: React.ComponentType<{
    sortKey: string;
    setSortKey: (key: string) => void;
    sortOrder?: 'asc' | 'desc';
    setSortOrder?: (order: 'asc' | 'desc') => void;
  }>;
  children: React.ReactNode;
};

export function BodyContainerWithSearchAndFilters<T>({ items, setItemsToDisplay, getSortedItems, searchingField, orderingComponent: OrderingComponent, children }: BodyContainerWithSearchAndFiltersProps<T>) {
  
  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [sortKey, setSortKey] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!showFilter) {

      const sortedItems = getSortedItems(items, sortKey, sortOrder);
      const filteredItems = sortedItems.filter((item) =>
        String(item[searchingField]).toLowerCase().includes(searchText.toLowerCase()),
      );

      setItemsToDisplay(filteredItems);
    }
  }, [items, searchText, showFilter]);

  return (
    <>
      <BodyContainer>
        <SearchBarWithFilters
          placeholder="Cerca..."
          text={searchText}
          setText={setSearchText}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        {children}
      </BodyContainer>
      <BottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        orderingComponent={
          <OrderingComponent
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        }
        filteringComponent={null}
      />
    </>
  );
}