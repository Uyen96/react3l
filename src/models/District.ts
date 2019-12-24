import {Model} from 'core/models';
import {ErrorMap} from 'core/types';
import {DistrictType} from 'models/DistrictType';
import {Province} from './Province';

export class District extends Model {
  public id?: number;

  public name?: string;

  public districtType?: DistrictType;

  public districtTypeId?: number;

  public provinceId?: number;

  public province?: Province;

  public errors?: ErrorMap<District>;
}
