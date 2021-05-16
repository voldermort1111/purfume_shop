import { useCallback, useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";

export default function PerfumePagination({ totalItem, limit, onChange }) {
  const [pages, setPages] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const length = limit ? Math.ceil(totalItem / limit) || 1 : 1;
    const pagesTemp = [];
    for (let i = 0; i < length; i++) {
      pagesTemp.push(1);
    }
    setPages(pagesTemp);
  }, [totalItem, limit]);

  const onPageChange = useCallback(
    (value) => {
      if (currentPage !== value) {
        setCurrentPage(value);
        if (onChange && typeof onChange === "function") {
          onChange(value);
        }
      }
    },
    [currentPage, onChange]
  );

  const onNext = useCallback(() => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      if (onChange && typeof onChange === "function") {
        onChange(currentPage + 1);
      }
    }
  }, [currentPage, onChange, pages.length]);

  const onPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (onChange && typeof onChange === "function") {
        onChange(currentPage - 1);
      }
    }
  }, [currentPage, onChange]);

  return (
    <Pagination
      className="pagination justify-content-center mb-0"
      listClassName="justify-content-center mb-0"
    >
      <PaginationItem disabled={currentPage <= 1 ? true : false}>
        <PaginationLink onClick={() => onPrevious()} previous>
          <i className="fas fa-angle-left" />
        </PaginationLink>
      </PaginationItem>
      {pages.map((page, index) => {
        return (
          <PaginationItem
            className={currentPage === index + 1 ? "active" : ""}
            key={index}
          >
            <PaginationLink onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={currentPage >= pages.length ? true : false}>
        <PaginationLink onClick={() => onNext()}>
          <i className="fas fa-angle-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

PerfumePagination.propTypes = {
  totalItem: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
