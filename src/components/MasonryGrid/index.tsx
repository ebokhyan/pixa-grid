import { Box } from "@chakra-ui/react";
import React, { ReactNode, useMemo } from "react";

interface IMasonryGridProps {
  children: ReactNode | ReactNode[];
  columns: number;
  spacing?: number;
}

export default function MasonryGrid({
  children,
  columns,
  spacing = 4,
}: IMasonryGridProps) {
  const items = React.Children.toArray(children);

  const columnWrappers = useMemo(() => {
    const columnsArray: ReactNode[][] = Array.from(
      { length: columns },
      () => []
    );
    items.forEach((child, index) => {
      columnsArray[index % columns].push(child);
    });
    return columnsArray;
  }, [items, columns]);

  return (
    <Box display="flex" justifyContent="space-between" px={spacing / 2}>
      {columnWrappers.map((column, columnIndex) => (
        <Box key={columnIndex} flex="1" mx={spacing / 2}>
          {column.map((child, childIndex) => (
            <Box mb={spacing} key={childIndex}>
              {child}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
