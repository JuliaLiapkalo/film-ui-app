import React, {useMemo} from 'react';
import Button from "../Button";
import {useIntl} from "react-intl";



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { formatMessage } = useIntl();
  return (
      <div>
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
          {formatMessage({id: 'previous'})}
        </Button>
        {currentPage + 1} of {totalPages}
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          {formatMessage({id: 'next'})}
        </Button>
      </div>
  );
};

export default Pagination;
