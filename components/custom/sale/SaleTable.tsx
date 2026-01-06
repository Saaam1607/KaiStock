import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';

import type { SoldProduct } from '@/types/SoldProduct';
import { useColor } from '@/hooks/use-color';

type SaleTableRow = SoldProduct & {
  name: string;
  totalPrice: number;
};

type Props = {
  data: SaleTableRow[];
};

export default function SaleTable({ data }: Props) {
  const color = useColor();

  const columns = useMemo(
    () => ['name', 'quantity', 'weight', 'unit_price', 'total_price'],
    [],
  );

  const [tableData, setTableData] = useState<SaleTableRow[]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const getColumnHeaderLabel = (column: string): string => {
    switch (column) {
      case 'name':
        return 'Articolo';
      case 'quantity':
        return 'Qtà';
      case 'weight':
        return 'Peso';
      case 'unit_price':
        return 'Prezzo';
      case 'total_price':
        return 'Totale';
      default:
        return column;
    }
  };

  const renderHeader = useCallback(
    () => (
      <View style={[styles.headerRow, { borderColor: color.cardTableBorder }]}>
        {columns.map((column) => (
          <TouchableOpacity key={column} style={styles.headerCell}>
            <Text style={[styles.headerText, { color: color.textLighter }]}>
              {getColumnHeaderLabel(column)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [columns, color],
  );

  return (
    <ScrollView horizontal>
      <View style={[styles.tableWrapper, { borderColor: color.cardTableBorder, backgroundColor: color.cardTable }]}>
        <FlatList
          data={tableData}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item, index }) => {
            const isLast = index === tableData.length - 1;

            return (
              <View style={styles.row}>
                <Text
                  style={[
                    styles.cell,
                    styles.textLeft,
                    !isLast && styles.rowDivider,
                    { color: color.text },
                  ]}
                >
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    styles.textCenter,
                    !isLast && styles.rowDivider,
                    { color: color.text },
                  ]}
                >
                  {item.quantity}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    styles.textCenter,
                    !isLast && styles.rowDivider,
                    { color: color.text },
                  ]}
                >
                  {item.weight} {item.uom}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    styles.textRight,
                    !isLast && styles.rowDivider,
                    { color: color.text },
                  ]}
                >
                  {item.unit_price} €/{item.uom}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    styles.textRight,
                    !isLast && styles.rowDivider,
                    styles.totalCell,
                    { color: color.text },
                  ]}
                >
                  {item.totalPrice} €
                </Text>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const CELL_WIDTH = 110;

const styles = StyleSheet.create({
  tableWrapper: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },

  /* ---------- HEADER ---------- */

  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },

  headerCell: {
    width: CELL_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  /* ---------- ROWS ---------- */

  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  cell: {
    width: CELL_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '500',
  },

  rowDivider: {
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },

  totalCell: {
    fontWeight: '700',
  },

  /* ---------- ALIGN ---------- */

  textLeft: {
    textAlign: 'left',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },
});
