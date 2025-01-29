import React from "react";
import { useForm } from "react-hook-form";
import { CommonButton } from "../../components/Buttons";
import { LayoutCard } from "../../components/Cards";
import TextEditor from "../../components/TextEditor";

const Privacy = () => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (body) => {
    reset();
  };
  return (
    <LayoutCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextEditor
          name="description"
          setValue={setValue}
          {...register("description", { required: "Description is required" })}
          errors={errors}
        />
        <CommonButton
          htmlType="submit"
          title={getValues().description ? "Update" : "Submit"}
          style={{ marginTop: 20 }}
        />
      </form>
    </LayoutCard>
  );
};
export default Privacy;
