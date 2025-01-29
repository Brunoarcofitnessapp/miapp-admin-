import { Table } from 'antd';
import React from 'react';

export const CommonTable = ({ columns, expandedRowRender, data, isPagination }) => {

    return (
        <Table
            columns={columns}
            expandable={{ expandedRowRender }}
            expandIconColumnIndex={12}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={isPagination && {
                position: ['bottomLeft'],
                defaultPageSize: 10,
                defaultCurrent: 1,
                // total: 100,
            }}
        />
    )
}
