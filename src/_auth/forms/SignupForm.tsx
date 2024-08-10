import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { SignupValidationSchema } from "@/lib/validation"
import FormTextField from "@/components/shared/FormTextField"
import Loader from "@/components/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutatuions"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"


const SignupForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSignInAccount } = useSignInAccount()

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    const newUser = await createUserAccount(values)

    if (!newUser) {
      return toast({ title: 'Sign up failed. Please try again.' })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' })
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn) {
      form.reset()

      navigate('/')
    } else {
      return toast({ title: 'Sign up failed. Please try again.' })
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img
          src="/assets/images/logo.svg"
          alt="logo"
        />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormTextField
            control={form.control}
            name='name'
          />
          <FormTextField
            control={form.control}
            name='username'
          />
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
            disabled={isCreatingAccount}
          >
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : 'Sign up'}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Alredy have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div >
    </Form>
  )
}

export default SignupForm