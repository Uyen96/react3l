import {IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class ProductTypeSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();
}
