export default function Home() {
    return (
      <div
        className={`min-h-screen bg-white sm:py-12 w-full md:w-auto h-full text-black border-4 flex items-center justify-center `}
      >
        <div className="grid gap-12 grid-cols-1 grid-rows-5">
          <div className={`flex justify-center w-full md:w-auto x`}>
            <button
              type="button"
              className="text-Crear Pedido text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/">CREAR CONSULTA</a>
              {/* Consultar pedidos */}
            </button>
          </div>
  
          <div className=" flex justify-center w-full md:w-auto">
            <button
              type="button"
              className="text-Consultar Pedidos text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/">REVISAR CONSULTAS</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
  