import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const schema = yup.object().shape({
    name: yup.string()
      .required("Full name is required"),

    email: yup.string()
      .email()
      .required("Email is required"),

    age: yup.number("Age must be a number")
      .positive("Age must be a positive number")
      .required("Age is required")
      .min(18, 'Minimum age must be 18') // 18 is the minimum age allowed
      .max(100, 'Maximum age must be 100'), // 100 is the maximum age allowed,

    phone: yup.string()
      .required('Phone number is required')
      .matches(/^\d+$/, 'Phone number must contain only digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(12, 'Phone number can only be up to 12 digits'),

    address: yup.string()
      .required("Address is required"),

    password: yup.string()
      .required('Password is required')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[^a-zA-Z0-9]/, 'Must contain at least one special character')
      .test(
        'password',
        'Password must meet all criteria',
        (value) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)),

    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <h1>React Hook Form</h1>

        <>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </>

        <>
          <input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </>

        <>
          <input type="number" placeholder="Age" {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </>

        <>
          <input type="text" placeholder="Phone" {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </>

        <>
          <input type="text" placeholder="Address Line 1" {...register("Address")} />
          {errors.address && <p>{errors.address.message}</p>}
        </>

        <>
          <input type="text" placeholder="Address Line 2" {...register("Address")} />
          {errors.address && <p>{errors.address.message}</p>}
        </>

        <>
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </>

        <>
          <input
            type="password" placeholder="Confirm Password"  {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </>

        <button type="submit">
          Submit
        </button>

      </form>
    </>
  );
}

export default App;