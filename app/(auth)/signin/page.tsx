"use client";

import Button from "@/ui-components/core/Button";
import {
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
} from "@/ui-components/core/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { ActionResponse, signIn } from "../../../server/actions/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function SignInPage() {
  const router = useRouter();

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signIn(formData);

      // Handle successful submission
      if (result.success) {
        toast.success("Signed in successfully");
        router.push("/dashboard");
        router.refresh();
      }

      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occurred",
        errors: undefined,
      };
    }
  }, initialState);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#121212]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Mode
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form action={formAction} className="space-y-6">
          {state?.message && !state.success && (
            <FormError>{state.message}</FormError>
          )}

          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? "border-red-500" : ""}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign in
            </Button>
          </div>
        </Form>
        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signUp"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
