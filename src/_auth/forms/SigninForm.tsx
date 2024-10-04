import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { SigninValidationSchema } from "@/lib/validation"
import FormTextField from "@/components/shared/FormTextField"
import Loader from "@/components/shared/Loader"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutatuions"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"


const SigninForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { toggleForm } = useOutletContext();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const { mutateAsync: signInAccount } = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
    console.log('onSubmit')

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' })
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset()
      navigate('/')

    } else {
      return toast({ title: 'Sign in failed. Please try again.' })
    }
  }

  const handleClick = () => {
    toggleForm()
  };

  return (
    <Form {...form}>
      <div className={`sm:w-420 flex-center flex-col`}>
        <div className="flex flex-center gap-2 mr-8">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={70}
            width={70}
          />
          <h1 className='h1-bold'>Insta<span className='text-[#7091E6]'>V</span>ibe</h1>
        </div>

        <h2 className="h3-bold md:h2-bold pt-5">Sign in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormTextField
            control={form.control}
            name='email'
            type='email'
          />
          <FormTextField
            control={form.control}
            name='password'
            type='password'
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isUserLoading}
          >
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : 'Sign in'}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <button
              onClick={handleClick}
              className="text-primary-500 text-small-semibold ml-1"
              type="button"
            >
              Sign up
            </button>
          </p>
        </form>
      </div >
    </Form>
  )
}

export default SigninForm