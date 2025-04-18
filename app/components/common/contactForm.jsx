"use client";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { supabase } from "@/lib/supabase";
import { Badge, Textarea } from "@chakra-ui/react";
import { toast } from "react-toastify";

function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { name, phone, email, message } = data;
      const { error } = await supabase.from("messages").insert([
        {
          name,
          phone,
          email: email || null,
          message,
          time: new Date().toISOString(),
        },
      ]);
      if (error) {
        toast.error("An error occurred while sending the message!");
      } else {
        toast.success("Your message has been sent successfully!");
        reset();
      }
    } catch (err) {
      toast.error("An unexpected error occurred!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formFlex">
        <div className="field">
          <label>Your name</label>
          <input
            type="text"
            {...register("name", {
              required: "The field is required!",
            })}
          />
          {errors.name && (
            <span className="errorSpan">{errors.name.message}</span>
          )}
        </div>
        <div className="field">
          <label>Phone number</label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "The field is required!" }}
            render={({ field }) => (
              <PhoneInput
                className="myPhoneInput"
                defaultCountry="EG"
                value={field.value}
                onChange={field.onChange}
                international
              />
            )}
          />
          {errors.phone && (
            <span className="errorSpan">{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className="field">
        <label>
          Email address
          <Badge
            variant="subtle"
            size="xs"
            height={"15px"}
            backgroundColor={"#707070"}
          >
            optional
          </Badge>
        </label>
        <input
          type="email"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email format is incorrect",
            },
          })}
        />
        {errors.email && (
          <span className="errorSpan">{errors.email.message}</span>
        )}
      </div>
      <div className="field">
        <label>Your inquiry</label>
        <Textarea
          placeholder="  Tell us your request or inquiry..."
          minH={"150px"}
          borderRadius="15px"
          _focus={{
            borderColor: "#707070",
          }}
          {...register("message", {
            required: "The field is required!",
          })}
        />
        {errors.message && (
          <span className="errorSpan">{errors.message.message}</span>
        )}
      </div>
      <div className="homeBtn">
        <button className="mainBtn">Send</button>
        <button type="submit" className="hoverBtn">
          Send
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
