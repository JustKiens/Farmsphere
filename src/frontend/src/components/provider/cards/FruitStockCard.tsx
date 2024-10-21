import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Stocks } from '../../../interfaces/ProviderTypes';
import { Fragment, useState } from 'react';
import Switch from '../../common/Switch';
import Input from '../../common/Input';
import NotAllowedIcon from '../../../icons/linear/NotAllowedIcon';
import PriceInput from '../../common/PriceInput';

type FruitStockCardProps = {
  fruit: Stocks;
};

const FruitStockCard = ({
  fruit,
}: FruitStockCardProps) => {


  const { 
    control, 
    formState: { errors }, 
    clearErrors, 
    watch,
    getValues
  } = useFormContext();
  const fields = watch('stockLevelFruits') as Stocks[]

  const { append, remove } = useFieldArray({
    control,
    name: 'stockLevelFruits',
  });

  const index = fields.findIndex((field) => field.id === fruit.id);

  const quantityError = !!((errors?.stockLevelFruits as any)?.[index]?.quantity) as boolean
  const priceError = !!((errors?.stockLevelFruits as any)?.[index]?.price) as boolean
  // Track whether the switch is checked or not
  const [isChecked, setIsChecked] = useState(getValues(`stockLevelFruits[${index}].quantity`) > 0);

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      append({ 
        id: fruit.id, 
        name: fruit.name, 
        type: "fruit",
        price: 0,
        quantity: 0
      });
    } else {
      remove(index)
    }
  };


  return (
    <div className="w-full h-10 rounded-md mb-2 grid grid-cols-[15%_25%_auto_auto] items-center gap-4 mt-2">
      <Switch
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="flex flex-col">
        <p className="text-sm text-gray-900 font-medium">{fruit.name}</p>
        <p className="text-xs text-gray-500">{fruit.id}</p>
      </div>
      {isChecked ? (
        <Fragment>
          <Controller 
            name={`stockLevelFruits[${index}].quantity`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                value={value || 0}
                onChange={(e) => {
                  onChange(Number(e.target.value));
                  clearErrors(`stockLevelFruits[${index}].quantity`);
                }}
                placeholder="100"
                className="w-full"
                didError={quantityError}
                onlyNumbers
                maxLength={20}
              />
            )}
          />
          <Controller 
            name={`stockLevelFruits[${index}].price`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <PriceInput 
                value={value || 0}
                onChange={(e) => {
                  onChange(Number(e.target.value));
                  clearErrors(`stockLevelFruits[${index}].price`);
                }}
                placeholder="100"
                className="w-full"
                didError={priceError}
                maxLength={20}
              />
            )}
          />
        </Fragment>
      ) : (
        <Fragment>
          <div className="w-full h-10 rounded-md ring-1 cursor-not-allowed flex items-center justify-center ring-gray-200">
            <NotAllowedIcon className="w-6 h-6 stroke-2 stroke-gray-200" />
          </div>
          <div className="w-full h-10 rounded-md ring-1 cursor-not-allowed flex items-center justify-center ring-gray-200">
            <NotAllowedIcon className="w-6 h-6 stroke-2 stroke-gray-200" />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default FruitStockCard;
