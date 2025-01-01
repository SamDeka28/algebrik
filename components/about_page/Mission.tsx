export default function MissionSection() {
    return (
      <section className="container font-plus-jakarta mx-auto my-12 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Our mission.
          </h2>
          <p className="text-gray-700 mb-4">
            While advancements in lending technology inspire us, the lending journey remains overly complicated. Disconnected systems create inefficiencies for lenders and barriers for borrowers.
          </p>
          <p className="text-gray-700 mb-4">
            There has to be a better way to lend—this belief led to Algebrik AI. What began as a tool to streamline loan organizations has grown into a mission to help lenders deliver loans digitally when and where they are needed most.
          </p>
          <p className="text-gray-700 mb-4">
            Our vision is to revolutionize loan origination, making it faster, simpler, and more inclusive, while enabling lenders to focus on helping people achieve their goals. Our ultimate goal is to transform lending into a seamless, transparent process, setting a new benchmark for financial services. We’re proud to work with lenders worldwide, creating meaningful financial impact together.
          </p>
        </div>
  
        {/* Right Callout */}
        <div className="bg-blue-50 border-l-4 border-blue-500 shadow-lg p-6 rounded-md md:w-1/3">
          <h3 className="text-lg font-semibold text-blue-600">
            Transforming lending with
          </h3>
          <p className="text-blue-800 text-lg font-bold">
            simplicity, accessibility, <br /> and seamless borrower experiences
          </p>
        </div>
      </section>
    );
  }
  