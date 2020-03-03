import React from 'react';
import './RoleContentTable.scss';
import {ContentTableProps} from 'react3l';
import {ApplicationUser} from 'models/ApplicationUser';
import {Role} from 'models/Role';
import {crudService} from 'core/services';
import Table, {ColumnProps} from 'antd/lib/table';
import {tableService} from 'services';
import {RoleFilter} from 'models/RoleFilter';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import Card from 'antd/lib/card';

const {Item: FormItem} = Form;

function RoleContentTable(props: ContentTableProps<ApplicationUser, Role>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    roles,
  ] = crudService.useContentTable<ApplicationUser, Role>(model, setModel, nameof(model.roles));

  const [roleFilter, setRoleFilter] = React.useState<RoleFilter>(new RoleFilter());

  const [
    dataSource,
    pagination,
    sorter,
    handleTableChange,
    handleFilter,
    handleSearch,
    handleReset,
  ] = tableService.useLocalTable(roles, roleFilter, setRoleFilter);

  const columns: ColumnProps<Role>[] = React.useMemo(
    () => [
      {
        title: translate('roles.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<Role>(pagination),
      },
      {
        title: translate('roles.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<ApplicationUser>(nameof(dataSource[0].name), sorter),
      },
    ],
    [dataSource, pagination, sorter, translate],
  );

  return (
    <>
      <Card className="filter-card mb-4" title={translate(generalLanguageKeys.actions.search)}>
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('applicationUsers.id')}>
                <AdvancedStringFilter filterType={nameof(roleFilter.id.equal)}
                                      filter={roleFilter.id}
                                      onChange={handleFilter(nameof(roleFilter.id))}
                                      className="w-100"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
            {translate(generalLanguageKeys.actions.filter)}
          </button>
          <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
            <i className="fa mr-2 fa-times"/>
            {translate(generalLanguageKeys.actions.reset)}
          </button>
        </div>
      </Card>
      <Table pagination={pagination}
             dataSource={dataSource}
             columns={columns}
             onChange={handleTableChange}
             tableLayout="fixed"
             bordered={true}
             size="small"
      />
    </>
  );
}

export default RoleContentTable;