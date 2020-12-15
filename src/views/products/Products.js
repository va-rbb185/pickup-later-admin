import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react';
import { fetchProducts } from 'redux/actions';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success';
    case 'Inactive': return 'secondary';
    case 'Pending': return 'warning';
    case 'Banned': return 'danger';
    default: return 'primary';
  }
};

const Products = ({ products, fetchProducts }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = newPage => {
    newPage !== currentPage && history.push(`/products?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    fetchProducts({
      page,
      perPage: 10
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Products
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={products ? products.records.products : []}
              fields={[
                { key: 'id', _classes: 'font-weight-bold' },
                'name', 'price', 'salePrice', 'freshFood', 'status'
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/products/${item.id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={products.pages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = { fetchProducts };
const ConnectedComp = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ConnectedComp;