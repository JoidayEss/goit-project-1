import * as Yup from "yup";
import s from "./CommentForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";

const CommentForm = () => {
  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", comment: "", date: null }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          comment: Yup.string().min(6, "Must be at least 6 characters"),
          date: Yup.date().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("Form Data:", values);

          setTimeout(() => {
            toast.success(
              "Thank you for your inquiry! We will definitely contact you!",
              {
                style: {
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "16px",
                  background: "#fff",
                  color: "#222",
                  padding: "12px 16px",
                  borderRadius: "8px",
                },
              }
            );
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className={s.form_container}>
              <h3 className={s.form_title}>Book your car now</h3>
              <p className={s.form_paragraph}>
                Stay connected! We are always ready to help you.
              </p>
              <div className={s.form_place}>
                <Field
                  className={s.field}
                  type="text"
                  name="name"
                  placeholder="Name*"
                />
                <ErrorMessage name="name" component="div" />

                <Field
                  className={s.field}
                  type="email"
                  name="email"
                  placeholder="Email*"
                />
                <ErrorMessage name="email" component="div" />

                <DatePicker
                  className={s.field}
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  placeholderText="Booking date"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
                <ErrorMessage name="date" component="div" />

                <Field
                  className={s.field_area}
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                />
                <ErrorMessage name="comment" component="div" />
              </div>
              <div className={s.button_container}>
                <button
                  className={s.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CommentForm;
