import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FormType } from "@/enums/FormType";

const defaultFormValues = {
  name: "",
  parameters: [{ name: "", type: "", description: "" }],
};

export const useLicenseTypeForm = (
  open,
  formType,
  initialData,
  licenseTypeId,
  t,
  onSubmit,
  onClose
) => {
  const [parameterError, setParameterError] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

  const validationRules = {
    name: {
      required: t("validation.nameRequired"),
      maxLength: {
        value: 100,
        message: t("validation.nameTooLong"),
      },
    },
  };

  const formConfig = {
    [FormType.CREATE]: {
      title: t("createTitle"),
      buttonText: t("createButton"),
      readOnlyFields: [],
    },
    [FormType.EDIT]: {
      title: t("editTitle"),
      buttonText: t("saveButton"),
      readOnlyFields: [],
    },
  };

  useEffect(() => {
    if (open) {
      if (formType === FormType.CREATE) {
        reset(defaultFormValues);
      } else if (initialData && formType === FormType.EDIT) {
        reset(initialData);
      }
    }
  }, [open, formType, initialData, reset]);

  const onFormSubmit = data => {
    const filteredParameters = data.parameters.filter(
      param => param.name.trim() !== "" && param.type.trim() !== ""
    );

    if (filteredParameters.length === 0) {
      setParameterError(true);
      return;
    }

    setParameterError(false);

    const dataToSubmit = {
      ...data,
      parameters: filteredParameters,
    };

    if (formType === FormType.EDIT) {
      onSubmit({ ...dataToSubmit, id: licenseTypeId });
    } else {
      onSubmit(dataToSubmit);
    }

    onClose();
  };

  return {
    control,
    handleSubmit: handleSubmit(onFormSubmit),
    fields,
    append,
    remove,
    parameterError,
    validationRules,
    formConfig: formConfig[formType],
  };
};
