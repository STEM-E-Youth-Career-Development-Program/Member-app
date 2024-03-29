import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage.js';

function FormField({ name, width, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {<ErrorMessage visible={touched[name]} error={errors[name]} />}
    </>
  );
}

export default FormField;
