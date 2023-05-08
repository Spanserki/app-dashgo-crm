import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, i) => i + from + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const previousPages =
    currentPage > 1
      ? generatePagesArray(
          parseInt(`${currentPage}`) - 1 - siblingsCount,
          currentPage - 1
        )
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          parseInt(`${currentPage}`),
          Math.min(parseInt(`${currentPage}`) + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
      p={5}
    >
      <Box>
        <strong>
          {totalCountOfRegisters === 0
            ? 0
            : parseInt(`${currentPage}`) * registersPerPage -
              (registersPerPage - 1)}
        </strong>{' '}
        -{' '}
        <strong>
          {parseInt(`${currentPage}`) * registersPerPage > totalCountOfRegisters
            ? totalCountOfRegisters
            : parseInt(`${currentPage}`) * registersPerPage}
        </strong>{' '}
        de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {parseInt(`${currentPage}`) > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {parseInt(`${currentPage}`) > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <Text>...</Text>}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
