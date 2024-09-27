import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Schema } from "zod";

type FormTypes = {
  formSchema: Schema;
  children?: ReactNode;
  onSubmit: (payload: any) => void | any;
};

const Form = ({ formSchema, children, onSubmit }: FormTypes) => {
  const methods = useForm({ resolver: zodResolver(formSchema) });

  const submitHandler = async (formData: any, event: any) => {
    event.preventDefault();
    try {
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
    } finally {
      methods.reset({ formData }, { keepDirtyValues: true });
    }
  };

  return (
    <Fragment>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
      </FormProvider>
    </Fragment>
  );
};

export default Form;
