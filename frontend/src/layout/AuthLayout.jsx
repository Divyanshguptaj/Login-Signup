import React from 'react';

const AuthLayout = ({ title, subtitle, highlights, form, image }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
      {/* Left Pane */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-400/10 to-purple-500/10 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/80 dark:bg-white/10 shadow-md grid place-items-center text-blue-600 dark:text-blue-400 text-xl">{image}</div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md text-lg">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 mt-10">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-white/5 backdrop-blur-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Highlights</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
              {highlights.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Pane (Form) */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        {form}
      </div>
    </div>
  );
};

export default AuthLayout;
