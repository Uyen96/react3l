import message from 'antd/lib/message';
import {DETAIL_KEYS} from 'config/consts';
import {join} from 'path';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import nameof from 'ts-nameof.macro';
import {translate} from '../helpers';
import {Model} from '../models';

const DEFAULT_SAVING_SUCCESS_MESSAGE: string = translate('general.saving.success');
const DEFAULT_SAVING_FAILURE_MESSAGE: string = translate('general.saving.failure');

export type DetailHookResult<T extends Model> = [
  T,
  (t: T) => void,
  boolean,
  boolean,
  () => void,
  () => void,
];

interface DetailParams {
  id?: string;
}

/**
 *
 * @param {string} baseRoute
 * @param {(t?: T) => Promise<T>} getDetail
 * @param {(t?: T) => Promise<T>} saveDetail
 * @param {(error: Error) => void} onSavingError
 * @param {string} successMessage
 * @param {string} failureMessage
 * @returns {DetailHookResult<T>}
 */
export function useDetail<T extends Model>(
  baseRoute: string,
  getDetail?: (t?: T) => Promise<T>,
  saveDetail?: (t?: T) => Promise<T>,
  onSavingError?: (error: Error) => void,
  successMessage: string = DEFAULT_SAVING_SUCCESS_MESSAGE,
  failureMessage: string = DEFAULT_SAVING_FAILURE_MESSAGE,
): DetailHookResult<T> {
  const [t, setT] = React.useState<T>(new Model() as T);
  const {id} = useParams<DetailParams>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const isDetail: boolean = id !== nameof(DETAIL_KEYS.add);
  const history = useHistory();
  const [translate] = useTranslation();

  const handleGoBack = React.useCallback(
    () => {
      history.push(join(baseRoute));
    },
    [baseRoute, history],
  );

  const handleSave = React.useCallback(
    async () => {
      setLoading(true);
      try {
        setT(await saveDetail(t));
        message.info(translate(successMessage, t));
      } catch (error) {
        message.error(translate(failureMessage, {error, ...t}));
        if (onSavingError) {
          onSavingError(error);
        }
      }
      setLoading(false);
    },
    [failureMessage, onSavingError, saveDetail, successMessage, t, translate],
  );

  React.useEffect(
    () => {
      if (!!getDetail && isDetail) {
        setLoading(true);
        const t: T = Model.clone<Model>({
          id,
        }) as T;
        getDetail(t)
          .then((t: T) => {
            setT(t);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [getDetail, id, isDetail],
  );

  return [t, setT, loading, isDetail, handleGoBack, handleSave];
}
