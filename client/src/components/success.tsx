import React from "react";

export default function SuccessPage() {
  return (
    <section className="py-20 min-h-[30rem]">
      <div className="container mx-auto flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl text-center font-bold">Congratulations!</h1>
        <p className="text-center">
          Your Payment was successful. Your product will be delivered shortly
        </p>
        <a href="/" className="btn btn-primary bg-red-600 py-3 px-5 text-white">
          Back to Homepage
        </a>
      </div>
    </section>
  );
}
