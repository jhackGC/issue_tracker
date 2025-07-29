"use server";
// by using "use server" all the actions exported from this file will be like API routes,
// the compiler will create an API route for each action, but it's "obfuscated" from you
// And when the action (route) is called it will run the function it exports
// a HTTP request still happens but you are not responsible to handle it, just the function.

// if you dont use "use server" this module will just export functions that you can call directly
// it will not be an API route, it will just be a module that you can import and use in your components
// "use server" is being using like a decorator

import { redirect } from "next/navigation";
import { z, ZodIssue } from "zod";
import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword,
} from "../server/lib/auth";
import { getUserByEmail } from "../server/lib/dataAccessLayer";

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export const signIn = async (formData: FormData): Promise<ActionResponse> => {
  console.log("### Sign user by email:", formData.get("email"));

  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = SignInSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: extractValidationIssues(validationResult),
      };
    }

    const user = await getUserByEmail(data.email);

    // console.log("### signIn User found:", user);

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Something bad happended",
      message: "Something bad happended",
    };
  }
};

export const signUp = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword"),
    };

    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed in the server side",
        errors: extractValidationIssues(validationResult),
      };
    }

    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      // A secure and privacy-preserving way
      // to give feedback during signup—when an account already exists for the
      // provided email—is to use a generic error message that does not confirm
      // whether the email is registered. This prevents attackers from enumerating
      // valid emails.
      // This approach is user-friendly and does not leak information about
      // which emails are registered.

      return {
        success: false,
        message: "Create account failed!",
        errors: {
          email: [
            "Unable to create account. Please check your details or try signing in if you already have an account.",
          ],
        },
      };
    }

    const user = await createUser(data.email, data.password);

    if (!user) {
      return {
        success: false,
        message: "Try again",
        errors: {
          email: ["Account could not be created"],
        },
      };
    }

    await createSession(user.id);

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Something happened while creating your account",
    };
  }
};

export const signOut = async () => {
  try {
    await deleteSession();
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    // redirects the request to the signin page
    redirect("/signin");
  }
};

function extractValidationIssues(
  validationResult: z.ZodSafeParseError<{ email: string; password: string }>
): Record<string, string[]> | undefined {
  return validationResult.error.issues.reduce(
    (acc: Record<string, string[]>, curr: ZodIssue) => {
      const path = curr.path[0];
      if (typeof path === "string" || typeof path === "number") {
        const key = String(path);
        if (!acc[key]) acc[key] = [];
        acc[key].push(curr.message);
      }
      return acc;
    },
    {}
  );
}
