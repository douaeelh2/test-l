import { useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { FormType } from "@/enums/FormType";

const defaultFormValues = {
  name: "",
  type: "",
  startDate: null,
  endDate: null,
  client: "",
  comment: "",
  companyName: "SmartRoby",
  maxProcess: "100",
  maxResources: "100",
  maxConcurrentSessions: "100",
};

export const useLicenseForm = (
  formType,
  initialData,
  licenseId,
  t,
  onSubmit,
  onClose
) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFormValues,
  });

  const validationRules = {
    name: {
      required: t("validation.nameRequired"),
      maxLength: {
        value: 100,
        message: t("validation.nameTooLong"),
      },
    },
    startDate: {
      required: t("validation.startDateRequired"),
      validate: (value, formValues) => {
        const endDate = formValues.endDate;
        if (value && endDate && dayjs(value).isAfter(dayjs(endDate))) {
          return t("validation.startDateBeforeEndDate");
        }
        return true;
      },
    },
    type: { required: t("validation.typeRequired") },
    client: { required: t("validation.clientRequired") },
    endDate: {
      required: t("validation.endDateRequired"),
      validate: (value, formValues) => {
        const startDate = formValues.startDate;
        if (value && startDate && dayjs(value).isBefore(dayjs(startDate))) {
          return t("validation.endDateAfterStartDate");
        }
        return true;
      },
    },
  };

  const formConfig = {
    [FormType.CREATE]: {
      title: t("pageTitle"),
      buttonText: t("createButton"),
      readOnlyFields: [],
    },
    [FormType.EDIT]: {
      title: t("editTitle"),
      buttonText: t("saveButton"),
      readOnlyFields: [],
    },
    [FormType.EXTEND]: {
      title: t("extendTitle"),
      buttonText: t("extendSaveButton"),
      readOnlyFields: ["name"],
    },
  };

  useEffect(() => {
    if (formType === FormType.CREATE) {
      reset({
        ...defaultFormValues,
        startDate: null,
        endDate: null,
      });
    } else if (
      initialData &&
      (formType === FormType.EDIT || formType === FormType.EXTEND)
    ) {
      const updatedData = {
        ...defaultFormValues,
        ...initialData,
        startDate: initialData.startDate ? dayjs(initialData.startDate) : null,
        endDate: initialData.endDate ? dayjs(initialData.endDate) : null,
        comment:
          formType === FormType.EXTEND
            ? `Extension de licence du ${dayjs().format("DD/MM/YYYY")}`
            : initialData.comment || "",
      };
      reset(updatedData);
    }
  }, [formType, initialData, reset]);

  const onFormSubmit = data => {
    const formattedData = {
      ...data,
      startDate: data.startDate ? data.startDate.format("DD/MM/YYYY") : null,
      endDate: data.endDate ? data.endDate.format("DD/MM/YYYY") : null,
    };

    if (formType === FormType.EDIT || formType === FormType.EXTEND) {
      onSubmit({ ...formattedData, id: licenseId });
    } else {
      onSubmit(formattedData);
    }
    onClose();
  };

  return {
    control,
    handleSubmit: handleSubmit(onFormSubmit),
    formConfig: formConfig[formType],
    validationRules,
    isExtendForm: formType === FormType.EXTEND,
  };
};
