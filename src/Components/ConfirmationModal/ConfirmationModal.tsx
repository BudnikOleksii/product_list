import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { removeProductById } from '../../features/productsSlice';
import { Id } from '../../types/Id';

type Props = {
  onModalClose: (bool: boolean) => void;
  id: Id;
};

export const ConfirmationModal: FC<Props> = ({ onModalClose, id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-card" style={{ width: '480px' }}>
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Do you want delete current product?
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={() => onModalClose(false)}
          />
        </header>

        <div className="modal-card-body is-flex is-justify-content-end">
          <button
            type="button"
            className="button is-primary"
            onClick={() => onModalClose(false)}
          >
            Cancel
          </button>
          <button
            style={{ marginLeft: '30px' }}
            type="button"
            className="button is-danger"
            onClick={() => {
              dispatch(removeProductById(id));
              onModalClose(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
