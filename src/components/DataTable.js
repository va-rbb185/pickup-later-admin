import React from 'react';
import { Table } from 'react-bootstrap';
import { CBadge } from '@coreui/react';
import { formatPrice } from 'helpers';
import { Link } from 'react-router-dom';
import { getDateTimeFromMilliseconds } from 'helpers';

const getBadge = status => {
    switch (status) {
        case 'ACTIVE': return 'success';
        case 'INACTIVE': return 'secondary';
        default: return 'primary';
    }
};

const DataTable = ({ fields, children }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {fields.map((field, index) => <th key={index}>{field}</th>)}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </Table>
    );
};

DataTable.ProductRow = ({ item, rowAction }) => {
    const { id, name, title, price, salePrice, freshFood, status } = item;
    return (
        <tr key={id}>
            <td><Link to={`/products/${id}`}>{id}</Link></td>
            <td><b>{name}</b></td>
            <td>{title}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(salePrice)}</td>
            <td>{freshFood ? 'Yes' : 'No'}</td>
            <td>
                <CBadge color={getBadge(status)}>
                    {status}
                </CBadge>
            </td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}><b>{rowAction.name}</b></td>
                    : null
            }
        </tr>
    );
};

DataTable.CategoryRow = ({ item, rowAction }) => {
    const { id, name, title } = item;
    return (
        <tr key={id}>
            <td><Link to={`/categories/${id}`}>{id}</Link></td>
            <td><b>{name}</b></td>
            <td>{title}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}><b>{rowAction.name}</b></td>
                    : null
            }
        </tr>
    );
};

DataTable.OrderRow = ({ item }) => {
    const { transactionNo, userName, phoneNumber, note, totalAmount, status, paymentMethod, paymentStatus, storeId } = item;
    return (
        <tr key={transactionNo}>
            <td><Link to={`/orders/${transactionNo}`}>{transactionNo}</Link></td>
            <td>{userName}</td>
            <td>{phoneNumber}</td>
            <td>{note}</td>
            <td>{storeId}</td>
            <td>{status}</td>
            <td>{paymentMethod}</td>
            <td>{paymentStatus}</td>
            <td>{totalAmount}</td>
        </tr>);
};
DataTable.ComboRow = ({ item, rowAction }) => {
    const { id, name, title, price, salePrice } = item;
    return (
        <tr key={id}>
            <td><Link to={`/combos/${id}`}>{id}</Link></td>
            <td><b>{name}</b></td>
            <td>{title}</td>
            <td>{formatPrice(price)}</td>
            <td>{formatPrice(salePrice)}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}><b>{rowAction.name}</b></td>
                    : null
            }
        </tr>
    );
};

DataTable.CampaignRow = ({ item, rowAction }) => {
    const { id, name, code, issuedQuantity, status, startDate, endDate, description } = item;
    return (
        <tr key={id}>
            <td><Link to={`/campaigns/${id}`}>{id}</Link></td>
            <td><b>{name}</b></td>
            <td>{code}</td>
            <td>{issuedQuantity}</td>
            <td>{status}</td>
            <td>{getDateTimeFromMilliseconds(startDate)}</td>
            <td>{getDateTimeFromMilliseconds(endDate)}</td>
            <td>{description}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}><b>{rowAction.name}</b></td>
                    : null
            }
        </tr>
    );
};

DataTable.VoucherRow = ({ item, rowAction }) => {
    const { id, name, code, value, expiredAt, maxDiscount } = item;
    return (
        <tr key={id}>
            <td><Link to={`/campaigns/${id}`}>{id}</Link></td>
            <td><b>{name}</b></td>
            <td>{code}</td>
            <td>{value}</td>
            <td>{maxDiscount}</td>
            <td>{expiredAt}</td>
            {
                rowAction
                    ? <td onClick={rowAction.action} style={{ cursor: 'pointer', color: '#dc143c', textAlign: 'center' }}><b>{rowAction.name}</b></td>
                    : null
            }
        </tr>
    );
};

export default DataTable;
