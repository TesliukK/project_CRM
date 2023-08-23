import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import { useAppDispatch } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";


const ItemForm: FC = () => {
  const {reset, handleSubmit, register} = useForm<IItem>();
  const dispatch = useAppDispatch();
  const save: SubmitHandler<IItem> = async (item) => {
    await dispatch(itemAction.create({item}))
    reset()
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <input type="text" placeholder={'categoryId'} {...register('categoryId')}/>
      <input type="text" placeholder={'subCategoryId'} {...register('subCategoryId')}/>
      <input type="text" placeholder={'color'} {...register('color')}/>
      <input type="text" placeholder={'count'} {...register('count')}/>
      <input type="text" placeholder={'material'} {...register('material')}/>
      <input type="text" placeholder={'nameItem'} {...register('nameItem')}/>
      <input type="text" placeholder={'size'} {...register('size')}/>
      <input type="text" placeholder={'season'} {...register('season')}/>
      <input type="text" placeholder={'price'} {...register('price', {valueAsNumber: true})}/>
      <button>save</button>
    </form>
  );
};

export {ItemForm};
