import React from 'react';
import './ApplicationUserDetail.scss';
import DatePicker from 'antd/lib/date-picker';
import Switch from 'antd/lib/switch';
import {crudService, routerService} from 'core/services';
import {applicationUserRepository} from 'views/ApplicationUserView/ApplicationUserRepository';
import {ApplicationUser} from 'models/ApplicationUser';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';
import InputNumber from 'components/InputNumber/InputNumber';
import {UserStatus} from 'models/UserStatus';
import RoleContentTable from 'views/ApplicationUserView/ApplicationUserDetail/RoleContentTable/RoleContentTable';

const {Item: FormItem} = Form;

function ApplicationUserDetail() {
  const [translate] = useTranslation();
  const [handleGoBack] = routerService.useGoBack();

  const [
    applicationUser,
    setApplicationUser,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    ApplicationUser,
    applicationUserRepository.get,
    applicationUserRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<ApplicationUser>(applicationUser, setApplicationUser);

  /**
   * This section is for enums
   */
  const [userStatusList] = crudService.useEnumList<UserStatus>(applicationUserRepository.singleListUserStatus);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('applicationUsers.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('applicationUsers.id')}>
              {/* Number field */}
              <InputNumber defaultValue={applicationUser.id}
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(applicationUser.id))}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.username')}>
              {/* Text field */}
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(applicationUser.username)}
                     defaultValue={applicationUser.username}
                     onChange={handleChangeSimpleField(nameof(applicationUser.username))}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.displayName')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(applicationUser.displayName)}
                     defaultValue={applicationUser.displayName}
                     onChange={handleChangeSimpleField(nameof(applicationUser.displayName))}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.email')}>
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(applicationUser.email)}
                     defaultValue={applicationUser.email}
                     onChange={handleChangeSimpleField(nameof(applicationUser.email))}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.userStatus')}>
              {/* Enum field */}
              <Select value={applicationUser.userStatus?.id}
                      onChange={handleChangeObjectField(nameof(applicationUser.userStatus))}
                      list={userStatusList}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.provider')}>
              {/* Enum field */}
              <Select value={applicationUser.provider?.id}
                      onChange={handleChangeObjectField(nameof(applicationUser.provider))}
                      list={userStatusList}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.isActive')}>
              {/* Boolean field */}
              <Switch defaultChecked={applicationUser.isActive}
                      onChange={handleChangeSimpleField(nameof(applicationUser.isActive))}
              />
            </FormItem>
            <FormItem label={translate('applicationUsers.createdAt')}>
              {/* Date field */}
              <DatePicker defaultValue={applicationUser.createdAt}
                          onChange={handleChangeDateField(nameof(applicationUser.createdAt))}
              />
            </FormItem>
          </Form>
          <RoleContentTable model={applicationUser}
                            setModel={setApplicationUser}
                            field={nameof(applicationUser.roles)}
                            onChange={handleChangeSimpleField(nameof(applicationUser.roles))}
          />
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default ApplicationUserDetail;
