import {RouteConfig} from 'react-router-config';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {translate} from 'core/helpers/internationalization';

export const menu: RouteConfig[] = [
  {
    name: translate('menu.provinces'),
    url: PROVINCE_ROUTE,
    icon: 'fa fa-building',
  },
  {
    name: translate('menu.report'),
    icon: 'fa fa-book',
    children: [
      {
        name: translate('menu.products'),
        url:'/product',
        icon: 'fa fa-product-hunt',
      },
      {
        name: translate('menu.tree'),
        url:'/tree',
        icon: 'fa fa-product-hunt',
      },
    ],
  },
];
