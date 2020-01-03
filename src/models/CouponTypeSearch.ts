import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class CouponTypeSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();
}
