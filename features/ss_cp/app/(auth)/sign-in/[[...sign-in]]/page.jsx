import { SignIn } from '@clerk/nextjs'
const SignInPage = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="logo.svg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" className="h-15 sm:h-12"></img>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to StudySphere
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Unlock the future of learning with StudySphere, your gateway to an
              innovative collaborative platform. Sign in to connect with peers,
              explore interactive resources, and dive into a world of knowledge.
              Your journey to smarter, more connected learning starts here.
            </p>
          </div>
        </section>

        <main className="auth-page flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignIn />
        </main>
      </div>
    </section>
  );
}

export default SignInPage
