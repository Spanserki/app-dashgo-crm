import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="green"
        disabled
        _disabled={{
          bgColor: 'gray',
          cursor: 'default',
        }}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Button>
    );
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bgColor="gray.700"
        _hover={{
          opacity: '0.6',
        }}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Button>
    );
  }
}
