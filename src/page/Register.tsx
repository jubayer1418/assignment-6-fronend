import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form"
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authapi";
import { useAppDispatch } from "../redux/hooks";
import { setRegister } from "../redux/features/register/register/registerSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      console.log({ data });
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      dispatch(
        setRegister({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await registerUser(userInfo);

      if (res?.error?.data) {
        toast.error(`${data.email} Already used`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Registration successful!", {
          id: toastId,
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="hero min-h-screen bg-[#191D26]">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">
            Create your SmartPhone Inventory Account
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}  className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name")}
                required
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>

            <div className="mt-4">
             
              <p className=" text-sm text-gray-600">Already have an account?
              <Link
                className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
                to={"/login"}
              >
                Login
              </Link>
              </p>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
