/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  FC, FormEvent, useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './productForm.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewProduct, updateProductById } from '../../features/productsSlice';

const defaultProduct = {
  imageUrl: '',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '0',
  comments: [] as Comment[],
};

export const ProductForm: FC = () => {
  const { productId } = useParams();

  const productState = useAppSelector(state => (
    state.productsState.products.find(product => String(product.id) === productId) || defaultProduct
  ));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(productState);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidTextInput = (value: string) => {
    if (/[^a-zA-Z/:. ]/g.test(value) || value.length < 4) {
      setErrorMessage('Input text field should contain more than 4 characters and should be valid');

      return false;
    }

    return true;
  };

  const handleNewSizeData = (field: string, value: number) => {
    setErrorMessage('');

    setProduct(prevState => ({
      ...prevState,
      size: {
        ...prevState.size,
        [field]: value,
      },
    }));
  };

  const handleNewProductData = (field: string, value: string | number) => {
    setErrorMessage('');

    setProduct(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isValidForm = () => {
    return isValidTextInput(product.imageUrl) && isValidTextInput(product.name);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    if (productId) {
      dispatch(updateProductById({
        ...product,
        id: productId,
      }));
    } else {
      dispatch(addNewProduct(product));
    }

    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Link
        className="button is-primary is-rounded m-2"
        to="/"
      >
        Return to dashboard
      </Link>

      {errorMessage && (
        <div className="notification  is-danger">
          {errorMessage}
        </div>
      )}

      <label className="field">
        ImageUrl:
        <input
          type="text"
          placeholder="ImageUrl"
          value={product.imageUrl}
          onChange={(event) => handleNewProductData('imageUrl', event.target.value)}
          required
          className="input"
        />
      </label>

      <label className="field">
        Name:
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(event) => handleNewProductData('name', event.target.value)}
          required
          className="input"
        />
      </label>

      <label className="field">
        Count:
        <input
          type="number"
          placeholder="Count"
          value={product.count}
          onChange={(event) => handleNewProductData('count', Number(event.target.value))}
          required
          min="1"
          className="input"
        />
      </label>

      <label className="field">
        Width:
        <input
          type="number"
          placeholder="Width"
          value={product.size.width}
          onChange={(event) => handleNewSizeData('width', Number(event.target.value))}
          required
          min="0"
          className="input"
        />
      </label>

      <label className="field">
        Height:
        <input
          type="number"
          placeholder="Height"
          value={product.size.height}
          onChange={(event) => handleNewSizeData('height', Number(event.target.value))}
          required
          min="0"
          className="input"
        />
      </label>

      <label className="field">
        Weight:
        <input
          type="number"
          placeholder="Weight"
          value={parseInt(product.weight, 10)}
          min="0"
          onChange={(event) => handleNewProductData('weight', `${event.target.value}g`)}
          required
          className="input"
        />
      </label>

      <button
        className="button is-primary"
        type="submit"
        disabled={!product.imageUrl || !product.name || !product.count || !product.weight
      || !product.size.width || !product.size.height}
      >
        {productId ? 'Edit a Product' : 'Add a Product'}
      </button>
    </form>
  );
};
