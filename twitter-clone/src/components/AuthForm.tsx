import React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  headerTitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const AuthForm: React.FC<FormProps> = ({
  onSubmit,
  children,
  headerTitle,
  footer,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto max-w-md border-2 border-gray-300 bg-gray-100 rounded-md p-4 mt-4">
      <h1 className="text-center text-2xl font-bold mb-4">{headerTitle}</h1>
      <form onSubmit={(e) => onSubmit(e)}>{children}</form>
      <div className="text-center mt-4">{footer}</div>
    </div>
  </div>
);

export default AuthForm;
