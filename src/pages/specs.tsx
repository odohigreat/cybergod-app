import Header from "../Components/header";

const specs = [
  {
    label: "Battery",
    value: "3900mAh",
  },
  {
    label: "Camera",
    value: "200MP",
  },
  {
    label: "Chipset",
    value: "12GB RAM, Snapdragon 8 Elite",
  },
  {
    label: "Display",
    value: "6.7 inches, Dynamic AMOLED",
  },
  {
    label: "Dimensions and Weight",
    value: "163g, 5.8mm thickness",
  }, {
    label: "Artificial Intelligence",
    value: "Gemini Live",
  },
  {
    label: "Conectivity",
    value: "Live call transcription and translation",
  },
  {
    label: "Water and Dust Resistance",
    value: "up to IP68",
  },
];

function Specs() {
  return (
    <>
      <Header />
      <div className="max-w-[1440px] px-4 md:px-20 py-2 md:py-6">
        <div>
          <h1 className="text-lg md:text-3xl pb-1 md:pb-5">Samsung Galaxy S25 Edge</h1>
        </div>
        <section className="flex space-x-1 md:space-x-4 shadow-inner w-fit p-2 md:p-4 rounded-lg md:rounded-2xl">
          <div className='flex flex-col size-fit items-center p-2 md:p-5 rounded-md md:rounded-2xl bg-neutral-400 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 transition-all duration-200 ease-in-out'>
            <img src='https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-edge.jpg' alt='Samsung Galaxy S25 Edge' className='rounded-lg w-40 md:w-auto h-36 md:h-52' />
          </div>
          <div className="grid grid-flow-col grid-rows-2 gap-1 md:gap-2">
            {specs.map((spec) => (
              <section key={spec.label} className="w-13 md:w-52 bg-opacity-30 bg-neutral-400 rounded-md md:rounded-xl px-2 py-1 overflow-clip cursor-pointer hover:shadow-sm shadow-neutral-200 hover:border hover:border-zinc-500 hover:brightness-105 transition-all duration-200 ease-in-out">
                <div className="flex items-start justify-between md:space-x-1">
                  <p className="text-[10px] md:text-md font-semibold">{spec.label}
                    <h2 className="text-[7px] md:text-sm font-normal">{spec.value}</h2>
                  </p>
                </div>

              </section>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

export default Specs;