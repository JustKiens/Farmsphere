import { Controller, useFormContext } from 'react-hook-form';
import { cities, civilStatuses, nationalities, provinces } from '../../../constants/InputConstant';
import Input from '../../common/Input';
import ComboBox from '../../common/ComboBox';
import DatePicker from '../../common/DatePicker';
import RadioButton from '../../common/RadioButton';
import ImageInput from '../../common/ImageInput';

const AddProviderStep = () => {

  const { control , clearErrors, formState: { errors } } = useFormContext();

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-6">
      {/* Personal */}
      <label className="text-lg font-medium text-gray-700 tracking-tight ">Personal Information</label>

      <div className="flex flex-col mt-6 w-full">
        <Controller 
          control={control}
          name="accountAvatarFile"
          render={({ field: { value, onChange} }) => (
            <ImageInput 
              value={value}
              onChange={onChange}
              person="Provider"
            />
          )}
        />
      </div>
      <div className="flex flex-col mt-6 w-full">
        <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Assigned Province</label>
        <Controller
          name="accountAssignedProvince"
          control={control}
          render={({ field: { onChange, value }}) => (
            <ComboBox
              options={provinces}
              className="h-10 w-full mt-2 flex-shrink-0" 
              placeholder="Choose a province"
              didError={!!errors?.accountAssignedProvince?.message}
              value={value}
              setValue={(item) => {
                onChange(item);
                clearErrors('accountAssignedProvince');
              }}
            />
          )}
        />
        {/* <ErrorMessage message={errors?.accountAssignedProvince?.message} /> */}
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>First Name</label>
          <Controller
            name="accountFullName.firstName"
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Juan"
                didError={!!(errors?.accountFullName as any)?.firstName?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('accountFullName.firstName');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Middle Name</label>
          <Controller
            name="accountFullName.middleName"
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-24 mt-2 flex-shrink-0" 
                placeholder="Garcia"
                didError={!!(errors?.accountFullName as any)?.middleName?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('accountFullName.middleName');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Last Name</label>
          <Controller
            name="accountFullName.lastName"
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Dela Cruz"
                didError={!!(errors?.accountFullName as any)?.lastName?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('accountFullName.lastName');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col min-w-20">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Suffix Name</label>
          <Controller
            name="accountFullName.suffixName"
            control={control}
            render={({ field: { onChange, value }}) => (
              <ComboBox
                options={["N/A", "Jr.", "Sr.", "I", "II", "III", "IV", "V"]}
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="N/A"
                didError={!!(errors?.accountFullName as any)?.suffixName?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountFullName.suffixName');
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className="flex flex-col min-w-52">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Date Of Birth</label>
          <Controller
            name="accountBirthDate"
            control={control}
            render={({ field: { onChange, value }}) => (
              <DatePicker
                type="dateOfBirth"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="birthdate"
                didError={!!errors?.accountBirthDate?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountBirthDate');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Gender</label>
          <Controller
            name="accountGender"
            control={control}
            render={({ field: { onChange, value }}) => (  
              <div className="w-full flex gap-4">
                <RadioButton
                  setChecked={(item) => {
                    onChange(item);
                    clearErrors('accountGender');
                  }}
                  checked={value === "Male"}
                  className="h-10 w-fit flex-grow mt-2 flex-shrink-0" 
                  didError={!!errors?.accountGender?.message}
                  value="Male"
                />
                <RadioButton
                  setChecked={(item) => {
                    onChange(item);
                    clearErrors('accountGender');
                  }}
                  checked={value === "Female"}
                  className="h-10 w-fit flex-grow mt-2 flex-shrink-0" 
                  didError={!!errors?.accountGender?.message}
                  value="Female"
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className="flex flex-col min-w-52">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Civil Status</label>
          <Controller
            name="accountCivilStatus"
            control={control}
            render={({ field: { onChange, value }}) => (
              <ComboBox
                options={civilStatuses}
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Choose a civil status"
                didError={!!errors?.accountCivilStatus?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountCivilStatus');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Nationality</label>
          <Controller
            name="accountNationality"
            control={control}
            render={({ field: { onChange, value }}) => (
              <ComboBox
                options={nationalities}
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Choose a nationality"
                didError={!!errors?.accountNationality?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountNationality');
                }}
              />
            )}
          />
        </div>
      </div>
      {/* Address */}
      <label className="text-lg font-medium text-gray-700 tracking-tight mt-6">Address Information</label>
      <div className="flex flex-row gap-4 mt-6 w-full">
        <div className="flex flex-col min-w-52">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Street</label>
          <Controller
            name="accountAddress.street"
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="#123 Camella St."
                didError={!!(errors?.accountAddress as any)?.street?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('accountAddress.street');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Barangay</label>
          <Controller
            name="accountAddress.barangay"
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input
                type="text"
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="San Fernando"
                didError={!!(errors?.accountAddress as any)?.barangay?.message}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors('accountAddress.barangay');
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className="flex flex-col min-w-52">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>City / Municipality</label>
          <Controller
            name="accountAddress.city"
            control={control}
            render={({ field: { onChange, value }}) => (
              <ComboBox
                options={cities}
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Choose a city"
                didError={!!(errors?.accountAddress as any)?.city?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountAddress.city');
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Province</label>
          <Controller
            name="accountAddress.province"
            control={control}
            render={({ field: { onChange, value }}) => (
              <ComboBox
                options={provinces}
                className="h-10 w-full mt-2 flex-shrink-0" 
                placeholder="Choose a province"
                didError={!!(errors?.accountAddress as any)?.province?.message}
                value={value}
                setValue={(item) => {
                  onChange(item);
                  clearErrors('accountAddress.province');
                }}
              />
            )}
          />
        </div>
      </div>
      <label className="text-lg font-medium text-gray-700 tracking-tight mt-6">Account Information</label>
      <div className="flex flex-col mt-6">
        <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Email</label>
        <Controller
          name="accountEmail"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              type="text"
              className="h-10 w-full mt-2 flex-shrink-0" 
              placeholder="example@mail.com"
              didError={!!errors?.accountEmail?.message}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                clearErrors('accountEmail');
              }}
            />
          )}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Phone Number</label>
        <Controller
          name="accountPhoneNumber"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Input
              type="text"
              className="h-10 w-full mt-2 flex-shrink-0" 
              placeholder="09124567890"
              didError={!!errors?.accountPhoneNumber?.message}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                clearErrors('accountPhoneNumber');
              }}
              maxLength={11}
              onlyNumbers
            />
          )}
        />
      </div>
    </section>
  )
}

export default AddProviderStep