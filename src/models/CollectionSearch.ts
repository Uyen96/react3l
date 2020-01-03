import {DateFilter, IdFilter, StringFilter} from 'core/filters';
import {Search} from 'core/models';

export class CollectionSearch extends Search {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public slug?: StringFilter = new StringFilter();

  public start?: DateFilter = new DateFilter();

  public end?: DateFilter = new DateFilter();

  public statusId?: IdFilter = new IdFilter();

  public title?: StringFilter = new StringFilter();

  public description?: StringFilter = new StringFilter();
}
